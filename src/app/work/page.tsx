import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { Projects } from "@/components/Projects";
import { PageShell } from "@/components/ui/PageShell";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Projects built end to end — an IPO application platform, an E-Library management system, and the local client builds delivered since.",
};

export default function WorkPage() {
  return (
    <PageShell>
      <Projects />
      <ProjectShowcase />
      <Footer />
    </PageShell>
  );
}
