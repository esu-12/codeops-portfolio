// app/(components)/RequireAuth/RequireAuth.jsx

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RequireAuth({ children }) {
  const router = useRouter();

  useEffect(() => {
    const loggedIn =
      localStorage.getItem("addisEatsLoggedIn") === "true";

    if (!loggedIn) {
      router.replace("/login");
    }
  }, [router]);

  const loggedIn =
    typeof window !== "undefined" &&
    localStorage.getItem("addisEatsLoggedIn") === "true";

  if (!loggedIn) {
    return null;
  }

  return children;
}