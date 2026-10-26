"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { useReady } from "@/components/Intro";
import { navLinks } from "@/lib/data";
import { EASE } from "@/lib/motion";
import { scrollToSection } from "@/lib/scroll";

/**
 * Fixed vertical dot rail pinned to the left edge (desktop only).
 * Hover expands the dot + reveals its tooltip, clicking scrolls to the
 * section, and the active dot is tracked with an IntersectionObserver so
 * the halo glides between dots as the page scrolls.
 */
export function DotNav() {
  const ready = useReady();
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.href.replace("#", "")))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      aria-label="Section navigation"
      /* y is animated here (not via a Tailwind translate class) so the
         vertical centring survives Framer's inline transform */
      initial={{ opacity: 0, x: -24, y: "-50%" }}
      animate={
        ready ? { opacity: 1, x: 0, y: "-50%" } : { opacity: 0, x: -24, y: "-50%" }
      }
      transition={{
        duration: reduceMotion ? 0 : 0.8,
        ease: EASE,
        delay: ready && !reduceMotion ? 0.35 : 0,
      }}
      className="fixed top-1/2 left-6 z-40 hidden lg:block"
    >
      <ul className="glass-soft relative flex flex-col items-center rounded-full px-1.5 py-2">
        <span
          aria-hidden
          className="absolute inset-y-5 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-line to-transparent"
        />

        {navLinks.map((link) => {
          const isActive = active === link.href;

          return (
            <li key={link.href} className="relative">
              <button
                type="button"
                onClick={() => scrollToSection(link.href)}
                aria-label={`Scroll to ${link.label}`}
                aria-current={isActive ? "true" : undefined}
                className="dot-nav__btn group relative flex h-8 w-8 items-center justify-center"
              >
                {isActive ? (
                  <motion.span
                    aria-hidden
                    layoutId="dot-nav-halo"
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 420, damping: 34 }
                    }
                    className="dot-nav__halo absolute inset-[5px] rounded-full border border-accent-soft/50 bg-accent/15"
                  />
                ) : null}

                <span
                  aria-hidden
                  className={`dot-nav__dot relative h-1.5 w-1.5 rounded-full ${
                    isActive ? "dot-nav__dot--active" : "bg-ink-dim/40"
                  }`}
                />

                <span
                  aria-hidden
                  className="dot-nav__tip rounded-lg border border-line bg-canvas-deep/95 px-2.5 py-1 font-mono text-[0.6rem] tracking-[0.14em] text-ink-soft uppercase shadow-[0_10px_30px_-14px_rgba(0,0,0,0.95)]"
                >
                  <span className="absolute top-1/2 -left-[3px] h-1.5 w-1.5 -translate-y-1/2 rotate-45 border-b border-l border-line bg-canvas-deep" />
                  {link.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}
