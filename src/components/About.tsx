"use client";

import { MapPin, Sparkle } from "@/components/ui/Icons";
import { CTAButton } from "@/components/ui/Magnetic";
import {
  Reveal,
  SectionHeading,
  Stagger,
  StaggerItem,
} from "@/components/ui/Motion";
import { about, site } from "@/lib/data";

/**
 * The story section. Lives on the landing page as `#about` and is re-used
 * as the whole body of `/about`, so there is exactly one place to edit.
 */
export function About() {
  return (
    <section id="about" className="relative py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          label={about.label}
          title={about.title}
          accentFrom={2}
          description={about.intro}
        />

        <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 lg:grid-cols-12">
          {/* ---------------- profile card ---------------- */}
          <Reveal className="lg:col-span-5" y={26}>
            <div className="glass ring-glow relative h-full overflow-hidden rounded-3xl p-6 sm:p-7">
              <span
                aria-hidden
                className="pointer-events-none absolute -top-24 -right-20 h-56 w-56 rounded-full bg-accent/12 blur-3xl"
              />

              <div className="relative flex items-center gap-4">
                <span className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-line-strong bg-gradient-to-br from-accent/30 to-accent-2/15 font-mono text-lg font-semibold text-ink-strong">
                  KY
                  <span className="absolute -right-1 -bottom-1 h-3 w-3 rounded-full bg-accent-3 shadow-[0_0_10px_2px_rgba(var(--glow-3),0.7)]" />
                </span>

                <div className="min-w-0">
                  <h3 className="text-[1.15rem] font-semibold tracking-tight text-ink-strong">
                    {site.name}
                  </h3>
                  <p className="font-mono text-[0.6rem] tracking-[0.2em] text-accent uppercase">
                    {site.role}
                  </p>
                  <p className="mt-2 inline-flex items-center gap-1.5 text-[0.78rem] text-ink-mute">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-accent-2" />
                    {site.location}
                  </p>
                </div>
              </div>

              <dl className="relative mt-6 space-y-3 border-t border-line pt-6">
                {about.facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="flex items-start justify-between gap-4"
                  >
                    <dt className="font-mono text-[0.58rem] tracking-[0.18em] text-ink-dim uppercase">
                      {fact.label}
                    </dt>
                    <dd className="max-w-[62%] text-right text-[0.8rem] text-ink-soft">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="relative mt-6">
                <CTAButton
                  href="/work"
                  variant="outline"
                  className="w-full"
                  icon={<Sparkle className="h-4 w-4" />}
                >
                  See what I&apos;ve built
                </CTAButton>
              </div>
            </div>
          </Reveal>

          {/* ---------------- the story ---------------- */}
          <div className="flex flex-col gap-5 lg:col-span-7">
            <Reveal y={26} delay={0.08}>
              <div className="bento-card bento-glow group relative overflow-hidden rounded-3xl bg-surface p-6 sm:p-7">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-20 -right-16 h-44 w-44 rounded-full bg-accent-2/12 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
                />

                <div className="relative space-y-4">
                  {about.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-[0.92rem] leading-relaxed text-ink-mute"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>

            <Stagger
              className="grid grid-cols-1 gap-5 sm:grid-cols-3"
              stagger={0.1}
            >
              {about.principles.map((item, index) => (
                <StaggerItem key={item.title} className="h-full">
                  <article className="bento-card bento-glow group relative flex h-full flex-col overflow-hidden rounded-3xl bg-surface p-5">
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -top-16 -right-12 h-36 w-36 rounded-full bg-accent/12 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
                    />

                    <span className="relative font-mono text-[0.6rem] tracking-[0.28em] text-ink-dim">
                      0{index + 1}
                    </span>
                    <h4 className="relative mt-4 text-[0.98rem] font-semibold tracking-tight text-ink-strong">
                      {item.title}
                    </h4>
                    <p className="relative mt-2 text-[0.82rem] leading-relaxed text-ink-mute">
                      {item.body}
                    </p>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}
