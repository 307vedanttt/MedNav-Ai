"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
export default function AuthGuard({
  children
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);
  useEffect(() => {
    // Skip checking for public routes
    const publicRoutes = ["/", "/login", "/technology"];
    if (publicRoutes.includes(pathname)) {
      setAuthorized(true);
      return;
    }
    const sessionExpiry = localStorage.getItem("medai_session_expiry");
    const currentTime = new Date().getTime();
    if (!sessionExpiry || currentTime > parseInt(sessionExpiry, 10)) {
      // Session expired or no session exists
      localStorage.removeItem("medai_session_expiry");
      router.push("/login");
    } else {
      setAuthorized(true);
    }
  }, [pathname, router]);

  // Don't render content until authorization check is complete for protected routes
  const publicRoutes = ["/", "/login", "/technology"];
  if (!authorized && !publicRoutes.includes(pathname)) {
    return <div className="min-h-screen flex text-primary items-center justify-center bg-background">
        <span className="material-symbols-outlined animate-spin text-4xl" data-icon="sync">sync</span>
      </div>;
  }
  return <>{children}</>;
}
