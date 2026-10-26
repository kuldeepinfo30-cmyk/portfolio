"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowDown, Clock, MapPin, Sparkle, TerminalIcon } from "@/components/ui/Icons";
import { CTAButton, LiquidButton } from "@/components/ui/Magnetic";
import { TextReveal } from "@/components/ui/Motion";
import { HeroStage } from "@/components/HeroStage";
import { useReady } from "@/components/Intro";
import { site, stats } from "@/lib/data";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { EASE, fadeUp, staggerContainer } from "@/lib/motion";

const FLOATING_CHIPS = [
  { label: "React.js", className: "top-[18%] right-[4%]", delay: 0.9 },
  { label: "Node.js", className: "top-[46%] right-[9%]", delay: 1.05 },
  { label: "MongoDB", className: "top-[70%] right-[3%]", delay: 1.2 },
];

/* rotating role keywords — typewriter effect */
const ROLES = ["Full-Stack Developer", "React & Node Developer", "Problem Solver"];
const TYPE_MS = 62;
const DELETE_MS = 30;
const HOLD_MS = 1500;
const GAP_MS = 420;

function RotatingRole({ active }: { active: boolean }) {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [roleIndex, setRoleIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!active || reducedMotion) return;

    const target = ROLES[roleIndex];
    let delay: number;
    let step: () => void;

    if (!deleting) {
      if (count < target.length) {
        delay = TYPE_MS;
        step = () => setCount((c) => c + 1);
      } else {
        delay = HOLD_MS;
        step = () => setDeleting(true);
      }
    } else if (count > 0) {
      delay = DELETE_MS;
      step = () => setCount((c) => c - 1);
    } else {
      delay = GAP_MS;
      step = () => {
        setDeleting(false);
        setRoleIndex((i) => (i + 1) % ROLES.length);
      };
    }

    const id = window.setTimeout(step, delay);
    return () => window.clearTimeout(id);
  }, [active, reducedMotion, roleIndex, count, deleting]);

  const text = reducedMotion ? ROLES[0] : ROLES[roleIndex].slice(0, count);

  return (
    <span className="inline-flex items-center">
      <span className="text-hero-gradient font-semibold">{text}</span>
      <span className="anim-caret ml-1.5 inline-block h-[1.05em] w-[2px] translate-y-[0.1em] rounded-full bg-accent-2" />
    </span>
  );
}

