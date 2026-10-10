// app/(components)/RequireAuth/RequireAuth.jsx

"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function RequireAuth({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const loggedIn =
      localStorage.getItem("addisEatsLoggedIn") === "true";

    if (!loggedIn) {
      router.replace(
        `/login?redirect=${encodeURIComponent(pathname)}`
      );
      return;
    }

    setAuthorized(true);
  }, [router, pathname]);

  if (!authorized) {
    return null;
  }

  return children;
}