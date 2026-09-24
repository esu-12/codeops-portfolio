import { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { signInSchema } from "../../utils/schemas";
import { useAuthStore } from "../../store/authStore";

import "./SignIn.css";

function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();

  const signIn = useAuthStore(
    (state) => state.signIn
  );

  const [authError, setAuthError] = useState("");
  const [noAccount, setNoAccount] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signInSchema),

    defaultValues: {
      email: "",
      phone: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    setAuthError("");
    setNoAccount(false);

    const result = signIn({
      email: data.email.trim(),
      phone: data.phone.trim(),
      password: data.password,
    });

    if (!result?.success) {
      if (
        result?.message ===
        "No account found. Please register first."
      ) {
        setNoAccount(true);
        setAuthError(
          "You don't have an account yet. Please register first."
        );
      } else {
        setAuthError(
          result?.message ||
            "Invalid email, phone number, or password."
        );
      }

      return;
    }

    const returnTo =
      location.state?.from || "/";

    navigate(returnTo, {
      replace: true,
    });
  };

  return (
    <section className="signin-page">

      {/* =====================================================
          TOP BREADCRUMB
      ====================================================== */}

      <div className="signin-breadcrumb">
        <span>HOME</span>
        <span>/</span>
        <span>ACCOUNT</span>
        <span>/</span>
        <strong>SIGN IN</strong>
      </div>

      {/* =====================================================
          MAIN TWO-COLUMN AREA
      ====================================================== */}

      <div className="signin-layout">

        {/* ===================================================
            LEFT WELCOME PANEL
        ==================================================== */}

        <aside className="signin-welcome">

          <span className="signin-badge">
            ✺ MESOB FEAST CIRCLE &amp; PERKS
          </span>

          <h1>
            A table shared is a
            <br />
            bond celebrated.
          </h1>

          <p className="signin-welcome-copy">
            Sign into your culinary sanctuary. Track your
            seasonal fasting platters, express your
            Jebena preferences, and summon traditional
            Addis feasts straight to your door.
          </p>

          <div className="signin-feature-image">
            <img
              src="/images/doro-wat.jpg"
              alt="Traditional Ethiopian food"
            />

            <div className="signin-image-overlay">
              <strong>
                Sunday Jebena Buna Circle
              </strong>

              <span>
                Exclusive to dining guests
              </span>
            </div>
          </div>

          <div className="signin-perks">

            <article>
              <span className="signin-perk-icon">
                ◉
              </span>

              <div>
                <strong>
                  10 Gursha Points / ETB 100
                </strong>

                <p>
                  Redeem against house-brewed
                  specialties and communal platters.
                </p>
              </div>
            </article>

            <article>
              <span className="signin-perk-icon">
                ♨
              </span>

              <div>
                <strong>
                  Free Bole &amp; Kazanchis Delivery
                </strong>

                <p>
                  Priority courier dispatch with
                  heat-insulated clay-stone trays.
                </p>
              </div>
            </article>

            <article>
              <span className="signin-perk-icon">
                ▣
              </span>

              <div>
                <strong>
                  Instant Telebirr &amp; CBE Birr
                </strong>

                <p>
                  Zero-fee instant table settlement
                  and 1-tap reordering.
                </p>
              </div>
            </article>

          </div>

          <div className="signin-quote">
            <span>❝</span>

            <p>
              The table ordering is as seamless as
              eating from our grandmother's mesob.
            </p>

            <small>
              — ER. SELAMAWIT H. — BOLÉ MEMBER
            </small>
          </div>

        </aside>

        {/* ===================================================
            RIGHT SIGN-IN CARD
        ==================================================== */}

        <div className="signin-card">

          <div className="signin-card-heading">
            <span>MEMBER PORTAL</span>

            <h2>
              Welcome to the Mesob Table
            </h2>

            <p>
              Sign in to manage your feasts,
              Telebirr rewards, and reserved dining
              mesas.
            </p>
          </div>

          {/* QUICK LOGIN */}

          <div className="signin-quick-actions">

            <button type="button">
              <span className="quick-icon">
                ▣
              </span>

              <span>
                <strong>
                  Telebirr SuperApp
                  <small>
                    Scan or Tap to Login
                  </small>
                </strong>
              </span>
            </button>

            <button type="button">
              <span className="quick-icon">
                G
              </span>

              <span>
                <strong>
                  Google Sign-In
                  <small>
                    Continue with Google
                  </small>
                </strong>
              </span>
            </button>

          </div>

          {/* DIVIDER */}

          <div className="signin-divider">
            <span>OR WITH PHONE / EMAIL</span>
          </div>

          {/* LOGIN METHOD */}

          <div className="signin-methods">
            <button
              type="button"
              className="active"
            >
              Ethiopian Mobile (+251)
            </button>

            <button type="button">
              Email Address
            </button>
          </div>

          {/* FORM */}

          <form
            className="signin-form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >

            {/* PHONE */}

            <div className="signin-form-group">

              <label htmlFor="phone">
                Ethiopian Mobile Number
              </label>

              <span className="signin-supported">
                SMS OTP Supported
              </span>

              <div className="signin-phone-input">

                <span>🇪🇹 +251</span>

                <input
                  id="phone"
                  type="tel"
                  placeholder="0911 234 567"
                  {...register("phone")}
                />

              </div>

              {errors.phone && (
                <p className="signin-form-error">
                  {errors.phone.message}
                </p>
              )}

            </div>

            {/* EMAIL */}

            <div className="signin-form-group">

              <label htmlFor="email">
                Email Address
              </label>

              <input
                id="email"
                type="email"
                placeholder="guest@mesobhouse.com"
                {...register("email")}
              />

              {errors.email && (
                <p className="signin-form-error">
                  {errors.email.message}
                </p>
              )}

            </div>

            {/* PASSWORD */}

            <div className="signin-form-group">

              <div className="signin-password-heading">

                <label htmlFor="password">
                  Password
                </label>

                <button
                  type="button"
                  className="forgot-password"
                >
                  Forgot Password?
                </button>

              </div>

              <div className="signin-password-input">

                <span>♙</span>

                <input
                  id="password"
                  type="password"
                  placeholder="Enter your confidential password"
                  {...register("password")}
                />

                <span>◉</span>

              </div>

              {errors.password && (
                <p className="signin-form-error">
                  {errors.password.message}
                </p>
              )}

            </div>

            {/* AUTH ERROR */}

            {authError && (
              <div
                className={`signin-auth-message ${
                  noAccount
                    ? "no-account-message"
                    : ""
                }`}
                role="alert"
              >
                <p className="signin-form-error">
                  {authError}
                </p>

                {noAccount && (
                  <Link
                    to="/register"
                    className="signin-register-now"
                  >
                    Create Your Account →
                  </Link>
                )}
              </div>
            )}

            {/* OPTIONS */}

            <div className="signin-options">

              <label>
                <input
                  type="checkbox"
                />

                <span>
                  Keep me signed in on this device
                </span>
              </label>

              <label>
                <input
                  type="checkbox"
                />

                <span>
                  Remember Addis address
                </span>
              </label>

            </div>

            {/* SUBMIT */}

            <button
              type="submit"
              className="signin-submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Signing In..."
                : "Sign In to Mesob House  ↪"}
            </button>

          </form>

          {/* REGISTER */}

          <div className="signin-register">

            <div>
              <span>
                New to our dining family?
              </span>

              <Link to="/register">
                Join the Mesob Table &amp; Register →
              </Link>
            </div>

            <button type="button">
              🔒 Continue as Guest
            </button>

          </div>

        </div>
      </div>

      {/* =====================================================
          BOTTOM INFORMATION STRIP
      ====================================================== */}

      <div className="signin-bottom-features">

        <div>
          <strong>
            ♢ ENCRYPTED SECURITY
          </strong>

          <span>
            Telebirr PIN &amp; CBE verified
          </span>
        </div>

        <div>
          <strong>
            ♧ FASTING FEASTS
          </strong>

          <span>
            Tsom Tuesdays &amp; Wednesdays
          </span>
        </div>

        <div>
          <strong>
            ◉ FRESH INJERA STEAM
          </strong>

          <span>
            Baked three times each day
          </span>
        </div>

        <div>
          <strong>
            ☎ BOLE CONCIERGE
          </strong>

          <span>
            +251 911 234 567
          </span>
        </div>

      </div>

    </section>
  );
}

export default SignIn;