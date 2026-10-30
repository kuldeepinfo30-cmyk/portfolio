"use client";

import { SectionHeading, Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import { accentStyles, experience } from "@/lib/data";

export function Experience() {
  return (
    <section id="experience" className="relative py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          label="trajectory"
          title="From coursework to client work."
          accentFrom={3}
          description="Two internships, a degree under AKTU, and a shelf of local client builds — the short version."
        />

        <Stagger className="relative mt-14 sm:mt-16" stagger={0.12}>
          <ol className="relative space-y-4 border-l border-line pl-6 sm:pl-8">
            {experience.map((item) => {
              const accent = accentStyles[item.accent];
              return (
                <li key={`${item.period}-${item.role}`} className="relative">
                  {/* timeline marker */}
                  <span
                    aria-hidden
                    className="absolute top-7 -left-[30px] flex h-3 w-3 items-center justify-center sm:-left-[38px]"
                  >
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${accent.dot} ${
                        item.current ? "anim-pulse-ring" : "opacity-60"
                      }`}
                    />
                  </span>

                  <StaggerItem>
                    <article className="bento-card bento-glow group relative overflow-hidden rounded-3xl bg-surface p-5 sm:p-7">
                      <span
                        aria-hidden
                        className="pointer-events-none absolute -top-20 -right-16 h-40 w-40 rounded-full bg-accent/12 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
                      />

                      <div className="flex flex-wrap items-center gap-3">
                        <span
                          className={`rounded-full border border-line bg-surface-2 px-3 py-1.5 font-mono text-[0.58rem] tracking-[0.2em] uppercase ${accent.text}`}
                        >
                          {item.period}
                        </span>
                        {item.current ? (
                          <span className="inline-flex items-center gap-2 rounded-full border border-accent-3/25 bg-accent-3/8 px-3 py-1.5 font-mono text-[0.56rem] tracking-[0.18em] text-accent-3-soft uppercase">
                            <span className="anim-pulse-ring h-1.5 w-1.5 rounded-full bg-accent-3" />
                            current
                          </span>
                        ) : null}
                      </div>

                      <h3 className="mt-5 text-[1.15rem] leading-snug font-semibold tracking-tight sm:text-[1.35rem]">
                        {item.role}
                      </h3>
                      <p className="mt-1.5 font-mono text-[0.64rem] tracking-[0.16em] text-ink-mute uppercase">
                        {item.org}
                      </p>

                      <ul className="mt-5 space-y-2.5">
                        {item.points.map((point) => (
                          <li
                            key={point}
                            className="flex gap-3 text-[0.88rem] leading-relaxed text-ink-mute"
                          >
                            <span
                              className={`mt-[0.6em] h-px w-4 shrink-0 ${accent.dot}`}
                            />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  </StaggerItem>
                </li>
              );
            })}
          </ol>

          <Reveal className="mt-6 pl-1" delay={0.1}>
            <p className="font-mono text-[0.62rem] tracking-[0.24em] text-ink-dim uppercase">
              {"// more detail available on request"}
            </p>
          </Reveal>
        </Stagger>
      </div>
    </section>
  );
}
