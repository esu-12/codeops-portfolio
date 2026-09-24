import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useCartStore } from "../../store/cartStore";
import { API_URL } from "../../api.js";

import "./DishDetail.css";

const imageForDish = (name = "") => {
  const value = name.toLowerCase();

  if (value.includes("doro")) {
    return "/images/doro-wat.jpg";
  }

  if (value.includes("kitfo")) {
    return "/images/Prime Beef Kitfo.jpg";
  }

  if (value.includes("siga") || value.includes("tibs")) {
    return "/images/Crisp Siga Derek Tibs.jpg";
  }

  if (value.includes("shiro")) {
    return "/images/shiro.jpg";
  }

  if (value.includes("lamb")) {
    return "/images/Awaze Lamb Tibs.jpg";
  }

  if (value.includes("tej")) {
    return "/images/House Fermented Tej (500ml Carafe).jpg";
  }

  if (value.includes("timatim")) {
    return "/images/Fresh Timatim Fitfit.jpg";
  }

  if (value.includes("coffee") || value.includes("jebena")) {
    return "/images/Traditional Jebena Coffee.jpg";
  }

  return "/images/doro-wat.jpg";
};

const relatedDishes = [
  {
    name: "House Traditional Tej",
    price: 350,
    image: "/images/House Fermented Tej (500ml Carafe).jpg",
    tag: "Signature Sip",
    description:
      "Pure golden fermented highland honey wine infused with gesho leaves.",
  },
  {
    name: "Fresh Timatim Fitfit",
    price: 180,
    image: "/images/Fresh Timatim Fitfit.jpg",
    tag: "Vegan / T'som",
    description:
      "Crisp ripe heirloom tomatoes, minced red shallots, and soft injera peppers.",
  },
  {
    name: "Jebena Spiced Coffee",
    price: 70,
    image: "/images/Traditional Jebena Coffee.jpg",
    tag: "Fresh Roast",
    description:
      "Addis-style freshly pan-roasted Yirgacheffe arabica beans boiled in a clay jebena.",
  },
];

