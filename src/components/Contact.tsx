"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import {
  Check,
  Copy,
  Github,
  Linkedin,
  Mail,
  Sparkle,
  TerminalIcon,
} from "@/components/ui/Icons";
import { CTAButton, IconButton } from "@/components/ui/Magnetic";
import { Reveal, SectionHeading } from "@/components/ui/Motion";
import {
  clientProjects,
  coreSkills,
  experience,
  freelanceStats,
  projects,
  site,
  socials,
  terminalBoot,
} from "@/lib/data";
import { EASE } from "@/lib/motion";

type LineKind = "in" | "out" | "sys" | "ok" | "warn";
type Line = { id: number; kind: LineKind; text: string };

const SOCIAL_ICONS = [Github, Linkedin, Mail];

const HELP_LINES = [
  "help        · list every command",
  "whoami      · three lines about me",
  "skills      · my day-to-day stack",
  "projects    · recently shipped work",
  "vault       · every client project",
  "experience  · career timeline",
  "email       · reach my inbox",
  "socials     · everywhere else I live",
  "clear       · wipe this screen",
];

/** Turns a typed command into printed output. */
function run(raw: string): string[] {
  const cmd = raw.trim().toLowerCase();

  switch (cmd) {
    case "":
      return [];
    case "help":
      return [...HELP_LINES, "", 'tip: press ↑ / ↓ to walk your history'];
    case "whoami":
      return [
        site.name + " — " + site.role,
        site.bio,
        "based in " + site.location + " · " + site.timezone,
      ];
    case "skills":
      return coreSkills.map(
        (skill) => `${skill.name.padEnd(16, " ")} ${skill.level}%  ${skill.stack}`,
      );
    case "projects":
      return projects.map(
        (project) =>
          `• ${project.title} — ${project.metric}  [${project.tags.join(", ")}]`,
      );
    case "vault":
      return clientProjects.length
        ? clientProjects.map(
            (project) =>
              `• ${project.title} (${project.year})  ${project.href || "private"}`,
          )
        : [
            `0 of ${freelanceStats.total} links public so far.`,
            "client builds are still clearing — open #vault to see the panel,",
            `or mail ${site.email} for a walkthrough.`,
          ];
    case "experience":
      return experience.map(
        (item) => `• ${item.period.padEnd(12, " ")} ${item.role} — ${item.org}`,
      );
    case "email":
      return [`mailto: ${site.email}`, "use the copy button on the right →"];
    case "socials":
      return socials.map((social) => `${social.label.padEnd(12, " ")} ${social.href}`);
    case "resume":
    case "cv":
      return ["resume: available on request — drop me a line and I'll send the PDF."];
    case "hire":
      return [
        "great choice. here's the flow:",
        "1 · you send the brief       2 · I reply within 24h",
        "3 · scoped proposal + timeline   4 · weekly demos until launch",
      ];
    case "sudo":
      return ["nice try — you don't have root access here. 😄"];
    case "ls":
      return ["about/  projects/  skills/  contact.md"];
    default:
      return [`command not found: ${cmd}`, 'type "help" to see what I understand.'];
  }
}

