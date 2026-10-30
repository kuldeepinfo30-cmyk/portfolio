import { About } from "@/components/About";
import { Approach } from "@/components/Approach";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { marqueeItems } from "@/lib/data";

export default function Home() {
  return (
    <>
      <Hero />

      {/* tech ticker band */}
      <div className="relative border-y border-line bg-surface-3 py-6">
        <Marquee items={marqueeItems} duration={36} />
        <Marquee
          items={[...marqueeItems].reverse()}
          reverse
          duration={48}
          className="mt-4 opacity-55"
        />
      </div>

      <About />
      <Skills />
      <Projects />
      <ProjectShowcase />
      <Approach />
      <Experience />
      <Contact />
      <Footer />
    </>
  );
}
