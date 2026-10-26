"use client";

import { Clock, Layers, Zap } from "@/components/ui/Icons";
import { SectionHeading, Stagger, StaggerItem } from "@/components/ui/Motion";
import { approach } from "@/lib/data";

/** One icon per pillar, matched to the `icon` key in `approach.pillars`. */
const ICONS = { zap: Zap, layers: Layers, clock: Clock } as const;

export function Approach() {
  return (
    <section id="approach" className="relative py-24 sm:py-32">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          label="how i work"
          title={approach.headline}
          accentFrom={4}
          description={approach.intro}
        />

        <Stagger
          className="mt-14 grid grid-cols-1 gap-5 sm:mt-16 lg:grid-cols-3"
          stagger={0.1}
        >
          {approach.pillars.map((pillar, index) => {
            const Icon = ICONS[pillar.icon];

            return (
              <StaggerItem key={pillar.title} className="h-full">
                <article className="bento-card bento-glow group relative flex h-full flex-col overflow-hidden rounded-3xl bg-surface p-6 sm:p-7">
                  {/* hover bloom */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-20 -right-16 h-44 w-44 rounded-full bg-accent/12 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
                  />

                  <div className="relative flex items-center justify-between gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-accent/35 bg-accent/12 text-accent">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-[0.62rem] tracking-[0.28em] text-ink-dim">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="relative mt-6 text-[1.15rem] leading-snug font-semibold tracking-tight sm:text-[1.28rem]">
                    {pillar.title}
                  </h3>
                  <p className="relative mt-3 text-[0.9rem] leading-relaxed text-ink-mute">
                    {pillar.body}
                  </p>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
