import Link from "next/link";
import { ArrowDown, Github, Linkedin, Mail } from "@/components/ui/Icons";
import { CTAButton } from "@/components/ui/Magnetic";
import { navLinks, site, socials } from "@/lib/data";

const SOCIAL_ICONS = [Github, Linkedin, Mail];

/**
 * Static so the page stays fully prerenderable — Next 16 rejects
 * `new Date()` during prerendering.
 */
const SITE_YEAR = 2026;

export function Footer() {
  const year = SITE_YEAR;

  return (
    <footer className="relative overflow-hidden border-t border-line pt-20">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr]">
          {/* pitch */}
          <div>
            <span className="mono-label">next step</span>
            <h2 className="mt-5 text-[clamp(1.7rem,3.6vw,2.6rem)] leading-[1.05] font-semibold tracking-[-0.04em] text-ink-strong">
              Let&apos;s build something
              <span className="text-gradient"> worth shipping.</span>
            </h2>
            <p className="mt-5 max-w-md text-[0.92rem] leading-relaxed text-ink-mute">
              Whether it&apos;s a fresh MVP or a rescue mission on an existing
              codebase — tell me the goal and I&apos;ll tell you exactly how I&apos;d
              get there.
            </p>
            <div className="mt-7">
              <CTAButton href={`mailto:${site.email}?subject=Project%20enquiry`}>
                Start a conversation
              </CTAButton>
            </div>
          </div>

          {/* nav */}
          <nav aria-label="Footer">
            <span className="mono-label">explore</span>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-[0.9rem] text-ink-mute transition-colors hover:text-ink-strong"
                  >
                    <span className="h-[1px] w-0 bg-accent transition-all duration-400 group-hover:w-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* contact */}
          <div>
            <span className="mono-label">direct</span>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2.5 text-[0.86rem] break-all text-ink-soft transition-colors hover:text-ink-strong"
                >
                  <Mail className="h-4 w-4 shrink-0 text-accent" />
                  {site.email}
                </a>
              </li>
              <li className="text-[0.86rem] text-ink-mute">{site.location}</li>
              <li className="font-mono text-[0.62rem] tracking-[0.18em] text-accent-3-soft uppercase">
                {site.availability}
              </li>
            </ul>

            <div className="mt-6 flex gap-3">
              {socials.map((social, index) => {
                const Icon = SOCIAL_ICONS[index] ?? Github;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface-2 text-ink-mute transition-all duration-400 hover:-translate-y-0.5 hover:border-accent/50 hover:bg-accent/10 hover:text-ink-strong"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-16 flex flex-col-reverse items-center gap-5 border-t border-line py-8 sm:flex-row sm:justify-between">
          <p className="font-mono text-[0.6rem] tracking-[0.16em] text-ink-dim uppercase">
            © {year} {site.name} — all rights reserved
          </p>
          <p className="font-mono text-[0.6rem] tracking-[0.16em] text-ink-dim uppercase">
            built with next.js · tailwind · framer motion
          </p>
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface-2 px-4 py-2 font-mono text-[0.6rem] tracking-[0.18em] text-ink-mute uppercase transition-colors hover:border-accent-2/50 hover:text-accent-2-soft"
          >
            back to home
            <ArrowDown className="h-3.5 w-3.5 rotate-180 transition-transform duration-400 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>

      {/* oversized watermark */}
      <div aria-hidden className="pointer-events-none select-none overflow-hidden">
        <p className="text-outline -mb-[0.12em] text-center text-[clamp(2.4rem,13.5vw,11rem)] leading-[0.8] font-semibold tracking-[-0.06em] opacity-40">
          {site.name.toUpperCase()}
        </p>
      </div>
    </footer>
  );
}
