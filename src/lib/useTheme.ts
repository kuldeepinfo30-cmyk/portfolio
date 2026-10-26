"use client";

import { useSyncExternalStore } from "react";

export type ThemeId = "cyber" | "studio" | "hacker";

export const THEME_STORAGE_KEY = "portfolio-theme";

export const THEME_IDS: ThemeId[] = ["cyber", "studio", "hacker"];

export function isThemeId(value: string | null | undefined): value is ThemeId {
  return typeof value === "string" && (THEME_IDS as string[]).includes(value);
}

/* ------------------------------------------------------------------
   The `data-theme` attribute on <html> is the single source of truth:
   layout.tsx seeds it before first paint, this hook just observes it.
   SSR renders the default (`cyber`) and useSyncExternalStore re-reads
   the live value straight after hydration — no mismatch warnings.
------------------------------------------------------------------ */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function readTheme(): ThemeId {
  const value = document.documentElement.dataset.theme;
  return isThemeId(value) ? value : "cyber";
}

const readServerTheme = (): ThemeId => "cyber";

export function useThemeId(): ThemeId {
  return useSyncExternalStore(subscribe, readTheme, readServerTheme);
}
