"use client";

import { useEffect, useState } from "react";

/**
 * False during SSR and the first client render, then reflects the user's
 * reduced-motion preference after mount (avoids hydration mismatches).
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}
