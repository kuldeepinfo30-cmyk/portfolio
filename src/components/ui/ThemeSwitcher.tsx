"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useId, useRef, useState } from "react";
import { Matrix, Moon, Sun } from "@/components/ui/Icons";
import { EASE } from "@/lib/motion";
import { THEME_STORAGE_KEY, useThemeId, type ThemeId } from "@/lib/useTheme";

const THEMES: {
  id: ThemeId;
  label: string;
  hint: string;
  Icon: typeof Moon;
}[] = [
  {
    id: "cyber",
    label: "Cyberpunk",
    hint: "Cyberpunk — deep purple, neon accents",
    Icon: Moon,
  },
  {
    id: "studio",
    label: "Studio",
    hint: "High-end studio — paper white, matte black",
    Icon: Sun,
  },
  {
    id: "hacker",
    label: "Hacker",
    hint: "Hacker — matrix green on pure black",
    Icon: Matrix,
  },
];

export function ThemeSwitcher({ className = "" }: { className?: string }) {
  const theme = useThemeId();
  const reduced = useReducedMotion();
  /* two switchers can be mounted at once (navbar + mobile drawer), so the
     sliding highlight needs its own layoutId per instance */
  const pillId = `theme-pill-${useId()}`;

  /** The ripple curtain that covers the screen while the theme flips. */
  const [curtain, setCurtain] = useState<{
    id: number;
    x: number;
    y: number;
    radius: number;
    next: ThemeId;
  } | null>(null);
  const curtainId = useRef(0);
  const switchingTimer = useRef<number | null>(null);

  /* write the attribute + persist it, then let the CSS cross-fade glide
     every tokenised colour for half a second */
  function commit(next: ThemeId) {
    const root = document.documentElement;
    /* setAttribute instead of `dataset.theme = …` — the react-hooks
       immutability rule flags direct member assignment, and this is the
       same DOM write. */
    root.setAttribute("data-theme", next);

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* private mode — the theme simply won't persist */
    }

    /* keep the mobile browser chrome in sync with the new canvas */
    const canvas = getComputedStyle(root).getPropertyValue("--canvas").trim();
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta && canvas) meta.setAttribute("content", canvas);

    root.classList.add("theme-switching");
    if (switchingTimer.current) window.clearTimeout(switchingTimer.current);
    switchingTimer.current = window.setTimeout(() => {
      root.classList.remove("theme-switching");
    }, 560);
  }

  function pick(next: ThemeId, event: React.MouseEvent<HTMLButtonElement>) {
    if (next === theme) return;

    /* reduced motion → no ripple, the cross-fade carries the change */
    if (reduced) {
      commit(next);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    curtainId.current += 1;
    setCurtain({ id: curtainId.current, x, y, radius, next });
  }

  return (
    <>
      <div
        role="group"
        aria-label="Colour theme"
        className={`glass flex items-center gap-0.5 rounded-full p-1 ${className}`}
      >
        {THEMES.map(({ id, label, hint, Icon }) => {
          const active = theme === id;

          return (
            <button
              key={id}
              type="button"
              onClick={(event) => pick(id, event)}
              aria-label={`${label} theme`}
              aria-pressed={active}
              title={hint}
              className={`relative inline-flex h-7 w-7 items-center justify-center rounded-full transition-colors duration-300 sm:h-8 sm:w-8 ${
                active
                  ? "text-ink-strong"
                  : "text-ink-dim hover:text-ink-soft"
              }`}
            >
              {active ? (
                <motion.span
                  layoutId={pillId}
                  className="absolute inset-0 rounded-full border"
                  style={{
                    borderColor: "rgba(var(--glow), 0.5)",
                    background: "rgba(var(--glow), 0.16)",
                    boxShadow: "0 0 16px -4px rgba(var(--glow), 0.9)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              ) : null}
              <Icon className="relative h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
          );
        })}
      </div>

      {/* ripple: grows from the clicked chip, theme swaps underneath it,
          then it dissolves to reveal the new palette */}
      <AnimatePresence>
        {curtain ? (
          <motion.div
            key={curtain.id}
            data-theme={curtain.next}
            aria-hidden
            className="theme-ripple"
            style={{ background: "var(--canvas)" }}
            initial={{
              clipPath: `circle(0px at ${curtain.x}px ${curtain.y}px)`,
            }}
            animate={{
              clipPath: `circle(${curtain.radius}px at ${curtain.x}px ${curtain.y}px)`,
            }}
            exit={{ opacity: 0, transition: { duration: 0.45, ease: "easeOut" } }}
            transition={{ duration: 0.6, ease: EASE }}
            onAnimationComplete={() => {
              commit(curtain.next);
              window.setTimeout(() => setCurtain(null), 80);
            }}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}
