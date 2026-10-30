"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { useRef, type ElementType, type MouseEvent, type ReactNode } from "react";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  /** How strongly the element follows the pointer (0 - 1). */
  strength?: number;
};

/**
 * Wraps any element and makes it "magnetic" — it leans toward the cursor
 * and springs back when the pointer leaves.
 */
export function Magnetic({
  children,
  className,
  strength = 0.32,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const spring = { stiffness: 240, damping: 16, mass: 0.45 };
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);

  function handleMove(event: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type CTAProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "outline";
  className?: string;
  icon?: ReactNode;
  external?: boolean;
  strength?: number;
};

const CTA_STYLES: Record<NonNullable<CTAProps["variant"]>, string> = {
  primary:
    "text-canvas-deep bg-gradient-to-r from-accent-soft via-accent to-accent-2 shadow-[0_10px_40px_-12px_rgba(var(--glow),0.9)] hover:shadow-[0_16px_50px_-10px_rgba(var(--glow-2),0.85)]",
  ghost: "text-ink-strong glass hover:border-line-strong hover:bg-surface-2",
  outline:
    "text-ink-strong border border-line-strong bg-transparent hover:border-accent-2/60 hover:text-accent-2-soft",
};

/**
 * Neon call-to-action link with a magnetic pull + a cursor-tracking sheen.
 *
 * Hrefs that start with `/` route through `next/link`, so an internal CTA
 * changes page client-side instead of triggering a full browser reload.
 */
export function CTAButton({
  href,
  children,
  variant = "primary",
  className = "",
  icon,
  external = false,
  strength = 0.22,
}: CTAProps) {
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const sheen = useMotionTemplate`radial-gradient(circle at ${mx}% ${my}%, rgba(255,255,255,0.45), transparent 55%)`;

  const Tag: ElementType = href.startsWith("/") && !external ? Link : "a";

  function handleMove(event: MouseEvent<HTMLAnchorElement>) {
    const el = anchorRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set(((event.clientX - rect.left) / rect.width) * 100);
    my.set(((event.clientY - rect.top) / rect.height) * 100);
  }

  return (
    <Magnetic strength={strength}>
      <Tag
        ref={anchorRef}
        href={href}
        onMouseMove={handleMove}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : undefined)}
        className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3.5 text-sm font-semibold tracking-tight transition-all duration-500 sm:px-7 ${CTA_STYLES[variant]} ${className}`}
      >
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: sheen }}
        />
        <span className="relative z-10">{children}</span>
        {icon ? (
          <span className="relative z-10 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            {icon}
          </span>
        ) : null}
      </Tag>
    </Magnetic>
  );
}

/**
 * Hero CTA — a "liquid" conic glow races around the border while the
 * halo expands and the surface brightens on hover.
 */
export function LiquidButton({
  href,
  children,
  className = "",
  icon,
  external = false,
  strength = 0.18,
}: CTAProps) {
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const sheen = useMotionTemplate`radial-gradient(160px circle at ${mx}% ${my}%, rgba(255,255,255,0.5), transparent 72%)`;

  const Tag: ElementType = href.startsWith("/") && !external ? Link : "a";

  function handleMove(event: MouseEvent<HTMLAnchorElement>) {
    const el = anchorRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set(((event.clientX - rect.left) / rect.width) * 100);
    my.set(((event.clientY - rect.top) / rect.height) * 100);
  }

  return (
    <Magnetic strength={strength}>
      <Tag
        ref={anchorRef}
        href={href}
        onMouseMove={handleMove}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : undefined)}
        className={`liquid-btn will-change-transform group relative inline-flex overflow-hidden rounded-full p-[1.5px] transition-[transform,box-shadow] duration-500 hover:scale-[1.035] hover:shadow-[0_0_38px_-4px_rgba(var(--glow),0.85),0_0_80px_-12px_rgba(var(--glow-2),0.6)] ${className}`}
      >
        <span aria-hidden className="liquid-btn__ring" />
        <span aria-hidden className="liquid-btn__ring-alt" />
        <span aria-hidden className="liquid-btn__face" />

        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-[1.5px] z-[2] rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: sheen }}
        />

        <span className="relative z-10 inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-tight text-ink-strong">
          {children}
          {icon ? (
            <span className="transition-transform duration-500 group-hover:translate-x-1">
              {icon}
            </span>
          ) : null}
        </span>
      </Tag>
    </Magnetic>
  );
}

/**
 * Small square icon button (socials, copy-to-clipboard, etc.)
 */
export function IconButton({
  children,
  href,
  label,
  onClick,
  className = "",
}: {
  children: ReactNode;
  href?: string;
  label: string;
  onClick?: () => void;
  className?: string;
}) {
  const internal = Boolean(href?.startsWith("/"));
  const Tag: ElementType = !href ? "button" : internal ? Link : "a";

  return (
    <Magnetic strength={0.4}>
      <Tag
        href={href}
        onClick={onClick}
        aria-label={label}
        title={label}
        {...(href
          ? internal
            ? undefined
            : { target: "_blank", rel: "noopener noreferrer" }
          : { type: "button" })}
        className={`inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface-2 text-ink-mute transition-all duration-400 hover:border-accent/50 hover:bg-accent/10 hover:text-ink-strong ${className}`}
      >
        {children}
      </Tag>
    </Magnetic>
  );
}
