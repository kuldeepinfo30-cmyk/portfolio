"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Close, Menu, Sparkle } from "@/components/ui/Icons";
import { CTAButton, Magnetic } from "@/components/ui/Magnetic";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";
import { useReady } from "@/components/Intro";
import { navLinks, site } from "@/lib/data";
import { EASE } from "@/lib/motion";
import { scrollToSection } from "@/lib/scroll";

export function Navbar() {
  const ready = useReady();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const pendingHref = useRef<string | null>(null);

  /* shrink + auto-hide on scroll down */
  useEffect(() => {
    let lastY = window.scrollY;

    function handleScroll() {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 420 && y > lastY);
      lastY = y;
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* active section highlight */
  useEffect(() => {
    const ids = navLinks.map((link) => link.href.replace("#", ""));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  /* lock scroll while the mobile drawer is open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* the drawer holds the scroll lock, so honour its nav target once the
     lock is released and the page can actually move again */
  useEffect(() => {
    if (open || !pendingHref.current) return;
    const href = pendingHref.current;
    pendingHref.current = null;
    scrollToSection(href);
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{
          y: ready && !hidden ? 0 : -110,
          opacity: ready ? 1 : 0,
        }}
        transition={{ duration: 0.8, ease: EASE, delay: ready ? 0.1 : 0 }}
        className="fixed inset-x-0 top-0 z-50 px-2.5 pt-3 sm:px-5 sm:pt-4"
      >
        <nav
          className={`mx-auto flex max-w-7xl items-center justify-between gap-2 rounded-2xl px-2.5 py-3 transition-all duration-500 sm:gap-4 sm:px-5 ${
            scrolled
              ? "glass-nav shadow-[0_18px_60px_-30px_rgba(0,0,0,0.6)]"
              : "border border-transparent bg-transparent"
          }`}
        >
          {/* avatar — scrolls back to the top */}
          <a
            href="#home"
            onClick={(event) => {
              event.preventDefault();
              scrollToSection("#home");
            }}
            className="group flex min-w-0 items-center gap-2.5 pl-1"
            aria-label={`${site.name} — back to top`}
            title="Back to top"
          >
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-line-strong bg-gradient-to-br from-accent/30 to-accent-2/15 font-mono text-[0.72rem] font-semibold text-ink-strong transition-all duration-400 group-hover:border-accent/60 group-hover:shadow-[0_0_20px_-4px_rgba(var(--glow),0.85)]">
              KY
              <span className="absolute -right-0.5 -bottom-0.5 h-2 w-2 rounded-full bg-accent-3 shadow-[0_0_8px_2px_rgba(var(--glow-3),0.7)]" />
            </span>
            <span className="hidden flex-col leading-none sm:flex">
              <span className="text-[0.82rem] font-semibold tracking-tight text-ink-strong">
                {site.name}
              </span>
              <span className="font-mono text-[0.58rem] tracking-[0.22em] text-accent uppercase">
                {site.role}
              </span>
            </span>
          </a>

          {/* desktop links */}
          <ul className="hidden items-center gap-1 rounded-full border border-line bg-surface-2 p-1 lg:flex">
            {navLinks.map((link) => {
              const isActive = active === link.href;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(event) => {
                      event.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className={`relative block rounded-full px-4 py-2 text-[0.8rem] font-medium transition-colors duration-300 ${
                      isActive
                        ? "text-ink-strong"
                        : "text-ink-mute hover:text-ink-strong"
                    }`}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full border border-accent/40 bg-accent/12"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    ) : null}
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* right side — shrink-0 so the theme dots can never be squeezed
              off the edge on the narrowest phones */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <span className="hidden items-center gap-2 rounded-full border border-accent-3/25 bg-accent-3/8 px-3 py-1.5 xl:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-3 anim-pulse-ring" />
              <span className="font-mono text-[0.62rem] tracking-[0.16em] text-accent-3-soft uppercase">
                open for work
              </span>
            </span>

            <ThemeSwitcher />

            <div className="hidden sm:block">
              <CTAButton
                href="#contact"
                className="px-5 py-2.5 text-[0.8rem]"
                strength={0.18}
                icon={<Sparkle className="h-3.5 w-3.5" />}
              >
                Hire me
              </CTAButton>
            </div>

            <Magnetic strength={0.3}>
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface text-ink-strong transition-colors duration-300 hover:border-accent/50 hover:bg-accent/10 lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
            </Magnetic>
          </div>
        </nav>
      </motion.header>

      {/* mobile drawer */}
      <AnimatePresence>
        {open ? (
          <motion.div
            key="drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed inset-0 z-[70] lg:hidden"
          >
            <div
              className="absolute inset-0 bg-canvas/80"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.55, ease: EASE }}
              className="glass-soft absolute inset-y-0 right-0 flex w-[min(360px,88vw)] flex-col justify-between p-6"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="mono-label">menu</span>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close menu"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface text-ink-strong"
                  >
                    <Close className="h-5 w-5" />
                  </button>
                </div>

                <ul className="mt-10 flex flex-col gap-2">
                  {navLinks.map((link, index) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 26 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.12 + index * 0.06,
                        duration: 0.5,
                        ease: EASE,
                      }}
                    >
                      <a
                        href={link.href}
                        onClick={(event) => {
                          event.preventDefault();
                          pendingHref.current = link.href;
                          setOpen(false);
                        }}
                        className="group flex items-baseline gap-3 border-b border-line py-3.5 text-2xl font-medium tracking-tight text-ink transition-colors hover:text-ink-strong"
                      >
                        <span className="font-mono text-[0.62rem] text-accent">
                          0{index + 1}
                        </span>
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="mono-label">theme</span>
                  <ThemeSwitcher />
                </div>
                <a
                  href={`mailto:${site.email}`}
                  className="block font-mono text-[0.72rem] break-all text-accent-2-soft"
                >
                  {site.email}
                </a>
                <CTAButton
                  href="#contact"
                  className="w-full"
                  icon={<Sparkle className="h-4 w-4" />}
                >
                  Start a project
                </CTAButton>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
