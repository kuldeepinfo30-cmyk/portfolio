import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Skills } from "@/components/Skills";
import { PageShell } from "@/components/ui/PageShell";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "The stack I work in day to day — React, Next.js, Node, Java, MongoDB and MySQL — plus the tools I use to ship.",
};

export default function SkillsPage() {
  return (
    <PageShell>
      <Skills />
      <Footer />
    </PageShell>
  );
}
