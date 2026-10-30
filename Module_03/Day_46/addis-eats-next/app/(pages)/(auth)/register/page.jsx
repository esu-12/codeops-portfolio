// app/(pages)/(auth)/register/page.jsx
"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerUser } from "@/app/actions";
import "./Register.css";

export default function RegisterPage() {
  const router = useRouter();

  /*    Watch Password */
const [form, setForm] = useState({
  name: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
  terms: false,
});

const [errors, setErrors] = useState({});
const [serverError, setServerError] = useState("");
const [isSubmitting, setIsSubmitting] = useState(false);
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const password = form.password;

function handleChange(event) {
  const { name, value, type, checked } = event.target;

  setForm({
    ...form,
    [name]: type === "checkbox" ? checked : value,
  });
}

  /*    Submit Registration */
  async function handleSubmit(event) {
    event.preventDefault();
    setServerError("");

    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Full name is required.";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
    ) {
      newErrors.email = "Enter a valid email address.";
    }

    if (form.password.length < 8) {
      newErrors.password = "Password must contain at least 8 characters.";
    } else if (
      !/[A-Z]/.test(form.password) ||
      !/[a-z]/.test(form.password) ||
      !/[0-9]/.test(form.password) ||
      !/[^A-Za-z0-9]/.test(form.password)
    ) {
      newErrors.password =
        "Include an uppercase letter, lowercase letter, number, and symbol.";
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

    try {
      const formData = new FormData(event.currentTarget);

      // Normalize Ethiopian mobile numbers to +251 format.
      let phone = form.phone.trim().replace(/[\s()-]/g, "");

      if (/^0[79]\d{8}$/.test(phone)) {
        phone = `+251${phone.slice(1)}`;
      } else if (/^[79]\d{8}$/.test(phone)) {
        phone = `+251${phone}`;
      }

      formData.set("phone", phone);
      const result = await registerUser(formData);

      if (!result.success) {
        setServerError(
          result.error || "Registration failed. Please try again."
        );
        return;
      }

      router.replace(result.redirectTo || "/menu");
      router.refresh();
    } catch {
      setServerError(
        "Something went wrong while creating your account. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="register-page">
      <div className="register-breadcrumb">
        <Link href="/cart" prefetch = {false}>Account</Link>
        <span>/</span>
        <strong>Join the Mesob Family</strong>
      </div>

      <div className="register-layout">

        {/*   Welcome Section */}
        <aside className="register-welcome">
          <span className="member-badge">
            ✺　MEMBER CIRCLE
          </span>

          <h1>
            Become an Honored
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
            <Image
              src="/images/doro-wat.jpg"
              alt="Traditional Ethiopian Doro Wat"
              width={800}
              height={600}
              sizes="(max-width: 768px) 100vw, 50vw"
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

        {/*  Registration Card   */}
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

          {/*    Registration Form */}
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
                <span>ET　+251</span>
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

            {/* Password and Confirm Password */}
            <div className="password-grid">
              <label>
                Password
                <div className="register-password-input">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Minimum 8 characters"
                    value={form.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword((visible) => !visible)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    aria-pressed={showPassword}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                {errors.password && (
                  <small className="register-error">
                    {errors.password}
                  </small>
                )}
              </label>

              {/* Confirm Password */}
              <label>
                Confirm Password
                <div className="register-password-input">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Repeat password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    autoComplete="new-password"
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowConfirmPassword((visible) => !visible)
                    }
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                    aria-pressed={showConfirmPassword}
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>

                {errors.confirmPassword && (
                  <small className="register-error">
                    {errors.confirmPassword}
                  </small>
                )}
              </label>
            </div>

            {/*   Live Password Requirements */}
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

            {/* Display server errors */}
            {serverError && (
              <p className="register-error" role="alert">
                {serverError}
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
            <Link href="/login">
              Login in here
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}