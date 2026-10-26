"use client";

import { motion, useSpring } from "framer-motion";
import { useEffect } from "react";
import { useMediaQuery } from "@/lib/useMediaQuery";

const SIZE = 460;

/** Half the layer, so the blob stays centred on the pointer. */
const HALF = SIZE / 2;

/**
 * Soft neon glow that trails the pointer. Fine-pointer devices only,
 * and it opts out entirely for reduced-motion users.
 *
 * Kept deliberately cheap: no `filter: blur()` on a 460px layer that
 * moves every frame (the multi-stop gradient below already reads as a
 * blur, and skipping the filter means the browser only has to composite
 * the layer instead of re-rasterising it), and colours come from the
 * theme tokens so all three palettes get the right glow.
 */
export function CursorGlow() {
  const finePointer = useMediaQuery("(pointer: fine)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const enabled = finePointer && !reducedMotion;

  /* Slightly under-damped-to-critical so it glides with the dot instead
     of smearing a hundred milliseconds behind it. */
  const x = useSpring(-SIZE, { stiffness: 260, damping: 30, mass: 0.4 });
  const y = useSpring(-SIZE, { stiffness: 260, damping: 30, mass: 0.4 });

  useEffect(() => {
    if (!enabled) return;

    function handleMove(event: PointerEvent) {
      x.set(event.clientX - HALF);
      y.set(event.clientY - HALF);
    }

    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-30 hidden rounded-full will-change-transform md:block"
      style={{
        width: SIZE,
        height: SIZE,
        x,
        y,
        background:
          "radial-gradient(circle, rgba(var(--glow), 0.18) 0%, rgba(var(--glow), 0.1) 26%, rgba(var(--glow-2), 0.06) 48%, transparent 70%)",
      }}
    />
  );
}
