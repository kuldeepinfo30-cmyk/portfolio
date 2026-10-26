"use client";

import { ArrowUpRight, Github, Layers } from "@/components/ui/Icons";
import { CTAButton } from "@/components/ui/Magnetic";
import { SectionHeading, Stagger, StaggerItem } from "@/components/ui/Motion";
import { ProjectCover } from "@/components/ui/ProjectCover";
import {
  accentStyles,
  bentoProjects,
  featuredProject,
  freelanceStats,
  socials,
  type Project,
} from "@/lib/data";

const GITHUB_HREF =
  socials.find((social) => social.label === "GitHub")?.href ?? "#";

/** Tailwind surface every bento tile shares: translucent panel + hover neon glow. */
const CARD =
  "bento-card bento-glow group relative h-full overflow-hidden rounded-3xl bg-surface";

const TAG =
  "tag-reveal rounded-full border border-line bg-surface-2 px-2.5 py-1 font-mono text-[0.55rem] tracking-[0.14em] text-ink-mute uppercase";

/** solid pill floated over a project cover */
const CHIP =
  "rounded-full border border-line bg-canvas/85 px-3 py-1.5 font-mono text-[0.54rem] tracking-[0.18em] uppercase";

/** GitHub-style activity heat scale (0 → 4). */
const HEAT = [
  "bg-surface",
  "bg-accent-3/25",
  "bg-accent-3/45",
  "bg-accent-3/70",
  "bg-accent-3",
];

/** Blueprint for the two medium tiles — wide (2 cols) then compact (1 col). */
const MEDIUM_SPANS = ["lg:col-span-2", "lg:col-span-1"];

export function Projects() {
  return (
    <section id="work" className="relative py-24 sm:py-32">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          label="selected work"
          title="Things I've built, start to finish."
          accentFrom={3}
          description="Two builds from my internships, plus the client work I've delivered since. The vault below opens every link in a single click."
        />

        <Stagger
          className="mt-14 grid grid-cols-1 gap-5 sm:mt-16 lg:auto-rows-[minmax(15rem,auto)] lg:grid-cols-4"
          stagger={0.1}
        >
          {/* ---------- 1 · FLAGSHIP (2×2) ---------- */}
          <StaggerItem className="h-full lg:col-span-2 lg:row-span-2">
            <FeaturedCard project={featuredProject} />
          </StaggerItem>

          {/* ---------- 2 · MEDIUM CARDS ---------- */}
          {bentoProjects.map((project, index) => (
            <StaggerItem
              key={project.title}
              className={`h-full ${MEDIUM_SPANS[index] ?? ""}`}
            >
              <MediumCard project={project} wide={index === 0} />
            </StaggerItem>
          ))}

          {/* ---------- 3 · SMALL STATS CARD ---------- */}
          <StaggerItem className="h-full lg:col-span-1">
            <StatsCard />
          </StaggerItem>
        </Stagger>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <CTAButton
            href="#vault"
            variant="outline"
            icon={<Layers className="h-4 w-4" />}
          >
            Open the client vault
          </CTAButton>
          <CTAButton
            href={GITHUB_HREF}
            external
            variant="ghost"
            icon={<Github className="h-4 w-4" />}
          >
            See more on GitHub
          </CTAButton>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   FLAGSHIP — cover, stack, details
------------------------------------------------------------------ */
function FeaturedCard({ project }: { project: Project }) {
  const accent = accentStyles[project.accent];

  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="view"
      data-cursor-label="View Project"
      className={`${CARD} flex flex-col p-2`}
    >
      <span
        aria-hidden
        className={`pointer-events-none absolute -top-24 -right-20 h-64 w-64 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-60 ${accent.bg}`}
      />

      {/* media */}
      <div className="relative h-48 shrink-0 overflow-hidden rounded-[1.4rem] sm:h-56 lg:h-[17rem]">
        <div className="absolute inset-0 transition-transform duration-[1100ms] ease-out group-hover:scale-[1.08]">
          {project.image ? (
            <span
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${project.image})` }}
            />
          ) : (
            <ProjectCover variant={project.cover} accent={project.accent} />
          )}
        </div>
        <span
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/25 to-transparent"
        />
        <span
          aria-hidden
          className="noise absolute inset-0 opacity-[0.05] mix-blend-overlay"
        />

        <div className="absolute inset-x-3 top-3 flex items-center justify-between gap-3">
          <span
            className={`inline-flex items-center gap-2 ${CHIP} ${accent.text}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${accent.dot}`} />
            {project.category}
          </span>
          <span className={`${CHIP} text-ink-mute`}>{project.year}</span>
        </div>

        <span
          className={`absolute bottom-3 left-3 inline-flex items-center gap-2 ${CHIP} text-ink`}
        >
          <span className="anim-pulse-ring h-1.5 w-1.5 rounded-full bg-accent-3" />
          source on github
        </span>
      </div>

      {/* body */}
      <div className="relative flex flex-1 flex-col px-3 pt-6 pb-3 sm:px-4 sm:pb-4">
        <h3 className="text-[clamp(1.6rem,3vw,2.35rem)] leading-[1.03] font-semibold tracking-[-0.04em]">
          {project.title}
        </h3>
        <p className="mt-3 max-w-lg text-[0.92rem] leading-relaxed text-ink-mute">
          {project.summary}
        </p>

        {project.stats ? (
          <dl className="mt-6 grid grid-cols-3 gap-3 rounded-2xl border border-line bg-surface-2 p-4">
            {project.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-mono text-[0.53rem] tracking-[0.16em] text-ink-dim uppercase">
                  {stat.label}
                </dt>
                <dd className={`mt-1.5 text-[0.95rem] font-semibold ${accent.text}`}>
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}

        <div className="mt-auto flex items-end justify-between gap-4 pt-6">
          <ul className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li key={tag} className={TAG}>
                {tag}
              </li>
            ))}
          </ul>
          <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-surface-2 text-ink transition-colors duration-500 group-hover:border-line-strong group-hover:bg-surface sm:flex">
            <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </a>
  );
}

/* ------------------------------------------------------------------
   MEDIUM — wide (cover left) or compact (cover top)
------------------------------------------------------------------ */
function MediumCard({
  project,
  wide = false,
}: {
  project: Project;
  wide?: boolean;
}) {
  const accent = accentStyles[project.accent];

  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="view"
      data-cursor-label="View Project"
      className={`${CARD} flex ${wide ? "flex-col sm:flex-row" : "flex-col"}`}
    >
      <span
        aria-hidden
        className={`pointer-events-none absolute -top-20 -right-16 h-48 w-48 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-60 ${accent.bg}`}
      />

      {/* media */}
      <div
        className={`relative shrink-0 overflow-hidden ${
          wide ? "h-40 w-full sm:h-auto sm:w-[42%]" : "h-32 w-full sm:h-36"
        }`}
      >
        <div className="absolute inset-0 transition-transform duration-[1100ms] ease-out group-hover:scale-[1.09]">
          {project.image ? (
            <span
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${project.image})` }}
            />
          ) : (
            <ProjectCover variant={project.cover} accent={project.accent} />
          )}
        </div>
        <span
          aria-hidden
          className={`absolute inset-0 ${
            wide
              ? "bg-gradient-to-t from-canvas via-canvas/25 to-transparent sm:bg-gradient-to-r sm:from-transparent sm:via-canvas/10 sm:to-canvas"
              : "bg-gradient-to-t from-canvas via-canvas/30 to-transparent"
          }`}
        />
        <span
          className={`absolute top-3 left-3 inline-flex items-center gap-2 ${CHIP} ${accent.text}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${accent.dot}`} />
          {project.category}
        </span>
      </div>

      {/* body */}
      <div className="relative flex flex-1 flex-col p-5 sm:p-6">
        <header className="flex items-center justify-between gap-3">
          <span className="font-mono text-[0.56rem] tracking-[0.22em] text-ink-dim uppercase">
            {project.year}
          </span>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-surface-2 text-ink transition-colors duration-500 group-hover:border-line-strong group-hover:bg-surface">
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </header>

        <h3 className="mt-4 text-[1.2rem] leading-snug font-semibold tracking-tight sm:text-[1.32rem]">
          {project.title}
        </h3>
        <p className="mt-2 text-[0.85rem] leading-relaxed text-ink-mute">
          {project.summary}
        </p>

        <div className="mt-auto pt-5">
          <p className="font-mono text-[0.54rem] tracking-[0.2em] text-ink-dim uppercase">
            highlights
          </p>
          <p className={`mt-1 text-[0.92rem] font-semibold ${accent.text}`}>
            {project.metric}
          </p>

          <ul className="mt-3 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li key={tag} className={TAG}>
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </a>
  );
}

