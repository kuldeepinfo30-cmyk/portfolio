import type { Metadata } from "next";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { PageShell } from "@/components/ui/PageShell";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Two software internships, a B.Tech under AKTU, and the client work in between — the short timeline.",
};

export default function ExperiencePage() {
  return (
    <PageShell>
      <Experience />
      <Footer />
    </PageShell>
  );
}
