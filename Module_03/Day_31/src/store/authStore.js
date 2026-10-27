import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      registeredUser: null,

      register: (user) => {
        set({
          registeredUser: user,
          user: null,
          isAuthenticated: false,
        });
      },

      signIn: ({ email, phone, password }) => {
        const registeredUser = get().registeredUser;

        // No account has been registered yet
        if (!registeredUser) {
          return {
            success: false,
            reason: "NO_ACCOUNT",
            message:
              "You don't have an account yet. Please register first.",
          };
        }

        const enteredEmail = email.trim().toLowerCase();
        const enteredPhone = phone.trim();

        const registeredEmail =
          registeredUser.email.trim().toLowerCase();

        const registeredPhone =
          registeredUser.phone.trim();

        // Email or phone does not belong to the registered account
        if (
          enteredEmail !== registeredEmail ||
          enteredPhone !== registeredPhone
        ) {
          return {
            success: false,
            reason: "NO_ACCOUNT",
            message:
              "No account was found with this email and phone number. Please register first.",
          };
        }

        // Account exists, but password is wrong
        if (registeredUser.password !== password) {
          return {
            success: false,
            reason: "INVALID_PASSWORD",
            message:
              "Your password is incorrect. Please try again.",
          };
        }

        // Login successful
        set({
          user: {
            name: registeredUser.name,
            email: registeredUser.email,
            phone: registeredUser.phone,
          },
          isAuthenticated: true,
        });

        return {
          success: true,
        };
      },

      signOut: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "mesob-house-auth",
    }
  )
);

export const useUser = () =>
  useAuthStore((state) => state.user);

export const useIsAuthenticated = () =>
  useAuthStore((state) => state.isAuthenticated);