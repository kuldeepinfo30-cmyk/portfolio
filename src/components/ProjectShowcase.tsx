"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight, Layers, Sparkle } from "@/components/ui/Icons";
import { CTAButton } from "@/components/ui/Magnetic";
import { Reveal, SectionHeading } from "@/components/ui/Motion";
import { clientProjects, freelanceStats, site } from "@/lib/data";
import { EASE } from "@/lib/motion";

/**
 * The "show me everything" panel.
 *
 * One click opens every client project in a single grid — no hunting
 * through old chats or DMs. `clientProjects` in lib/data.ts is the only
 * thing you ever edit: paste an object per project and it shows up here.
 */
export function ProjectShowcase() {
  const [open, setOpen] = useState(false);
  const total = freelanceStats.total;
  const live = clientProjects.length;

  return (
    <section id="vault" className="relative pb-16 sm:pb-20">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          label="client vault"
          title="Every build I've delivered, one click away."
          accentFrom={4}
          description="Dashboards, booking flows and admin panels built for local businesses. Each link lands in here as it clears for sharing — so you never have to dig through old chats."
        />

        <Reveal className="mt-14 sm:mt-16" y={30}>
          <div className="glass relative overflow-hidden rounded-3xl p-6 sm:p-8">
            {/* hover bloom */}
            <span
              aria-hidden
              className="pointer-events-none absolute -top-28 -right-24 h-64 w-64 rounded-full bg-accent-2/12 blur-3xl"
            />

            <div className="relative flex flex-wrap items-center justify-between gap-5">
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-accent-2/35 bg-accent-2/12 text-accent-2">
                  <Layers className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-mono text-[0.58rem] tracking-[0.24em] text-ink-dim uppercase">
                    project index
                  </p>
                  <p className="mt-1 text-[0.92rem] font-medium tracking-tight text-ink-strong">
                    <span className="text-accent-2">{live}</span>
                    <span className="text-ink-mute"> of {total} links public</span>
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-expanded={open}
                aria-controls="vault-panel"
                className="group inline-flex items-center gap-3 rounded-full border border-line-strong bg-surface px-5 py-3 font-mono text-[0.66rem] tracking-[0.18em] text-ink-strong uppercase transition-colors duration-400 hover:border-accent-2/60 hover:bg-accent-2/10"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent-2 anim-pulse-ring" />
                {open ? "close the vault" : "open the vault"}
                <motion.span
                  animate={{ rotate: open ? 180 : 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="text-accent-2"
                >
                  <ArrowUpRight className="h-3.5 w-3.5 rotate-45" />
                </motion.span>
              </button>
            </div>

            <AnimatePresence initial={false}>
              {open ? (
                <motion.div
                  id="vault-panel"
                  key="vault-panel"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="relative mt-7"
                >
                  {live > 0 ? (
                    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {clientProjects.map((project) => (
                        <li key={project.title} className="h-full">
                          <article className="bento-card bento-glow group flex h-full flex-col rounded-2xl bg-surface p-5">
                            <header className="flex items-center justify-between gap-3">
                              <span className="font-mono text-[0.55rem] tracking-[0.18em] text-accent-2 uppercase">
                                {project.type}
                              </span>
                              <span className="font-mono text-[0.55rem] tracking-[0.18em] text-ink-dim uppercase">
                                {project.year}
                              </span>
                            </header>

                            <h3 className="mt-4 text-[1.05rem] leading-snug font-semibold tracking-tight">
                              {project.title}
                            </h3>
                            <p className="mt-2 text-[0.84rem] leading-relaxed text-ink-mute">
                              {project.summary}
                            </p>

                            <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                              <ul className="flex flex-wrap gap-1.5">
                                {project.stack.map((item) => (
                                  <li
                                    key={item}
                                    className="rounded-full border border-line bg-surface-2 px-2.5 py-1 font-mono text-[0.53rem] tracking-[0.12em] text-ink-mute uppercase"
                                  >
                                    {item}
                                  </li>
                                ))}
                              </ul>

                              {project.href ? (
                                <a
                                  href={project.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label={`Open ${project.title}`}
                                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-accent-2/40 bg-accent-2/10 px-3 py-1.5 font-mono text-[0.55rem] tracking-[0.14em] text-accent-2 uppercase transition-colors duration-400 hover:bg-accent-2/20"
                                >
                                  open
                                  <ArrowUpRight className="h-3 w-3" />
                                </a>
                              ) : (
                                <span className="shrink-0 rounded-full border border-line px-3 py-1.5 font-mono text-[0.55rem] tracking-[0.14em] text-ink-dim uppercase">
                                  private
                                </span>
                              )}
                            </div>
                          </article>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="rounded-2xl border border-dashed border-line-strong bg-surface-3 p-6 text-center sm:p-9">
                      <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl border border-line bg-surface text-accent-2">
                        <Sparkle className="h-5 w-5" />
                      </span>
                      <h3 className="mt-5 text-[1.05rem] font-semibold tracking-tight">
                        Nothing public just yet.
                      </h3>
                      <p className="mx-auto mt-2 max-w-md text-[0.86rem] leading-relaxed text-ink-mute">
                        The first batch goes up the moment each client clears it
                        for sharing. Until then I&apos;m happy to walk you through
                        the builds screen by screen.
                      </p>
                      <div className="mt-6 flex justify-center">
                        <CTAButton
                          href={`mailto:${site.email}?subject=Project%20walkthrough`}
                          icon={<ArrowUpRight className="h-4 w-4" />}
                        >
                          Ask for a private walkthrough
                        </CTAButton>
                      </div>
                    </div>
                  )}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
