"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/lib/useMediaQuery";

/**
 * Custom pointer: a soft glowing dot that trails the mouse on a spring,
 * wrapped in a magnetic ring that lags slightly behind it.
 *
 * Context-aware — the ring reacts to what sits under the pointer:
 *   · link / button  → the ring opens up a little
 *   · [data-cursor="view"] (project cards) → it grows into a
 *     "View Project" badge and the dot melts away
 *
 * Mounted only on hover-capable, fine-pointer devices, so touch phones
 * and tablets keep their native behaviour. It also skips the whole
 * rigmarole when JS is off, because nothing renders.
 */
type Mode = "idle" | "link" | "view";

/** Link/button targets the ring should react to. */
const INTERACTIVE = "a, button, [role='button'], summary, label";

/* Both springs are critically damped (ζ ≈ 1.2) — the old ones were
   under-damped, which is what read as jitter: they overshot and kept
   wobbling after every flick of the mouse. */
const DOT_SPRING = { stiffness: 1400, damping: 50, mass: 0.28 };
const RING_SPRING = { stiffness: 560, damping: 40, mass: 0.5 };
const INSTANT = { stiffness: 4000, damping: 130, mass: 0.1 };

export function Cursor() {
  const enabled = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const [mode, setMode] = useState<Mode>("idle");
  const [label, setLabel] = useState("View Project");
  const [visible, setVisible] = useState(false);

  const modeRef = useRef<Mode>("idle");
  const labelRef = useRef("View Project");
  const visibleRef = useRef(false);

  /* Source position — the dot tracks it almost 1:1, the ring trails a
     hair behind, and that small gap is what reads as "magnetic". */
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);

  const dotX = useSpring(x, reducedMotion ? INSTANT : DOT_SPRING);
  const dotY = useSpring(y, reducedMotion ? INSTANT : DOT_SPRING);
  const ringX = useSpring(x, reducedMotion ? INSTANT : RING_SPRING);
  const ringY = useSpring(y, reducedMotion ? INSTANT : RING_SPRING);

  useEffect(() => {
    if (!enabled) return;

    const root = document.documentElement;
    root.classList.add("cursor-none");

    /* First move is jumped, never sprung — otherwise the cursor would
       fly in from the top-left corner on the very first pixel of motion. */
    let placed = false;

    function place(px: number, py: number) {
      x.set(px);
      y.set(py);
      dotX.jump(px);
      dotY.jump(py);
      ringX.jump(px);
      ringY.jump(py);
    }

    function handleMove(event: PointerEvent) {
      if (!placed) {
        placed = true;
        place(event.clientX, event.clientY);
      } else {
        x.set(event.clientX);
        y.set(event.clientY);
      }

      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }
    }

    function handleOver(event: PointerEvent) {
      const target = event.target;
      if (!(target instanceof Element) || typeof target.closest !== "function") return;

      const view = target.closest<HTMLElement>('[data-cursor="view"]');
      const next: Mode = view
        ? "view"
        : target.closest(INTERACTIVE)
          ? "link"
          : "idle";

      if (next !== modeRef.current) {
        modeRef.current = next;
        setMode(next);
      }

      const nextLabel = view?.dataset.cursorLabel ?? "View Project";
      if (nextLabel !== labelRef.current) {
        labelRef.current = nextLabel;
        setLabel(nextLabel);
      }
    }

    function hide() {
      if (visibleRef.current) {
        visibleRef.current = false;
        setVisible(false);
      }
    }

    function handleOut(event: PointerEvent) {
      /* relatedTarget === null means the pointer left the window. */
      if (!event.relatedTarget) hide();
    }

    /* A click can land without a fresh pointermove (trackpad taps,
       programmatic clicks, or a fast press right after a jump), which
       used to leave the trailing layers behind and make the press look
       like it happened somewhere else. Re-anchor both layers on the
       press itself. */
    function press(event: PointerEvent) {
      place(event.clientX, event.clientY);
      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }
      root.classList.add("cursor-press");
    }

    function release() {
      root.classList.remove("cursor-press");
    }

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("pointerover", handleOver, { passive: true });
    window.addEventListener("pointerdown", press, { passive: true });
    window.addEventListener("pointerup", release, { passive: true });
    window.addEventListener("pointercancel", release, { passive: true });
    window.addEventListener("blur", hide);
    document.addEventListener("pointerout", handleOut, { passive: true });

    return () => {
      root.classList.remove("cursor-none", "cursor-press");
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerover", handleOver);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
      window.removeEventListener("blur", hide);
      document.removeEventListener("pointerout", handleOut);
    };
  }, [enabled, x, y, dotX, dotY, ringX, ringY]);

  if (!enabled) return null;

  /* Each layer is a zero-size anchor that Framer only ever translates,
     with the visible piece centred inside it. Keeping the two transforms
     on separate elements means the centring (and the press-scale) can
     never be multiplied by the motion transform. */
  return (
    <div aria-hidden className="pointer-events-none">
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="fixed top-0 left-0 z-[200] will-change-transform"
      >
        <span data-mode={mode} data-visible={visible} className="cursor-ring" />
        {/* the badge label is a sibling, not a child: the ring grows with a
            GPU `scale()`, and text parked inside it would be stretched by
            that same transform. Out here it stays at a legible size. */}
        <span data-mode={mode} data-visible={visible} className="cursor-label">
          {label}
        </span>
      </motion.div>

      <motion.div
        style={{ x: dotX, y: dotY }}
        className="fixed top-0 left-0 z-[201] will-change-transform"
      >
        <span data-mode={mode} data-visible={visible} className="cursor-dot" />
      </motion.div>
    </div>
  );
}
