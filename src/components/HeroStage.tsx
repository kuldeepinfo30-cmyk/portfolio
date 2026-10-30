"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { useMediaQuery } from "@/lib/useMediaQuery";

/**
 * Hero visual layer — pure presentation, zero layout impact.
 *  · drifting starfield + a slowly moving technical grid
 *  · a neon aura that trails the pointer (spring-smoothed)
 *  · a floating abstract 3D-ish shape that leans toward the pointer
 */
export function HeroStage() {
  const finePointer = useMediaQuery("(pointer: fine)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const interactive = finePointer && !reducedMotion;

  const px = useMotionValue(0);
  const py = useMotionValue(0);

  /* Firmer than the old { 55, 18, 0.9 }: that spring was so under-damped
     it kept updating for well over a second after the pointer stopped,
     and each update re-composites a very large blurred layer. This one
     settles in a few frames, so the backdrop goes quiet as soon as the
     mouse does. */
  const spring = { stiffness: 110, damping: 28, mass: 0.6 };
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);

  const auraX = useTransform(sx, [-1, 1], [-70, 70]);
  const auraY = useTransform(sy, [-1, 1], [-54, 54]);

  const shapeX = useTransform(sx, [-1, 1], [30, -30]);
  const shapeY = useTransform(sy, [-1, 1], [20, -20]);
  const tiltY = useTransform(sx, [-1, 1], [16, -16]);
  const tiltX = useTransform(sy, [-1, 1], [-14, 14]);

  useEffect(() => {
    if (!interactive) return;

    function handleMove(event: PointerEvent) {
      px.set((event.clientX / window.innerWidth - 0.5) * 2);
      py.set((event.clientY / window.innerHeight - 0.5) * 2);
    }

    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, [interactive, px, py]);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* starfield */}
      <div className="starfield absolute inset-0 opacity-70" />
      <div className="starfield-twinkle absolute inset-0" />

      {/* slowly drifting technical grid */}
      <div className="grid-drift mask-fade-y absolute inset-0 opacity-60" />

      {/* pointer-tracking aura behind the headline. A 90px blur on a
          54rem surface was the most expensive thing in the hero — the
          blur is cached, but the layer is enormous, so it was trimmed
          to a size that still reads as a soft glow. */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          style={{ x: auraX, y: auraY }}
          className="will-change-transform h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(var(--glow),0.32),rgba(var(--glow-2),0.12)_45%,transparent_72%)] blur-[60px] sm:h-[46rem] sm:w-[46rem]"
        />
      </div>

      {/* floating abstract shape */}
      <div className="absolute -right-16 -bottom-24 hidden [perspective:900px] lg:block">
        <motion.div
          style={{ x: shapeX, y: shapeY, rotateX: tiltX, rotateY: tiltY }}
          className="will-change-transform [transform-style:preserve-3d]"
        >
          <div className="relative h-[30rem] w-[30rem]">
            <div className="hero-orb absolute inset-8" />
            <div className="hero-ring absolute inset-0" />
            <div className="hero-ring-rev absolute inset-12" />
            <div className="hero-ring-dashed absolute inset-24" />
            <div className="absolute inset-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/25 blur-2xl" />
          </div>
        </motion.div>
      </div>

      {/* bottom blend into the page */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-canvas to-transparent" />
    </div>
  );
}
