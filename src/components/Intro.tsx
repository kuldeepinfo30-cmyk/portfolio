"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { EASE } from "@/lib/motion";
import { site } from "@/lib/data";

/* ------------------------------------------------------------------
   READY CONTEXT — lets Hero / Navbar wait for the intro to finish
------------------------------------------------------------------ */
const ReadyContext = createContext(true);

export function useReady() {
  return useContext(ReadyContext);
}

export function IntroProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  return (
    <ReadyContext.Provider value={ready}>
      {children}
      <Preloader onDone={() => setReady(true)} />
    </ReadyContext.Provider>
  );
}

/* ------------------------------------------------------------------
   PRELOADER — cyberpunk boot sequence that splits open
------------------------------------------------------------------ */
const BOOT_LINES = [
  "booting portfolio core",
  "mounting ui runtime",
  "establishing connection",
];

function Preloader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const doneRef = useRef(onDone);

  useEffect(() => {
    doneRef.current = onDone;
  }, [onDone]);

  /* Lock the page only while the intro is on screen — and release it
     reliably the moment the panels split open. */
  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      const id = requestAnimationFrame(() => {
        setVisible(false);
        doneRef.current();
      });
      return () => cancelAnimationFrame(id);
    }

    const start = performance.now();
    const duration = 1500;
    let frame = 0;

    const tick = (now: number) => {
      const ratio = Math.min(1, (now - start) / duration);
      setProgress(Math.round(ratio * 100));
      if (ratio < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setVisible(false);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, []);

  const lineIndex = Math.min(
    BOOT_LINES.length - 1,
    Math.floor((progress / 100) * BOOT_LINES.length),
  );

  return (
    <AnimatePresence onExitComplete={() => doneRef.current()}>
      {visible ? (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100]"
          aria-hidden
        >
          {/* split panels */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-[#030014]"
            exit={{ y: "-100%" }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.28 }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-[#030014]"
            exit={{ y: "100%" }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.36 }}
          />

          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-6"
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[0.7rem] tracking-[0.4em] text-[#22d3ee]">
                {site.firstName.toUpperCase()}
              </span>
              <span className="font-mono text-[0.7rem] tracking-[0.4em] text-white/40">
                {site.role.toUpperCase()}
              </span>
            </div>

            <div className="text-[clamp(3.5rem,12vw,7rem)] font-semibold leading-none tracking-[-0.05em] text-white">
              {progress}
              <span className="text-[0.4em] align-super text-[#8b5cf6]">%</span>
            </div>

            <div className="relative h-[2px] w-[min(340px,70vw)] overflow-hidden rounded-full bg-white/10">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#22d3ee] transition-[width] duration-150 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="font-mono text-[0.68rem] tracking-[0.24em] text-[#94a3b8] uppercase">
              {BOOT_LINES[lineIndex]}
              <span className="anim-caret ml-1 text-[#34d399]">_</span>
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
