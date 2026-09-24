import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const suggestions = [
  {
    name: "Doro Wat",
    price: "ETB 650",
    image: "/images/doro-wat.jpg",
    tag: "Spicy Favorite",
    note: "Slow-simmered chicken with berbere and clarified butter."
  },
  {
    name: "Derek Tibs",
    price: "ETB 620",
    image: "/images/Awaze Lamb Tibs.jpg",
    tag: "Sizzling Clay",
    note: "Prime tenderloin seared with fresh mountain herbs."
  },
  {
    name: "Shiro Clay Pot",
    price: "ETB 450",
    image: "/images/shiro.jpg",
    tag: "Vegan / T'som",
    note: "Slow-ground chickpea stew with garlic, shallots and spices."
  }
];

export default function NotFound() {
  return (
    <div className="notfound-page">
      <main className="notfound-main">
        <section className="notfound-empty">
          <div className="empty-glow empty-glow-left" />
          <div className="empty-glow empty-glow-right" />

          <div className="empty-mesob">
            <div className="mesob-steam steam-one" />
            <div className="mesob-steam steam-two" />
            <div className="mesob-steam steam-three" />
            <div className="mesob-roof" />
            <div className="mesob-plate" />
            <span>Empty Mesob</span>
          </div>

          <div className="error-code">404</div>
          <h1>TABLE NOT • ERROR</h1>
          <p className="notfound-message">
            Looks like this dish has already been enjoyed or never made it to the kitchen!
          </p>

          <p className="notfound-copy">
            <strong>Even the best Gursha sometimes slips!</strong> Don’t let your appetite wait —
            our Addis kitchen has a hot day out paths and freshly rolled teff injera ready for your table right now.
          </p>

          <div className="notfound-actions">
            <Link className="nf-primary" to="/menu">↩ Return to Today's Specials</Link>
            <Link className="nf-secondary" to="/menu">Explore Full Menu</Link>
            <Link className="nf-secondary" to="/cart">Check Current Order</Link>
          </div>
        </section>

        <section className="guest-favorites">
          <div className="favorites-heading">
            <div>
              <span className="section-kicker">✦ HOUSE FAVORITES</span>
              <h2>Hungry? Here's What Our Guests Love Today</h2>
            </div>
            <Link to="/menu">View 28 Traditional Dishes →</Link>
          </div>

          <div className="favorites-grid">
            {suggestions.map((dish) => (
              <article className="favorite-card" key={dish.name}>
                <div className="favorite-image-wrap">
                  <span className="favorite-tag">{dish.tag}</span>
                  <img src={dish.image} alt={dish.name} />
                </div>
                <div className="favorite-body">
                  <div className="favorite-title-row">
                    <h3>{dish.name}</h3>
                    <strong>{dish.price}</strong>
                  </div>
                  <p>{dish.note}</p>
                  <div className="favorite-footer">
                    <span>{dish.name === "Doro Wat" ? "Served with 2 Teff Injera" : dish.name === "Derek Tibs" ? "Mild or Fiery Crisp" : "100% Plant Based"}</span>
                    <Link to="/menu">Order Now +</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="reserve-strip">
          <div className="reserve-icon">♧</div>
          <div>
            <strong>Lost your table or need personalized dietary recommendations?</strong>
            <p>Our concierge in Bole Medhanialem is delighted to prepare your banquet.</p>
          </div>
          <a href="tel:+251911234567" className="reserve-phone">☎ +251 911 234 567</a>
          <Link to="/checkout" className="reserve-button">Reserve</Link>
        </section>
      </main>
    </div>
  );
}
