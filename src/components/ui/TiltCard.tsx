"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, type MouseEvent, type ReactNode } from "react";

/**
 * 3D card that tilts toward the cursor with a light glare that follows it.
 * Purely CSS transform based — no WebGL needed, so it stays cheap.
 */
export function TiltCard({
  children,
  className = "",
  intensity = 9,
  glare = true,
  lift = 8,
}: {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees. */
  intensity?: number;
  glare?: boolean;
  /** How far the card floats up on hover, in px. */
  lift?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const spring = { stiffness: 180, damping: 18, mass: 0.5 };
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);

  const rotateY = useTransform(sx, [0, 1], [-intensity, intensity]);
  const rotateX = useTransform(sy, [0, 1], [intensity, -intensity]);
  const glareX = useTransform(sx, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(sy, [0, 1], ["0%", "100%"]);

  const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.16), transparent 60%)`;

  function handleMove(event: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
  }

  function handleLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <div className="[perspective:1200px]">
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ y: -lift, transition: { duration: 0.4 } }}
        className={`relative ${className}`}
      >
        {children}
        {glare ? (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: glareBg }}
          />
        ) : null}
      </motion.div>
    </div>
  );
}

/**
 * Lifts a child forward in 3D space. Use inside a `TiltCard` for depth.
 */
export function Depth({
  children,
  z = 40,
  className = "",
}: {
  children: ReactNode;
  z?: number;
  className?: string;
}) {
  return (
    <div className={className} style={{ transform: `translateZ(${z}px)` }}>
      {children}
    </div>
  );
}
