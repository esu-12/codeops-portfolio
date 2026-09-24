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

        if (!registeredUser) {
          return {
            success: false,
            message:
              "No account found. Please register first.",
          };
        }

        const emailMatches =
          registeredUser.email.toLowerCase() ===
          email.toLowerCase();

        const phoneMatches =
          registeredUser.phone === phone;

        const passwordMatches =
          registeredUser.password === password;

        if (
          !emailMatches ||
          !phoneMatches ||
          !passwordMatches
        ) {
          return {
            success: false,
            message:
              "Invalid email, phone number, or password.",
          };
        }

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