function DishDetail() {
  const { id } = useParams();
  const addToCart = useCartStore(
    (state) => state.addToCart);
  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [spice, setSpice] = useState("Traditional Berbere");
  const [injera, setInjera] = useState("Standard Teff & Barley Blend");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchDish() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/menu/`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Could not load the dish.");
        }

        const result = await response.json();

        const foundDish = result?.data?.find(
          (item) => String(item.id) === String(id)
        );

        if (!foundDish) {
          throw new Error("Dish not found.");
        }

        setDish(foundDish);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchDish();

    return () => controller.abort();
  }, [id]);

  const image = useMemo(
    () => imageForDish(dish?.nameEn),
    [dish]
  );

  const basePrice = Number(dish?.priceETB) || 0;

  const injeraExtra =
    injera === "100% Pure Organic Brown Teff" ? 60 : 0;

  const total =
    (basePrice + injeraExtra) * quantity;

  const handleAddToCart = () => {
    if (!dish) {
      return;
    }

    const cartDish = {
      id: dish.id,
      name: dish.nameEn,
      price: basePrice + injeraExtra,
      image,
      description: dish.description,
      spicy: Boolean(dish.spiceLevel),
      spiceLevel: spice,
      category: dish.category,
    };

    for (let i = 0; i < quantity; i += 1) {
      addToCart(cartDish);
    }

    setAdded(true);

    window.setTimeout(() => {
      setAdded(false);
    }, 1800);
  };

  const handleRelatedAdd = (item) => {
    addToCart({
      id: item.name,
      name: item.name,
      price: item.price,
      image: item.image,
      description: item.description,
    });

    setAdded(true);

    window.setTimeout(() => {
      setAdded(false);
    }, 1800);
  };

  if (loading) {
    return (
      <div className="dish-detail-state">
        Loading dish...
      </div>
    );
  }

  if (error || !dish) {
    return (
      <div className="dish-detail-state">
        Error: {error || "Dish not found."}
      </div>
    );
  }

  return (
    <main className="dish-detail-page">
      <div className="dish-detail-breadcrumb">
        <Link to="/">Home</Link>
        <span>›</span>

        <Link to="/menu">Menu</Link>
        <span>›</span>

        <Link
          to={`/menu?category=${encodeURIComponent(
            dish.category || ""
          )}`}
        >
          {dish.category || "Traditional Stews & Wat"}
        </Link>

        <span>›</span>

        <strong>{dish.nameEn}</strong>
      </div>

      <section className="dish-detail-main">
        <div className="dish-gallery-column">
          <div className="dish-hero-image-wrap">
            <div className="dish-image-tags">
              <span>HOUSE SIGNATURE</span>

              {dish.isFasting && (
                <span>100% TEFF OPTION</span>
              )}
            </div>

            <img
              src={image}
              alt={dish.nameEn}
              className="dish-hero-image"
            />

            <div className="dish-image-caption">
              <span>◉ Simmered 14 Hours</span>
              <span>Mesob Addis Recipe #01</span>
            </div>
          </div>

          <div className="dish-thumbnails">
            <img src={image} alt="Dish presentation" />
            <img src={image} alt="Dish serving" />
            <img src={image} alt="Dish close-up" />
          </div>

          <section className="heritage-card">
            <div className="heritage-icon">♨</div>

            <div>
              <p className="eyebrow">
                HERITAGE &amp; LINEAGE · The Crown Jewel
              </p>

              <h3>
                The Soul Feast of the Highlands
              </h3>

              <p>
                {dish.description ||
                  "Traditionally prepared with time-honored Ethiopian spices and a rich house-made berbere blend."}
                {" "}
                Traditionally reserved for festive holidays and
                family feasts in Ethiopia, this dish is prepared
                with time-honored spices and a rich house-made
                berbere blend.
              </p>
            </div>
          </section>

          <div className="dish-facts">
            <div>
              <span>PREPARATION</span>
              <strong>Slow Stewed</strong>
            </div>

            <div>
              <span>ORIGIN</span>
              <strong>Highland Shawa</strong>
            </div>

            <div>
              <span>ALLERGENS</span>
              <strong>
                Poultry, Dairy
                <br />
                (Butter)
              </strong>
            </div>
          </div>
        </div>

        <aside className="dish-buy-panel">
          <div className="dish-title-row">
            <div>
              <p className="dish-small-label">
                ROYAL SIGNATURE
              </p>

              <h1>{dish.nameEn}</h1>

              <p className="dish-amharic">
                {dish.nameAm ||
                  "Traditional Ethiopian preparation"}
              </p>
            </div>

            <div className="dish-price">
              ETB {basePrice.toLocaleString()}
            </div>
          </div>

          <p className="dish-description">
            {dish.description ||
              "Tender, traditionally prepared Ethiopian cuisine infused with aromatic spices and authentic house-made ingredients."}
          </p>

          <div className="dish-benefits">
            <span>
              🌶 {dish.spiceLevel || "Traditional"}
              <small>seasoned</small>
            </span>

            <span>
              ∞ Unlimited teff injera
              <small>included</small>
            </span>

            <span>
              ✓ Taxes
              <small>included</small>
            </span>
          </div>

          <OptionGroup
            title="1. Heat & Spice Level"
            required
          >
            {[
              "Mild",
              "Traditional Berbere",
              "Fiery Awaze",
            ].map((option, index) => (
              <button
                type="button"
                key={option}
                className={`option-card ${
                  spice === option ? "selected" : ""
                }`}
                onClick={() => setSpice(option)}
              >
                <strong>{option}</strong>

                <span>
                  {index === 0
                    ? "1 / 3"
                    : index === 1
                    ? "2 / 3"
                    : "3 / 3"}
                </span>

                <small>
                  {index === 1
                    ? "Recommended"
                    : index === 0
                    ? "A little touch"
                    : "Served with Awaze"}
                </small>
              </button>
            ))}
          </OptionGroup>

          <OptionGroup
            title="2. Traditional Injera Base"
            required
          >
            <button
              type="button"
              className={`wide-option ${
                injera ===
                "Standard Teff & Barley Blend"
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                setInjera(
                  "Standard Teff & Barley Blend"
                )
              }
            >
              <strong>
                Standard Teff &amp; Barley Blend
              </strong>

              <span>Included</span>

              <small>
                Spongy, soft traditional teff
              </small>
            </button>

            <button
              type="button"
              className={`wide-option ${
                injera ===
                "100% Pure Organic Brown Teff"
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                setInjera(
                  "100% Pure Organic Brown Teff"
                )
              }
            >
              <strong>
                100% Pure Organic Brown Teff
              </strong>

              <span>+ETB 60</span>

              <small>
                Naturally 100% Gluten-Free,
                iron-rich teff
              </small>
            </button>
          </OptionGroup>

          <OptionGroup title="3. Complimentary Side Accents">
            <div className="side-grid">
              {[
                "Fresh Ayib",
                "Stewed Gomen",
                "House Awaze Paste",
                "Extra Braised Gomen",
              ].map((item) => (
                <label
                  key={item}
                  className="side-option"
                >
                  <input
                    type="checkbox"
                    defaultChecked={
                      item === "Fresh Ayib"
                    }
                  />

                  <span>
                    <strong>{item}</strong>

                    <small>
                      {item === "Fresh Ayib"
                        ? "Mild fresh cottage cheese"
                        : "Traditional house preparation"}
                    </small>
                  </span>

                  <em>
                    {item.includes("Extra")
                      ? "+ETB 40"
                      : "Free"}
                  </em>
                </label>
              ))}
            </div>
          </OptionGroup>

          <div className="buy-row">
            <div className="quantity-control">
              <button
                type="button"
                onClick={() =>
                  setQuantity(
                    Math.max(1, quantity - 1)
                  )
                }
              >
                −
              </button>

              <span>{quantity}</span>

              <button
                type="button"
                onClick={() =>
                  setQuantity(quantity + 1)
                }
              >
                +
              </button>
            </div>

            <button
              type="button"
              className="add-cart-button"
              onClick={handleAddToCart}
            >
              {added
                ? "✓ Added to Basket"
                : `▣ Add to Order • ETB ${total.toLocaleString()}`}
            </button>
          </div>

          <div className="buy-links">
            <button type="button">
              ♡ Save to Favorites
            </button>

            <button type="button">
              ▱ Order a Group Mesob Feast
            </button>
          </div>
        </aside>
      </section>

      <section className="pairings-section">
        <div className="pairings-heading">
          <div>
            <p className="eyebrow">
              ♧ GURSHA PAIRINGS
            </p>

            <h2>
              Pairs Wonderfully With Royal Doro Wat
            </h2>
          </div>

          <p>
            Harmonize rich, spicy berbere with the
            cooling sweetness of golden honey wine,
            refreshing salads, and ceremonial Jebena
            buna.
          </p>
        </div>

        <div className="pairings-grid">
          {relatedDishes.map((item) => (
            <article
              className="pairing-card"
              key={item.name}
            >
              <div className="pairing-image">
                <span>{item.tag}</span>

                <img
                  src={item.image}
                  alt={item.name}
                />
              </div>

              <div className="pairing-info">
                <h3>{item.name}</h3>

                <strong>
                  ETB {item.price.toLocaleString()}
                </strong>

                <p>{item.description}</p>

                <small>
                  {item.name.includes("Tej")
                    ? "500ml Flask"
                    : item.name.includes("Coffee")
                    ? "Ceremonial Cup"
                    : "Palate Cleanser"}
                </small>

                <button
                  type="button"
                  onClick={() =>
                    handleRelatedAdd(item)
                  }
                >
                  + Add
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="gursha-strip">
        <span>🤝</span>

        <div>
          <strong>The Spirit of Gursha</strong>

          <p>
            Sharing a bite directly into a companion's
            mouth is an act of deep hospitality and
            bond. Enjoy your service for communal Mesob
            presentation.
          </p>
        </div>

        <Link to="/menu">
          Explore Full Feast Menu
        </Link>
      </section>
    </main>
  );
}

function OptionGroup({
  title,
  required,
  children,
}) {
  return (
    <section className="option-group">
      <div className="option-heading">
        <h3>{title}</h3>

        {required && <span>Required</span>}
      </div>

      {children}
    </section>
  );
}

export default DishDetail;