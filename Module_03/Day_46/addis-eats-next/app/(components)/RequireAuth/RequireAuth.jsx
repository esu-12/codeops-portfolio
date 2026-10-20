// app/(components)/RequireAuth/RequireAuth.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { checkAuthStatus } from "@/app/actions";

export default function RequireAuth({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function verifySession() {
      try {
        const result = await checkAuthStatus();

        if (cancelled) return;

        if (!result.authenticated) {
          const query = searchParams.toString();
          const currentPath = query
            ? `${pathname}?${query}`
            : pathname;

          router.replace(
            `/login?next=${encodeURIComponent(currentPath)}`
          );
          return;
        }

        setAuthorized(true);
      } catch (error) {
        if (cancelled) return;

        console.error("Session verification failed:", error);

        router.replace(
          `/login?next=${encodeURIComponent(pathname)}`
        );
      }
    }

    verifySession();

    return () => {
      cancelled = true;
    };
  }, [router, pathname, searchParams]);

  if (!authorized) {
    return (
      <p role="status" aria-live="polite">
        Verifying your session...
      </p>
    );
  }

  return children;
}
