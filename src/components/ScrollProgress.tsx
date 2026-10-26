"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin neon progress bar pinned to the very top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 40,
    mass: 0.4,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="will-change-transform fixed inset-x-0 top-0 z-[65] h-[2px] origin-left bg-gradient-to-r from-accent via-accent-soft to-accent-2 shadow-[0_0_18px_rgba(var(--glow),0.8)]"
    />
  );
}
