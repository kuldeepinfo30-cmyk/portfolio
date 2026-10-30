import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { PageShell } from "@/components/ui/PageShell";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Open to freelance and full-time work. Tell me the goal and I'll tell you exactly how I'd get there.",
};

export default function ContactPage() {
  return (
    <PageShell>
      <Contact />
      <Footer />
    </PageShell>
  );
}