/* ------------------------------------------------------------------
   SMALL — activity graph + delivery numbers
------------------------------------------------------------------ */
function StatsCard() {
  return (
    <div className={`${CARD} flex flex-col p-5 sm:p-6`}>
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-20 h-52 w-52 rounded-full bg-accent-3/12 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
      />
      <span
        aria-hidden
        className="noise absolute inset-0 opacity-[0.04] mix-blend-overlay"
      />

      <span className="relative inline-flex items-center gap-2 font-mono text-[0.55rem] tracking-[0.16em] text-accent-3-soft uppercase">
        <Github className="h-3.5 w-3.5" />
        {freelanceStats.handle}
      </span>

      <p className="relative mt-5 font-mono text-[0.54rem] tracking-[0.2em] text-ink-dim uppercase">
        {freelanceStats.heading}
      </p>

      <div
        aria-hidden
        className="relative mt-3 grid grid-cols-12 grid-rows-7 gap-[3px]"
      >
        {freelanceStats.contributions.map((level, index) => (
          <span
            key={index}
            className={`aspect-square w-full rounded-[2px] ${HEAT[level] ?? HEAT[0]}`}
          />
        ))}
      </div>

      <p className="relative mt-3 text-[0.66rem] text-ink-mute">
        <span className="font-semibold text-ink-strong">{freelanceStats.total}</span>{" "}
        {freelanceStats.unit}
      </p>

      <dl className="relative mt-auto grid grid-cols-3 gap-2 border-t border-line pt-5">
        {freelanceStats.highlights.map((item) => (
          <div key={item.label}>
            <dt className="font-mono text-[0.5rem] tracking-[0.14em] text-ink-dim uppercase">
              {item.label}
            </dt>
            <dd className="mt-1 text-[0.95rem] font-semibold text-ink-strong">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
