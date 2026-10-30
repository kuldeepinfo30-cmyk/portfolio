import type { Metadata } from "next";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { PageShell } from "@/components/ui/PageShell";
import { about, site } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description: about.intro,
};

export default function AboutPage() {
  return (
    <PageShell>
      <About />
      <section className="relative py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <p className="max-w-2xl text-[0.92rem] leading-relaxed text-ink-mute">
            Want the short version instead? The{" "}
            <span className="text-ink-strong">trajectory</span> page has the
            timeline, and everything I&apos;ve shipped lives under{" "}
            <span className="text-ink-strong">work</span>. Still easier — email{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-accent-2-soft underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink-strong"
            >
              {site.email}
            </a>{" "}
            and ask me anything.
          </p>
        </div>
      </section>
      <Footer />
    </PageShell>
  );
}
