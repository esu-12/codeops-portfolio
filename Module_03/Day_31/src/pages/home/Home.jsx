import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { API_URL } from "../../api.js";
import { useCartStore } from "../../store/cartStore";

import "./Home.css";

const imageMap = {
  "Royal Doro Wat": "/images/doro-wat.jpg",
  "Special Doro Wat": "/images/doro-wat.jpg",
  "Mesob Meat Combo": "/images/Awaze Lamb Tibs.jpg",
  "Special Fasting Beyaynetu":
    "/images/Golden Kik Alicha.jpg",
  "Golden Tej (Honey Wine)":
    "/images/House Fermented Tej (500ml Carafe).jpg",
  "Highland Spiced Shai":
    "/images/Highland Spiced Shai.jpg",
};

const fallbackSpecials = [
  {
    id: "doro-wat",
    nameEn: "Royal Doro Wat",
    priceETB: 710,
    spiceLevel: "Spicy",
    description:
      "Slow-simmered highland rooster with spiced boiled egg, 100% pure teff injera, and house berbere.",
    image: "/images/doro-wat.jpg",
  },
  {
    id: "meat-combo",
    nameEn: "Mesob Meat Combo",
    priceETB: 980,
    spiceLevel: "Medium Hot",
    description:
      "The ultimate highland feast with rich tibs, kitfo, gored gored, and golden alicha.",
    image: "/images/Awaze Lamb Tibs.jpg",
  },
  {
    id: "beyaynetu",
    nameEn: "Special Fasting Beyaynetu",
    priceETB: 480,
    spiceLevel: "Balanced Spice",
    description:
      "A colorful plant-based platter with lentils, greens, shiro, and house-made accompaniments.",
    image: "/images/Golden Kik Alicha.jpg",
  },
];

function getImage(dish) {
  return (
    dish.image ||
    imageMap[dish.nameEn] ||
    "/images/shiro.jpg"
  );
}

