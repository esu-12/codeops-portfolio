"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./Register.css";

export default function RegisterPage() {
  const router = useRouter();

  /* =========================================================
     Watch Password
  ========================================================= */

const [form, setForm] = useState({
  name: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
  terms: false,
});

const [errors, setErrors] = useState({});
const [isSubmitting, setIsSubmitting] = useState(false);

const password = form.password;


function handleChange(event) {
  const { name, value, type, checked } = event.target;

  setForm({
    ...form,
    [name]: type === "checkbox" ? checked : value,
  });
}


  /* =========================================================
     Submit Registration
  ========================================================= */

  function handleSubmit(event) {
    event.preventDefault();

    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Full name is required.";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email address is required.";
    }

    if (!form.password) {
      newErrors.password = "Password is required.";
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (!form.terms) {
      newErrors.terms = "You must accept the terms.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    console.log("Registration data:", form);

    router.replace("/SignIn");
  }

  return (
    <section className="register-page">
      <div className="register-breadcrumb">
        <Link href="/cart">Account</Link>
        <span>/</span>
        <strong>Join the Mesob Family</strong>
      </div>

      <div className="register-layout">

        {/* =========================
            Welcome Section
        ========================= */}

        <aside className="register-welcome">
          <span className="member-badge">
            ✺　MEMBER CIRCLE
          </span>

          <h1>
            Become an Honored
            <br />
            Table Guest
          </h1>

          <p className="welcome-copy">
            Immerse yourself in authentic highland
            hospitality, where every shared meal honors
            community, connection, and craft.
          </p>

          <div className="welcome-benefits">

            <article>
              <span className="benefit-icon">♜</span>

              <div>
                <strong>
                  Welcome Gift: Pure Tej or Buna
                </strong>

                <p>
                  Enjoy a complimentary flask of
                  house-fermented Tej (pure honey wine)
                  or a personalized Buna upon receiving
                  your first inaugural welcome.
                </p>
              </div>
            </article>

            <article>
              <span className="benefit-icon">♧</span>

              <div>
                <strong>
                  Communal Gursha Points
                </strong>

                <p>
                  Earn generous loyalty points redeemable
                  for hand-poured Buna, seasonal specials,
                  and bespoke banquet upgrades.
                </p>
              </div>
            </article>

            <article>
              <span className="benefit-icon">♟</span>

              <div>
                <strong>
                  Fasting Calendar Alerts
                </strong>

                <p>
                  Timely seasonal notifications for fasting
                  periods. Chef's Bayan specialty spreads
                  and lentil specials.
                </p>
              </div>
            </article>

            <article>
              <span className="benefit-icon">✣</span>

              <div>
                <strong>
                  Express Addis Delivery
                </strong>

                <p>
                  Save time on delivery requests across
                  Addis Ababa with priority slots and
                  reliable service.
                </p>
              </div>
            </article>

            <article>
              <span className="benefit-icon">♜</span>

              <div>
                <strong>
                  Priority Mesob Table Reservations
                </strong>

                <p>
                  Skip standard waitlists for authentic
                  seating and evening green-coffee roasting
                  ceremonies.
                </p>
              </div>
            </article>

          </div>

          <div className="register-story">
            <img
              src="/images/doro-wat.jpg"
              alt="Traditional Ethiopian Doro Wat"
            />

            <div>
              <strong>
                TRADITION IN EVERY BITE
              </strong>

              <p>
                “Sharing from the same mesob is the
                ancient essence of long communion.”
              </p>

              <small>
                — Habesha Proverb
              </small>
            </div>
          </div>
        </aside>

        {/* =========================
            Registration Card
        ========================= */}

        <div className="register-card">

          <div className="register-card__heading">
            <h2>
              Create Your Mesob House Account
            </h2>

            <p>
              Join our culinary heritage circle in less
              than a minute.
            </p>
          </div>

          <div className="quick-actions">
            <button type="button">
              ▣　Telebirr Quick Sign
            </button>

            <button type="button">
              G　Continue with Google
            </button>
          </div>

          <div className="divider">
            <span>
              Or register with your details
            </span>
          </div>

          {/* =========================
              Registration Form
          ========================= */}

          <form
            className="register-form"
            onSubmit={handleSubmit}
            noValidate
          >

            {/* Full Name */}

            <label>
              Full Name

              <input
                type="text"
                name="name"
                placeholder="e.g. Abebe Bekele or Genet Tadesse"
                value={form.name}
                onChange={handleChange}
              />

              {errors.name && (
                <small className="register-error">
                  {errors.name}
                </small>
              )}
            </label>

            {/* Phone */}

            <label>
              Ethiopian Mobile Number

              <span className="phone-input">
                <span>🇪🇹　+251</span>

                <input
                  type="tel"
                  name="phone"
                  placeholder="7/911234567"
                  value={form.phone}
                  onChange={handleChange}
                />
              </span>

              <small>
                We will send a 4-digit code to your
                Ethiopian mobile number.
              </small>

              {errors.phone && (
                <small className="register-error">
                  {errors.phone}
                </small>
              )}
            </label>

            {/* Email */}

            <label>
              Email Address

              <input
                type="email"
                name="email"
                placeholder="guest@mesobhouse.com"
                value={form.email}
                onChange={handleChange}
              />

              {errors.email && (
                <small className="register-error">
                  {errors.email}
                </small>
              )}
            </label>

            {/* Password */}

            <div className="password-grid">

              <label>
                Password

                <input
                  type="password"
                  name="password"
                  placeholder="Minimum 8 characters"
                  value={form.password}
                  onChange={handleChange}
                />

                {errors.password && (
                  <small className="register-error">
                    {errors.password}
                  </small>
                )}
              </label>

              {/* Confirm Password */}

              <label>
                Confirm Password

                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Repeat password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                />

                {errors.confirmPassword && (
                  <small className="register-error">
                    {errors.confirmPassword}
                  </small>
                )}
              </label>

            </div>

            {/* =========================
                Live Password Requirements
            ========================= */}

            <div className="password-requirements">

              <p
                className={
                  password.length >= 8
                    ? "valid"
                    : "invalid"
                }
              >
                {password.length >= 8
                  ? "✅"
                  : "❌"}{" "}
                At least 8 characters
              </p>

              <p
                className={
                  /[A-Z]/.test(password)
                    ? "valid"
                    : "invalid"
                }
              >
                {/[A-Z]/.test(password)
                  ? "✅"
                  : "❌"}{" "}
                One uppercase letter (A-Z)
              </p>

              <p
                className={
                  /[a-z]/.test(password)
                    ? "valid"
                    : "invalid"
                }
              >
                {/[a-z]/.test(password)
                  ? "✅"
                  : "❌"}{" "}
                One lowercase letter (a-z)
              </p>

              <p
                className={
                  /[0-9]/.test(password)
                    ? "valid"
                    : "invalid"
                }
              >
                {/[0-9]/.test(password)
                  ? "✅"
                  : "❌"}{" "}
                One number (0-9)
              </p>

              <p
                className={
                  /[^A-Za-z0-9]/.test(password)
                    ? "valid"
                    : "invalid"
                }
              >
                {/[^A-Za-z0-9]/.test(password)
                  ? "✅"
                  : "❌"}{" "}
                One symbol
              </p>

            </div>

            {/* Dining Preference */}

            <div className="preference-field">
              <strong>
                Primary Dining Preference (Optional)
              </strong>

              <p>
                Helps us curate your welcome and fasting
                recommendations.
              </p>

              <div className="preference-pills">

                <button
                  type="button"
                  className="selected"
                >
                  All Heritage Delicacies
                </button>

                <button type="button">
                  Fasting &amp; Vegan (Tsom)
                </button>

                <button type="button">
                  Halal Certified Meat
                </button>

                <button type="button">
                  100% Pure Teff (Gluten-Free)
                </button>

              </div>
            </div>

            {/* Terms */}

            <label className="terms-row">
              <input
                type="checkbox"
                name="terms"
                checked={form.terms}
                onChange={handleChange}
              />

              <span>
                I agree to the{" "}
                <a href="#terms">
                  Mesob House Hospitality Terms
                </a>{" "}
                and{" "}
                <a href="#privacy">
                  Privacy Guidelines
                </a>
                .
              </span>
            </label>

            {errors.terms && (
              <p
                className="register-error"
                role="alert"
              >
                {errors.terms}
              </p>
            )}

            {/* Submit */}

            <button
              className="register-submit"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Creating Account..."
                : "Create Account & Receive Welcome Gursha　➜"}
            </button>

          </form>

          <p className="register-signin">
            Already part of our dining family?{" "}
            <Link href="/SignIn">
              Sign in here
            </Link>
          </p>

        </div>
      </div>
    </section>
  );
}