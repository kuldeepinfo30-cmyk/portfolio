"use client";

import { useSyncExternalStore } from "react";

/**
 * SSR-safe reactive media query. Returns `serverFallback` while rendering on
 * the server, then syncs to the real value on the client — without any
 * `setState` inside an effect.
 */
export function useMediaQuery(query: string, serverFallback = false) {
  return useSyncExternalStore(
    (onStoreChange) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onStoreChange);
      return () => list.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia(query).matches,
    () => serverFallback,
  );
}
