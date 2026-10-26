/**
 * Smoothly bring a section into view.
 *
 * `#home` always resolves to the very top of the document (so the navbar
 * avatar / Home link land on the hero, not on its 6rem scroll-padding
 * offset), and reduced-motion users get an instant jump instead of a
 * long glide.
 */
export function scrollToSection(href: string) {
  const id = href.replace(/^#/, "");
  const instant = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const behavior: ScrollBehavior = instant ? "auto" : "smooth";

  if (!id || id === "home") {
    window.scrollTo({ top: 0, behavior });
    return;
  }

  document.getElementById(id)?.scrollIntoView({ behavior, block: "start" });
}
