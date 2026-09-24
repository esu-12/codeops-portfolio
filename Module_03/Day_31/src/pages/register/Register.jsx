import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerSchema } from "../../utils/schemas";
import { useAuthStore } from "../../store/authStore";

import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const registerUser = useAuthStore(
    (state) => state.register
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    registerUser({
      name: data.name,
      fullName: data.name,
      phone: data.phone,
      email: data.email,
      password: data.password,
    });

    navigate("/signin", {
      replace: true,
    });
  };

  return (
    <section className="register-page">
      <div className="register-breadcrumb">
        <span>Account</span> /{" "}
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

              <small>— Habesha Proverb</small>
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
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            {/* Full Name */}

            <label>
              Full Name

              <input
                type="text"
                placeholder="e.g. Abebe Bekele or Genet Tadesse"
                {...register("name")}
              />

              {errors.name && (
                <small className="register-error">
                  {errors.name.message}
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
                  placeholder="911234567"
                  {...register("phone")}
                />
              </span>

              <small>
                We will send a 4-digit code to your
                Ethiopian mobile number.
              </small>

              {errors.phone && (
                <small className="register-error">
                  {errors.phone.message}
                </small>
              )}
            </label>

            {/* Email */}

            <label>
              Email Address

              <input
                type="email"
                placeholder="guest@mesobhouse.com"
                {...register("email")}
              />

              {errors.email && (
                <small className="register-error">
                  {errors.email.message}
                </small>
              )}
            </label>

            {/* Password */}

            <div className="password-grid">
              <label>
                Password

                <input
                  type="password"
                  placeholder="Minimum 8 characters"
                  {...register("password")}
                />

                {errors.password && (
                  <small className="register-error">
                    {errors.password.message}
                  </small>
                )}
              </label>

              <label>
                Confirm Password

                <input
                  type="password"
                  placeholder="Repeat password"
                  {...register("confirmPassword")}
                />

                {errors.confirmPassword && (
                  <small className="register-error">
                    {errors.confirmPassword.message}
                  </small>
                )}
              </label>
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
                {...register("terms")}
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
                {errors.terms.message}
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
            <Link to="/signin">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Register;