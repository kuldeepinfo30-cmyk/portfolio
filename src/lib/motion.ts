import type { Transition, Variants } from "framer-motion";

/** Signature easing used across the whole site. */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const EASE_SOFT: [number, number, number, number] = [0.4, 0, 0.2, 1];

export const springSoft: Transition = {
  type: "spring",
  stiffness: 220,
  damping: 26,
  mass: 0.6,
};

/** Container that staggers its children on scroll into view. */
export const staggerContainer = (stagger = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: EASE } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 18 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE },
  },
};

/** Per-word mask reveal for big headlines. */
export const wordReveal: Variants = {
  hidden: { y: "115%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.9, ease: EASE },
  },
};

/**
 * Shared scroll-reveal viewports.
 * `margin: "-100px"` holds the trigger 100px inside the viewport, so an
 * element that has already played stays "in view" while you scroll past
 * it and never re-fires on the way back up.
 */
export const viewportOnce = { once: true, amount: 0.25, margin: "-100px" } as const;
export const viewportSoft = { once: true, amount: 0.15, margin: "-100px" } as const;