function Home() {
  const [specials, setSpecials] = useState([]);
  const [loading, setLoading] = useState(true);

  const addToCart = useCartStore(
    (state) => state.addToCart
  );

  useEffect(() => {
    const controller = new AbortController();

    async function fetchSpecials() {
      try {
        const response = await fetch(
          `${API_URL}/menu/specials`,
          {
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to load specials");
        }

        const result = await response.json();

        setSpecials(result.data || []);
      } catch (error) {
        if (error.name !== "AbortError") {
          setSpecials([]);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchSpecials();

    return () => controller.abort();
  }, []);

  const displayedSpecials = useMemo(
    () =>
      specials.length
        ? specials.slice(0, 3)
        : fallbackSpecials,
    [specials]
  );

  function handleAddSpecial(dish) {
    addToCart({
      id: String(dish.id),
      name: dish.nameEn,
      price: Number(dish.priceETB),
      image: getImage(dish),
    });
  }

  function handleAddProduct({
    id,
    title,
    price,
    image,
  }) {
    addToCart({
      id,
      name: title,
      price,
      image,
    });
  }

  return (
    <main className="home-page">
      <div className="home-fast-banner">
        <span>
          🍴 Tsom / Fasting Observance: 12-item Royal
          Beyaynetu vegan platter simmered fresh all day.
        </span>

        <span>
          100% Pure Teff Injera Available&nbsp;&nbsp; ·
          &nbsp;&nbsp;See Fasting Specialties →
        </span>
      </div>

      <section className="home-hero">
        <div className="home-hero__copy">
          <p className="home-eyebrow">
            TRADITIONAL HABESHA HERITAGE
          </p>

          <h1>
            Communal Warmth,
            <br />
            <em>Slow-Cooked Heritage.</em>
          </h1>

          <p className="home-lead">
            Handcrafted wats, ancient stone-ground teff
            injera, and velvety kitfo simmered in 72-hour
            infused niter kibbeh and homegrown berbere
            harvested from the Ethiopian highlands.
          </p>

          <div className="home-hero__actions">
            <Link
              className="home-primary-btn"
              to="/menu"
            >
              Explore Today&apos;s Specials →
            </Link>

            <Link
              className="home-soft-btn"
              to="/menu"
            >
              Full Banquet Menu
            </Link>

            <span className="home-note">
              ◷ Gursha Ceremony 4:00 PM Daily
            </span>
          </div>

          <div className="home-stats">
            <div>
              <strong>100%</strong>
              <span>Brown &amp; White Teff</span>
            </div>

            <div>
              <strong>6+</strong>
              <span>
                Hours
                <br />
                Slow Stew Caramel
              </span>
            </div>

            <div>
              <strong>Gursha</strong>
              <span>Hospitality Shared</span>
            </div>
          </div>
        </div>

        <div className="home-hero__visual">
          <div className="home-hero__image-card">
            <div className="home-floating-tag">
              ✦ Stone Ground
              <br />
              <small>Fresh Berbere Pepper</small>
            </div>

            <img
              src="/images/doro-wat.jpg"
              alt="Traditional Ethiopian feast"
            />

            <div className="home-hero__caption">
              <div>
                <span>CHEF&apos;S PICK</span>
                <strong>Great Mesob Feast</strong>
              </div>

              <b>ETB 1,650</b>
            </div>
          </div>
        </div>
      </section>

      <section
        className="home-specials"
        id="featured"
      >
        <div className="home-section-heading">
          <div>
            <p>FROM THE CLAY POTS</p>

            <h2>
              Today&apos;s Curated Chef Specials
            </h2>

            <span>
              Carefully balanced stews prepared at dawn
              using our matriarch&apos;s 40-spice blend,
              served piping hot on hand-stretched injera.
            </span>
          </div>

          <div className="home-filter">
            FILTER: <b>All (3)</b> &nbsp; Poultry &nbsp;
            Fasting / Tsom
          </div>
        </div>

        <div className="home-specials-grid">
          {loading && specials.length === 0
            ? fallbackSpecials.map((dish) => (
                <SpecialCard
                  key={dish.id}
                  dish={dish}
                  onAdd={handleAddSpecial}
                />
              ))
            : displayedSpecials.map((dish) => (
                <SpecialCard
                  key={dish.id}
                  dish={dish}
                  onAdd={handleAddSpecial}
                />
              ))}
        </div>
      </section>

      <section className="home-spirit">
        <div className="home-spirit__story">
          <p>02 THE SPIRIT OF GURSHA</p>

          <h2>
            "Those Who Share a
            <br />
            Mesob Never Walk Alone."
          </h2>

          <span>
            Gursha is the cherished act of honoring a
            companion by rolling a choice morsel of wat with
            injera and feeding them directly by hand. At
            Mesob House, every table is configured for
            communal warmth and slow gratitude.
          </span>

          <div className="home-ceremony-card">
            <strong>
              ✦ Authentic Clay Jebena Gursha Ceremony
            </strong>

            <p>
              Every day at 4:00 PM, frankincense fills our
              courtyard as green Sidama beans are
              hand-roasted over fire, poured fresh, and
              brewed in a traditional clay Jebena with
              popcorn and honey.
            </p>

            <Link to="/menu">
              Reserve Ceremony Seating →
            </Link>
          </div>
        </div>

        <div className="home-spirit__products">
          <MiniProduct
            title="Golden Tej (Honey Wine)"
            price="ETB 350"
            priceNumber={350}
            text="Crafted in-house using Ethiopian wild honey and dried Gesho."
            image="/images/House Fermented Tej (500ml Carafe).jpg"
            action="Add Carafe"
            productId="golden-tej"
            onAdd={handleAddProduct}
          />

          <MiniProduct
            title="Highland Spiced Shai"
            price="ETB 80"
            priceNumber={80}
            text="Slow-simmered highland black tea infused with cinnamon, clove, cardamom, pods."
            image="/images/Highland Spiced Shai.jpg"
            action="Add Cup"
            productId="highland-shai"
            onAdd={handleAddProduct}
          />

          <div className="home-extra-product">
            <span>🍯</span>

            <strong>
              Extra Teff Injera Rolls (Basket of 3)
            </strong>

            <b>ETB 90</b>

            <button
              type="button"
              onClick={() =>
                handleAddProduct({
                  id: "extra-teff-injera",
                  title:
                    "Extra Teff Injera Rolls (Basket of 3)",
                  price: 90,
                  image: "/images/shiro.jpg",
                })
              }
            >
              + Add Extra
            </button>

            <small>
              Naturally gluten-friendly and fermented 3
              days for airy eyes.
            </small>
          </div>
        </div>
      </section>

      <section className="home-testimonials">
        <p>VOICES AROUND THE MESOB</p>

        <h2>Honored Guest Reflections</h2>

        <div className="home-testimonial-grid">
          <Quote
            stars="★★★★★"
            quote="The Doro Wat was so reminiscent of my grandmother's cooking in Gondar. The berbere depth and slow-simmered onion were unmistakable!"
            name="Amal Mengistu"
            role="Bole Resident Foodie"
          />

          <Quote
            stars="★★★★★"
            quote="Their Fasting Beyaynetu is unmatched on Wednesdays. 12 vibrant dishes, and the Shiro tegamino came out bubbling in clay."
            name="Sara Tesfaye"
            role="Plant-Based Dining Advocate"
          />

          <Quote
            stars="★★★★★"
            quote="We hosted a 70-person family reunion around their large handcrafted mesobs. The coffee ceremony with fresh frankincense made the evening unforgettable."
            name="Dr. Kebede Wolde"
            role="Diaspora Homecoming Guest"
          />
        </div>
      </section>

      <section className="home-cta">
        <div>
          <p>JOIN OUR TABLE</p>

          <h2>
            Experience Authentic Habesha Warmth
            <br />
            Tonight
          </h2>

          <span>
            Whether gathering around our circular mesobs for
            communal dining or ordering freshly baked injera
            to your home in Addis Ababa.
          </span>
        </div>

        <div className="home-cta__actions">
          <Link to="/cart">
            Book a Mesob Table
          </Link>

          <Link to="/menu">
            View Complete Menu
          </Link>
        </div>
      </section>
    </main>
  );
}

function SpecialCard({ dish, onAdd }) {
  return (
    <article className="home-special-card">
      <div className="home-special-card__image">
        <img
          src={getImage(dish)}
          alt={dish.nameEn}
        />

        <span>Chef&apos;s Special Today</span>

        <b>
          {dish.spiceLevel || "Balanced Spice"}
        </b>
      </div>

      <div className="home-special-card__body">
        <div className="home-card-title">
          <h3>{dish.nameEn}</h3>

          <strong>
            ETB {Number(dish.priceETB).toLocaleString()}
          </strong>
        </div>

        <p>{dish.description}</p>

        <div>
          <Link to={`/menu/${dish.id}`}>
            View Details
          </Link>

          <button
            type="button"
            className="home-quick"
            onClick={() => onAdd(dish)}
          >
            ↗ Quick Add
          </button>
        </div>
      </div>
    </article>
  );
}

function MiniProduct({
  title,
  price,
  priceNumber,
  text,
  image,
  action,
  productId,
  onAdd,
}) {
  return (
    <article className="home-mini-product">
      <img src={image} alt="" />

      <div>
        <span>HOUSE FERMENTED</span>

        <h3>{title}</h3>

        <p>{text}</p>

        <small>
          500ml Carafe · 11% ABV
        </small>
      </div>

      <strong>{price}</strong>

      <button
        type="button"
        onClick={() =>
          onAdd({
            id: productId,
            title,
            price: priceNumber,
            image,
          })
        }
      >
        {action}
      </button>
    </article>
  );
}

function Quote({
  stars,
  quote,
  name,
  role,
}) {
  return (
    <article className="home-quote">
      <b>{stars}</b>

      <p>“{quote}”</p>

      <strong>{name}</strong>

      <small>{role}</small>
    </article>
  );
}

export default Home;