export function Contact() {
  const idRef = useRef(terminalBoot.length + 1);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [lines, setLines] = useState<Line[]>(() =>
    terminalBoot.map((text, index) => ({ id: index, kind: "sys" as LineKind, text })),
  );
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const [copied, setCopied] = useState(false);

  function nextId() {
    idRef.current += 1;
    return idRef.current;
  }

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  function submit(command: string) {
    const entry = command.trim();

    if (entry.toLowerCase() === "clear") {
      setLines([]);
      setValue("");
      return;
    }

    const output = run(entry);
    setLines((prev) => [
      ...prev,
      { id: nextId(), kind: "in", text: entry || "…" },
      ...output.map((text) => ({ id: nextId(), kind: "out" as LineKind, text })),
    ]);

    if (entry) setHistory((prev) => [...prev, entry]);
    setCursor(-1);
    setValue("");
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!history.length) return;
      const next = cursor < 0 ? history.length - 1 : Math.max(0, cursor - 1);
      setCursor(next);
      setValue(history[next]);
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (cursor < 0) return;
      const next = cursor + 1;
      if (next >= history.length) {
        setCursor(-1);
        setValue("");
        return;
      }
      setCursor(next);
      setValue(history[next]);
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — the address is visible anyway */
    }
  }

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          label="contact"
          title="Got a project? Let's talk shop."
          accentFrom={3}
          description="Type in the terminal, or just send an email. I reply to every serious enquiry within 24 hours."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:mt-16 lg:grid-cols-12">
          {/* ---------------- terminal ---------------- */}
          <Reveal className="lg:col-span-7" y={30}>
            <div
              className="terminal-shell relative overflow-hidden rounded-3xl shadow-[0_40px_120px_-60px_rgba(var(--glow),0.9)]"
              onClick={() => inputRef.current?.focus()}
            >
              {/* chrome */}
              <div className="flex items-center gap-3 border-b border-white/8 px-4 py-3.5">
                <span className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
                </span>
                <span className="mx-auto inline-flex items-center gap-2 font-mono text-[0.62rem] tracking-[0.16em] text-[#94a3b8] uppercase">
                  <TerminalIcon className="h-3.5 w-3.5 text-[#22d3ee]" />
                  {site.firstName.toLowerCase()}@portfolio: ~/contact
                </span>
                <span className="font-mono text-[0.58rem] tracking-[0.18em] text-white/25 uppercase">
                  zsh
                </span>
              </div>

              {/* output */}
              <div
                ref={bodyRef}
                className="no-scrollbar h-[22rem] overflow-y-auto px-4 py-4 font-mono text-[0.76rem] leading-relaxed sm:h-[24rem] sm:px-5 sm:text-[0.8rem]"
              >
                {lines.map((line) => (
                  <motion.p
                    key={line.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.28, ease: EASE }}
                    className={LINE_STYLES[line.kind]}
                  >
                    {line.kind === "in" ? (
                      <span className="text-[#8b5cf6]">❯ </span>
                    ) : null}
                    {line.text}
                  </motion.p>
                ))}
              </div>

              {/* prompt */}
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  submit(value);
                }}
                className="flex items-center gap-2 border-t border-white/8 bg-black/25 px-4 py-3.5 sm:px-5"
              >
                <span className="font-mono text-[0.8rem] text-[#34d399]">❯</span>
                <input
                  ref={inputRef}
                  value={value}
                  onChange={(event) => setValue(event.target.value)}
                  onKeyDown={handleKeyDown}
                  spellCheck={false}
                  autoComplete="off"
                  autoCapitalize="none"
                  aria-label="Terminal input — type help"
                  placeholder="type a command, e.g. help"
                  className="min-w-0 flex-1 bg-transparent font-mono text-[0.8rem] text-white caret-[#34d399] outline-none placeholder:text-white/25"
                />
                <button
                  type="submit"
                  className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[0.6rem] tracking-[0.14em] text-[#94a3b8] uppercase transition-colors hover:border-[#8b5cf6]/50 hover:text-white"
                >
                  run
                </button>
              </form>

              {/* quick commands */}
              <div className="flex flex-wrap gap-2 border-t border-white/8 px-4 py-3.5 sm:px-5">
                {["help", "whoami", "projects", "experience", "email", "hire"].map(
                  (command) => (
                    <button
                      key={command}
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        submit(command);
                      }}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[0.6rem] tracking-[0.1em] text-[#94a3b8] transition-colors hover:border-[#22d3ee]/50 hover:bg-[#22d3ee]/10 hover:text-[#67e8f9]"
                    >
                      {command}
                    </button>
                  ),
                )}
              </div>
            </div>
          </Reveal>

          {/* ---------------- side panel ---------------- */}
          <Reveal className="lg:col-span-5" delay={0.12} y={30}>
            <div className="glass flex h-full flex-col gap-6 rounded-3xl p-6 sm:p-8">
              <div>
                <span className="mono-label">direct line</span>
                <h3 className="mt-4 text-[1.35rem] leading-snug font-semibold tracking-tight text-ink-strong">
                  Prefer email? Even simpler.
                </h3>
              </div>

              <div className="flex items-center gap-2 rounded-2xl border border-line bg-surface-2 p-2 pl-4">
                <Mail className="h-4 w-4 shrink-0 text-accent" />
                <a
                  href={`mailto:${site.email}`}
                  className="min-w-0 flex-1 truncate font-mono text-[0.76rem] text-ink-soft transition-colors hover:text-ink-strong"
                >
                  {site.email}
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label="Copy email address"
                  className="inline-flex h-9 items-center gap-2 rounded-xl border border-line bg-surface-2 px-3 font-mono text-[0.6rem] tracking-[0.12em] text-ink-mute uppercase transition-colors hover:border-accent-3/50 hover:text-accent-3-soft"
                >
                  {copied ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                  {copied ? "copied" : "copy"}
                </button>
              </div>

              <dl className="space-y-3 border-y border-line py-6">
                <DetailRow label="Status" value={site.availability} accent />
                <DetailRow label="Timezone" value={`IST · ${site.timezone}`} />
                <DetailRow label="Reply time" value="Under 24 hours" />
                <DetailRow label="Location" value={site.location} />
              </dl>

              <div>
                <span className="mono-label">elsewhere</span>
                <div className="mt-4 flex gap-3">
                  {socials.map((social, index) => {
                    const Icon = SOCIAL_ICONS[index] ?? Github;
                    return (
                      <IconButton
                        key={social.label}
                        href={social.href}
                        label={`${social.label} — ${social.handle}`}
                      >
                        <Icon className="h-4 w-4" />
                      </IconButton>
                    );
                  })}
                </div>
              </div>

              <div className="mt-auto space-y-3 pt-2">
                <CTAButton
                  href={`mailto:${site.email}?subject=Project%20enquiry`}
                  className="w-full"
                  icon={<Sparkle className="h-4 w-4" />}
                >
                  Start a project
                </CTAButton>
                <p className="text-center font-mono text-[0.58rem] tracking-[0.16em] text-ink-dim uppercase">
                  no agencies · no middlemen · direct with me
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const LINE_STYLES: Record<LineKind, string> = {
  in: "text-[#67e8f9]",
  out: "text-[#94a3b8] whitespace-pre-wrap",
  sys: "text-white/35",
  ok: "text-[#6ee7b7]",
  warn: "text-[#fbbf24]",
};

function DetailRow({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="font-mono text-[0.6rem] tracking-[0.18em] text-ink-dim uppercase">
        {label}
      </dt>
      <dd
        className={`max-w-[62%] text-right text-[0.78rem] ${
          accent ? "text-accent-3-soft" : "text-ink-soft"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}