export function Hero() {
  const ready = useReady();
  const [time, setTime] = useState<string | null>(null);

  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 700], [0, -70]);
  const contentOpacity = useTransform(scrollY, [0, 620], [1, 0.15]);

  /* live local clock (client-only to avoid hydration mismatch) */
  useEffect(() => {
    function tick() {
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Kolkata",
        }).format(new Date()),
      );
    }
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-28 pb-24 sm:pt-32 lg:pb-28"
    >
      {/* animated backdrop: starfield, grid, aura, abstract shape */}
      <HeroStage />

      {/* vertical side rail */}
      <div className="pointer-events-none absolute top-1/2 left-3 hidden -translate-y-1/2 xl:block">
        <span className="font-mono text-[0.6rem] tracking-[0.5em] whitespace-nowrap text-ink-dim uppercase [writing-mode:vertical-rl]">
          freelance · full-stack · mmxxvi
        </span>
      </div>
      <div className="pointer-events-none absolute top-1/2 right-3 hidden -translate-y-1/2 rotate-180 xl:block">
        <span className="font-mono text-[0.6rem] tracking-[0.5em] whitespace-nowrap text-ink-dim uppercase [writing-mode:vertical-rl]">
          greater noida · {site.timezone}
        </span>
      </div>

      {/* floating tech chips (desktop) */}
      {FLOATING_CHIPS.map((chip) => (
        <motion.span
          key={chip.label}
          initial={{ opacity: 0, y: 24 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.9, ease: EASE, delay: chip.delay }}
          className={`glass absolute z-10 hidden items-center gap-2 rounded-full px-3.5 py-2 font-mono text-[0.62rem] tracking-[0.14em] text-ink uppercase xl:flex ${chip.className}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent-2" />
          {chip.label}
        </motion.span>
      ))}

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8"
      >
        <motion.div
          variants={staggerContainer(0.1, 0.15)}
          initial="hidden"
          animate={ready ? "show" : "hidden"}
        >
          {/* status row */}
          <div className="flex flex-wrap items-center gap-3">
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2.5 rounded-full border border-accent-3/25 bg-accent-3/8 px-3.5 py-2"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent-3 anim-pulse-ring" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-3" />
              </span>
              <span className="font-mono text-[0.62rem] tracking-[0.18em] text-accent-3-soft uppercase">
                {site.availability}
              </span>
            </motion.span>

            <motion.span
              variants={fadeUp}
              className="hidden items-center gap-4 rounded-full border border-line bg-surface-3 px-4 py-2 sm:inline-flex"
            >
              <span className="inline-flex items-center gap-2 font-mono text-[0.62rem] tracking-[0.14em] text-ink-mute uppercase">
                <MapPin className="h-3.5 w-3.5 text-accent" />
                {site.location}
              </span>
              <span className="h-3 w-[1px] bg-surface" />
              <span className="inline-flex items-center gap-2 font-mono text-[0.62rem] tracking-[0.14em] text-ink-mute uppercase">
                <Clock className="h-3.5 w-3.5 text-accent-2" />
                {time ?? "--:--"} IST
              </span>
            </motion.span>
          </div>

          {/* massive headline with gradient clip */}
          <h1 className="mt-8 sm:mt-10">
            <motion.span
              variants={fadeUp}
              className="block text-[clamp(1rem,2.1vw,1.35rem)] font-medium tracking-tight text-ink-mute"
            >
              Hi, I&apos;m{" "}
              <span className="text-ink-strong">{site.name}</span> — I build for the
              web.
            </motion.span>

            <span className="mt-4 block text-[clamp(2.6rem,10.4vw,8.4rem)] leading-[0.86] font-semibold tracking-[-0.055em] sm:mt-6">
              <TextReveal
                text="FULL STACK"
                active={ready}
                accentFrom={0}
                accentClassName="text-silver-gradient"
                stagger={0.07}
                delay={0.25}
              />
              <span className="block">
                <TextReveal
                  text="DEVELOPER"
                  active={ready}
                  accentFrom={0}
                  accentClassName="text-hero-gradient"
                  stagger={0.07}
                  delay={0.45}
                />
              </span>
            </span>
          </h1>

          {/* rotating role keywords — terminal prompt + typewriter */}
          <motion.div
            variants={fadeUp}
            className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.82rem] tracking-tight sm:mt-8 sm:text-[1rem]"
          >
            <span className="inline-flex items-center gap-1.5">
              <span className="text-accent-3-soft">
                {site.firstName.toLowerCase()}@dev
              </span>
              <span className="text-ink-mute">:~$</span>
            </span>
            <RotatingRole active={ready} />
          </motion.div>

          {/* tagline */}
          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-2xl text-[1rem] leading-relaxed text-ink-mute sm:mt-9 sm:text-[1.12rem]"
          >
            {site.bio}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="mt-9 flex flex-wrap items-center gap-3 sm:mt-11 sm:gap-4"
          >
            <LiquidButton
              href="#work"
              icon={<Sparkle className="h-4 w-4 text-accent-2-soft" />}
              className="w-full sm:w-auto"
            >
              View my work
            </LiquidButton>
            <CTAButton
              href="#contact"
              variant="ghost"
              icon={<TerminalIcon className="h-4 w-4" />}
              className="w-full sm:w-auto"
            >
              Let&apos;s talk
            </CTAButton>
          </motion.div>

          {/* stats */}
          <motion.dl
            variants={fadeUp}
            className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-8 sm:mt-16 sm:grid-cols-4"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="group">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-[clamp(1.9rem,4.4vw,2.9rem)] leading-none font-semibold tracking-[-0.04em] text-ink-strong">
                  {stat.value}
                  <span className="text-accent">+</span>
                </dd>
                <p className="mt-2 font-mono text-[0.62rem] tracking-[0.18em] text-ink-mute uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.a
        href="#skills"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="group absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex"
        aria-label="Scroll to skills"
      >
        <span className="font-mono text-[0.58rem] tracking-[0.32em] text-ink-mute uppercase transition-colors group-hover:text-ink">
          scroll
        </span>
        <span className="relative h-12 w-[1px] overflow-hidden bg-surface">
          <span className="anim-scan absolute inset-x-0 top-0 h-3 bg-gradient-to-b from-transparent to-accent-2" />
        </span>
        <ArrowDown className="h-3.5 w-3.5 text-ink-mute transition-colors group-hover:text-accent-2" />
      </motion.a>
    </section>
  );
}
