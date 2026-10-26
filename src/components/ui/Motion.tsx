"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE, fadeUp, staggerContainer, wordReveal } from "@/lib/motion";

/* ------------------------------------------------------------------
   REVEAL — generic scroll-triggered fade/slide
------------------------------------------------------------------ */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2, margin: "-100px" }}
      transition={{ duration: 0.75, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------
   TEXT REVEAL — per-word mask animation for big headlines
------------------------------------------------------------------ */
export function TextReveal({
  text,
  className = "",
  wordClassName = "",
  accentFrom,
  accentClassName = "text-gradient",
  delay = 0,
  stagger = 0.06,
  once = true,
  active,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  /** Words from this index onward get `accentClassName`. */
  accentFrom?: number;
  accentClassName?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  /**
   * When provided, the reveal is driven by this flag instead of by
   * scroll position — used for above-the-fold content that must wait
   * for the intro sequence to finish.
   */
  active?: boolean;
}) {
  const words = text.split(" ");

  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      {...(active === undefined
        ? { whileInView: "show", viewport: { once, amount: 0.4, margin: "-100px" } }
        : { animate: active ? "show" : "hidden" })}
    >
      {words.map((word, index) => {
        const accent = accentFrom !== undefined && index >= accentFrom;
        return (
          <span key={`${word}-${index}`}>
            <span className="inline-block overflow-hidden pb-[0.14em] align-bottom">
              <motion.span
                variants={wordReveal}
                className={`inline-block ${accent ? accentClassName : ""} ${wordClassName}`}
              >
                {word}
              </motion.span>
            </span>
            {index < words.length - 1 ? " " : null}
          </span>
        );
      })}
    </motion.span>
  );
}

/* ------------------------------------------------------------------
   STAGGER — container + item helpers
------------------------------------------------------------------ */
export function Stagger({
  children,
  className,
  stagger = 0.09,
  delay = 0,
  amount = 0.15,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount, margin: "-100px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------
   SECTION HEADING
------------------------------------------------------------------ */
export function SectionHeading({
  label,
  title,
  accentFrom,
  description,
  align = "left",
  className = "",
}: {
  label: string;
  title: string;
  accentFrom?: number;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col gap-5 ${
        align === "center" ? "items-center text-center" : "items-start"
      } ${className}`}
    >
      <Reveal y={14}>
        <span className="inline-flex items-center gap-3 rounded-full border border-line bg-surface px-3.5 py-1.5">
          <span
            className="h-1.5 w-1.5 rounded-full bg-accent-2"
            style={{ boxShadow: "0 0 10px 2px rgba(var(--glow-2), 0.8)" }}
          />
          <span className="mono-label">{label}</span>
        </span>
      </Reveal>

      <h2
        className={`max-w-4xl text-[clamp(2rem,6.2vw,4.4rem)] font-semibold leading-[0.98] tracking-[-0.04em] ${
          align === "center" ? "mx-auto" : ""
        }`}
      >
        <TextReveal
          text={title}
          accentFrom={accentFrom}
          stagger={0.045}
          delay={0.05}
        />
      </h2>

      {description ? (
        <Reveal delay={0.15} y={18}>
          <p
            className={`max-w-2xl text-[0.98rem] leading-relaxed text-ink-mute sm:text-base ${
              align === "center" ? "mx-auto" : ""
            }`}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
