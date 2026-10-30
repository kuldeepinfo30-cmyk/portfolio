"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { CSSProperties, MouseEvent } from "react";
import { ArchitectureGraph } from "@/components/ui/ArchitectureGraph";
import { Chip, Cloud, Monitor, Server } from "@/components/ui/Icons";
import { SectionHeading, Stagger, StaggerItem } from "@/components/ui/Motion";
import { accentStyles, skillGroups, type SkillTool } from "@/lib/data";
import { useMediaQuery } from "@/lib/useMediaQuery";

/** One icon per category, matched to the order in `skillGroups`. */
const GROUP_ICONS = [Monitor, Server, Cloud, Chip];

const SPRING = { stiffness: 240, damping: 22, mass: 0.4 };

/** "#61DAFB" + 0.16 → "rgba(97, 218, 251, 0.16)" */
function withAlpha(hex: string, alpha: number) {
  const value = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(value.slice(i, i + 2), 16));
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function expertise(level: number) {
  if (level >= 92) return "Expert";
  if (level >= 84) return "Advanced";
  if (level >= 74) return "Proficient";
  return "Familiar";
}

/* ------------------------------------------------------------------
   A single floating badge — drifts on its own, tilts toward the
   cursor, and glows in its official brand colour on hover.
------------------------------------------------------------------ */
function SkillBadge({
  tool,
  tilt,
  delay,
}: {
  tool: SkillTool;
  /** false on touch devices / reduced motion — keeps the DOM identical */
  tilt: boolean;
  /** staggered idle-float offset, in seconds */
  delay: number;
}) {
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, SPRING);
  const sy = useSpring(py, SPRING);

  const rotateY = useTransform(sx, [0, 1], [-9, 9]);
  const rotateX = useTransform(sy, [0, 1], [9, -9]);

  function handleMove(event: MouseEvent<HTMLSpanElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
  }

  function reset() {
    px.set(0.5);
    py.set(0.5);
  }

  const brand = {
    "--brand": tool.brand,
    "--brand-soft": withAlpha(tool.brand, 0.16),
    "--brand-edge": withAlpha(tool.brand, 0.55),
  } as CSSProperties;

  return (
    <span
      className="badge-float block [perspective:760px]"
      style={{ animationDelay: `${delay}s` }}
    >
      <motion.span
        onMouseMove={tilt ? handleMove : undefined}
        onMouseLeave={tilt ? reset : undefined}
        style={tilt ? { ...brand, rotateX, rotateY } : brand}
        className="badge flex items-center gap-2.5 rounded-2xl px-3 py-2.5 [transform-style:preserve-3d]"
      >
        <span className="badge__mono flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-line bg-surface-2 font-mono text-[0.72rem] font-semibold text-ink-soft">
          {tool.short}
        </span>

        <span className="flex flex-col items-start leading-none">
          <span className="text-[0.82rem] font-medium tracking-tight text-ink-strong">
            {tool.name}
          </span>
          <span className="badge__level mt-1.5 font-mono text-[0.55rem] tracking-[0.16em] text-ink-dim uppercase">
            {tool.level}%
            <span className="sr-only"> proficiency</span>
          </span>
        </span>

        {/* expertise tooltip */}
        <span
          aria-hidden
          className="badge__tip flex items-center gap-2 rounded-xl border border-line bg-canvas-deep/95 px-2.5 py-1.5 shadow-[0_20px_45px_-24px_rgba(0,0,0,0.95)]"
        >
          <span
            className="h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ background: tool.brand, boxShadow: `0 0 10px 1px ${tool.brand}` }}
          />
          <span className="font-mono text-[0.55rem] tracking-[0.18em] text-ink-soft uppercase">
            {expertise(tool.level)}
          </span>
          <span className="h-1 w-9 shrink-0 overflow-hidden rounded-full bg-line">
            <span
              className="block h-full rounded-full"
              style={{ width: `${tool.level}%`, background: tool.brand }}
            />
          </span>
          <span
            className="font-mono text-[0.58rem] font-semibold"
            style={{ color: tool.brand }}
          >
            {tool.level}%
          </span>
          <span
            className="absolute top-full left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border-r border-b border-line bg-canvas-deep"
          />
        </span>
      </motion.span>
    </span>
  );
}

export function Skills() {
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const tilt = finePointer && !reduceMotion;

  return (
    <section id="skills" className="relative py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          label="capabilities"
          title="A stack grouped by discipline."
          accentFrom={2}
          description="Frontend, backend, databases and the tooling I debug with. Hover any badge to see how far I've taken it — each one has been used on a real build, not just a tutorial."
        />

        {/* interactive architecture playground — traces a request across the stack */}
        <div className="mt-14 sm:mt-16">
          <ArchitectureGraph />
        </div>

        <div className="relative mt-14 sm:mt-16">
          {/* rotating decorative ring */}
          <div
            aria-hidden
            className="anim-spin-slow pointer-events-none absolute top-1/2 left-1/2 hidden h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.16] xl:block"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0deg, var(--accent) 70deg, transparent 140deg, var(--accent-2) 250deg, transparent 320deg)",
              maskImage:
                "radial-gradient(circle, transparent 58%, #000 60%, #000 64%, transparent 66%)",
              WebkitMaskImage:
                "radial-gradient(circle, transparent 58%, #000 60%, #000 64%, transparent 66%)",
            }}
          />

          <Stagger
            className="relative grid grid-cols-1 gap-5 lg:grid-cols-2"
            stagger={0.12}
            amount={0.08}
          >
            {skillGroups.map((group, index) => {
              const accent = accentStyles[group.accent];
              const Icon = GROUP_ICONS[index] ?? Monitor;

              return (
                <StaggerItem key={group.title} className="h-full">
                  <article className="glass ring-glow relative flex h-full flex-col rounded-3xl p-5 sm:p-6">
                    {/* category bloom */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl"
                    >
                      <span
                        className={`absolute -top-16 -right-10 h-40 w-40 rounded-full blur-3xl ${accent.bg}`}
                      />
                    </span>

                    <header className="relative flex items-center gap-3">
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${accent.border} ${accent.bg} ${accent.text}`}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-[1rem] font-semibold tracking-tight text-ink-strong">
                          {group.title}
                        </h3>
                        <p className="truncate font-mono text-[0.55rem] tracking-[0.2em] text-ink-dim uppercase">
                          {group.tagline}
                        </p>
                      </div>
                      <span className="ml-auto shrink-0 rounded-full border border-line bg-surface-2 px-2.5 py-1 font-mono text-[0.55rem] tracking-[0.16em] text-ink-mute uppercase">
                        {group.items.length} tools
                      </span>
                    </header>

                    <Stagger
                      className="relative mt-5 flex flex-wrap gap-2.5"
                      stagger={0.035}
                      delay={0.12}
                      amount={0.05}
                    >
                      {group.items.map((tool, toolIndex) => (
                        <StaggerItem key={tool.name}>
                          <SkillBadge
                            tool={tool}
                            tilt={tilt}
                            delay={(toolIndex % 5) * 0.42}
                          />
                        </StaggerItem>
                      ))}
                    </Stagger>
                  </article>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
