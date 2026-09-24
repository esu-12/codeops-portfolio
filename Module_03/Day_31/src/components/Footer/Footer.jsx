import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__grid">
        <section>
          <h3>Mesob House</h3>
          <p>Sharing traditions from the Ethiopian highlands — one Gursha at a time.</p>
          <div className="footer-note">🍽️ Traditional Coffee Ceremony daily at 4:00 PM</div>
        </section>

        <section>
          <h4>HOSPITALITY HOURS</h4>
          <p>Tuesday - Sunday: 11:30 AM - 11:00 PM</p>
          <p>Monday: Reserved for Private Gatherings</p>
          <strong>Jebena Buna &amp; Fresh Roasting All Evening</strong>
        </section>

        <section>
          <h4>GUEST ACCOUNT &amp; TRADITIONS</h4>
          <Link to="/signin">Sign In to Mesob Rewards</Link>
          <Link to="/register">Create Member Profile</Link>
          <span>Vegan Fasting (Beyaynetu) / Tsom</span>
          <span>House Tej (Pure Honey Wine)</span>
        </section>

        <section>
          <h4>ADDIS LOCATION</h4>
          <p>Bole Medhanialem, Addis Ababa &amp; Express delivery across town.</p>
          <a href="tel:+251911234567">+251 911 234 567</a>
          <div className="footer-icons" aria-hidden="true">◫　♜　▣</div>
        </section>
      </div>

      <div className="site-footer__bottom">
        <span>© 2025 Mesob House Habesha Dining. Authentic Ethiopian &amp; Eritrean Heritage.</span>
        <span>Gursha Hospitality　 Privacy Policy　 Terms of Table</span>
      </div>
    </footer>
  );
}

export default Footer;
