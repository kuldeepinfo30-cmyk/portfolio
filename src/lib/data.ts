/**
 * ------------------------------------------------------------------
 *  EDIT THIS FILE ONLY — saara content yahin se control hota hai.
 *  Naam, email, projects, skills, experience — sab yahan se badal sakte ho.
 * ------------------------------------------------------------------
 */

export const site = {
  name: "Kuldeep Yadav",
  firstName: "Kuldeep",
  role: "Full-Stack Developer",
  tagline: "I build web products that hold up under real users.",
  headline: ["FULL", "STACK", "DEVELOPER"],
  bio: "Full-stack developer from Greater Noida. I take half-formed ideas and turn them into web apps that load fast, look sharp and stay standing once real users show up — from the database schema to the last micro-interaction.",
  email: "kuldeepinfo30@gmail.com",
  location: "Greater Noida, India",
  timezone: "UTC+5:30",
  availability: "Open to freelance & full-time work",
  resumeUrl: "#",
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const socials = [
  {
    label: "GitHub",
    handle: "/kuldeepinfo30-cmyk",
    href: "https://github.com/kuldeepinfo30-cmyk",
  },
  {
    label: "LinkedIn",
    handle: "/in/kuldeep-yadav",
    href: "https://www.linkedin.com/in/kuldeep-yadav-159146445/?isSelfProfile=true",
  },
  {
    label: "Email",
    handle: "kuldeepinfo30@gmail.com",
    href: "mailto:kuldeepinfo30@gmail.com",
  },
];

export const stats = [
  { value: "12", label: "Projects delivered" },
  { value: "4", label: "Years writing code" },
  { value: "2", label: "Internships" },
  { value: "20", label: "Tools in the stack" },
];

export const marqueeItems = [
  "HTML5",
  "CSS3",
  "JavaScript",
  "TypeScript",
  "React.js",
  "Next.js",
  "Node.js",
  "Express",
  "Java",
  "MongoDB",
  "MySQL",
  "PostgreSQL",
  "Tailwind CSS",
  "REST APIs",
  "Git & GitHub",
  "Framer Motion",
];

export type Accent = "violet" | "cyan" | "emerald" | "pink";

/**
 * Accent helper classes. Every value is a theme token, so the light
 * "studio" palette gets its matte-black accents for free and nothing
 * goes unreadable when the canvas flips from dark to light.
 */
export const accentStyles: Record<
  Accent,
  {
    text: string;
    bg: string;
    border: string;
    shadow: string;
    dot: string;
    bar: string;
  }
> = {
  violet: {
    text: "text-accent",
    bg: "bg-accent/12",
    border: "border-accent/35",
    shadow: "shadow-[0_0_45px_-12px_rgba(var(--glow),0.75)]",
    dot: "bg-accent",
    bar: "from-accent to-accent-soft",
  },
  cyan: {
    text: "text-accent-2",
    bg: "bg-accent-2/12",
    border: "border-accent-2/35",
    shadow: "shadow-[0_0_45px_-12px_rgba(var(--glow-2),0.75)]",
    dot: "bg-accent-2",
    bar: "from-accent-2 to-accent-2-soft",
  },
  emerald: {
    text: "text-accent-3",
    bg: "bg-accent-3/12",
    border: "border-accent-3/35",
    shadow: "shadow-[0_0_45px_-12px_rgba(var(--glow-3),0.75)]",
    dot: "bg-accent-3",
    bar: "from-accent-3 to-accent-3-soft",
  },
  pink: {
    text: "text-accent-4",
    bg: "bg-accent-4/12",
    border: "border-accent-4/35",
    shadow: "shadow-[0_0_45px_-12px_rgba(var(--glow-4),0.75)]",
    dot: "bg-accent-4",
    bar: "from-accent-4 to-accent-4-soft",
  },
};

/* ------------------------------------------------------------------
   SKILLS — the terminal's `skills` command reads this list
------------------------------------------------------------------ */
export type CoreSkill = {
  name: string;
  short: string;
  level: number;
  years: string;
  accent: Accent;
  stack: string;
};

export const coreSkills: CoreSkill[] = [
  {
    name: "HTML & CSS",
    short: "Hc",
    level: 92,
    years: "4 yrs",
    accent: "cyan",
    stack: "Semantic markup · Flexbox · Grid",
  },
  {
    name: "JavaScript",
    short: "Js",
    level: 88,
    years: "4 yrs",
    accent: "violet",
    stack: "ES6+ · DOM · Async/await",
  },
  {
    name: "React & Next.js",
    short: "Rx",
    level: 85,
    years: "2 yrs",
    accent: "cyan",
    stack: "Hooks · App Router · State",
  },
  {
    name: "Java",
    short: "Jv",
    level: 84,
    years: "3 yrs",
    accent: "emerald",
    stack: "OOP · Collections · JDBC",
  },
  {
    name: "Node & Express",
    short: "Nd",
    level: 82,
    years: "2 yrs",
    accent: "emerald",
    stack: "REST · JWT · Middleware",
  },
  {
    name: "MongoDB & MySQL",
    short: "Db",
    level: 80,
    years: "3 yrs",
    accent: "violet",
    stack: "Schema design · Queries · Joins",
  },
];

/* ------------------------------------------------------------------
   SKILLS — grouped badge field
   Every tool carries its official brand hex (drives the hover glow)
   and an expertise score (drives the tooltip). Groups render as
   floating badges — add or remove tools freely, the layout adapts.
------------------------------------------------------------------ */
export type SkillTool = {
  name: string;
  /** two-letter monogram shown on the badge tile */
  short: string;
  /** official brand colour */
  brand: string;
  /** 0–100 expertise score */
  level: number;
};

export type SkillGroup = {
  title: string;
  tagline: string;
  accent: Accent;
  items: SkillTool[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    tagline: "interfaces people actually finish",
    accent: "cyan" as Accent,
    items: [
      { name: "HTML5", short: "H5", brand: "#E34F26", level: 93 },
      { name: "CSS3", short: "Cs", brand: "#1572B6", level: 91 },
      { name: "JavaScript", short: "Js", brand: "#F7DF1E", level: 88 },
      { name: "React.js", short: "Rx", brand: "#61DAFB", level: 86 },
      { name: "Next.js", short: "Nx", brand: "#FFFFFF", level: 82 },
      { name: "Tailwind CSS", short: "Tw", brand: "#38BDF8", level: 87 },
      { name: "Framer Motion", short: "Fm", brand: "#E10098", level: 78 },
    ],
  },
  {
    title: "Backend",
    tagline: "apis that fail loudly, never silently",
    accent: "violet" as Accent,
    items: [
      { name: "Node.js", short: "Nd", brand: "#5FA04E", level: 82 },
      { name: "Express", short: "Ex", brand: "#FFFFFF", level: 80 },
      { name: "Java", short: "Jv", brand: "#F89820", level: 84 },
      { name: "REST APIs", short: "Api", brand: "#0EA5E9", level: 85 },
      { name: "JWT Auth", short: "Jwt", brand: "#D63AFF", level: 78 },
      { name: "Postman", short: "Pm", brand: "#FF6C37", level: 84 },
    ],
  },
  {
    title: "Databases",
    tagline: "schema first, surprises never",
    accent: "emerald" as Accent,
    items: [
      { name: "MySQL", short: "My", brand: "#4479A1", level: 84 },
      { name: "MongoDB", short: "Mg", brand: "#47A248", level: 80 },
      { name: "PostgreSQL", short: "Pg", brand: "#4169E1", level: 76 },
    ],
  },
  {
    title: "Tools & Practice",
    tagline: "ship it, then go find the bug",
    accent: "pink" as Accent,
    items: [
      { name: "Git", short: "Gt", brand: "#F05032", level: 86 },
      { name: "GitHub", short: "Gh", brand: "#FFFFFF", level: 86 },
      { name: "VS Code", short: "Vs", brand: "#007ACC", level: 90 },
      { name: "Chrome DevTools", short: "Cd", brand: "#4285F4", level: 84 },
      { name: "Debugging & Testing", short: "Dbg", brand: "#A78BFA", level: 85 },
      { name: "Data Annotation", short: "Da", brand: "#22D3EE", level: 80 },
    ],
  },
];

/* ------------------------------------------------------------------
   ARCHITECTURE PLAYGROUND — interactive node graph
   Three columns (client → server → data) laid out on a 3×3 grid:
     · `layer` = the column, `row` = the vertical slot inside it
     · `archEdges` define the data flow that lights up on hover
------------------------------------------------------------------ */
export type ArchNodeId =
  | "react"
  | "next"
  | "tailwind"
  | "node"
  | "express"
  | "rest"
  | "mongodb"
  | "mysql"
  | "postgres";

export type ArchNode = {
  id: ArchNodeId;
  label: string;
  /** two-letter monogram shown on the tile */
  short: string;
  /** official brand colour */
  brand: string;
  layer: 0 | 1 | 2;
  row: 0 | 1 | 2;
};

export const archLayers = ["client", "server", "data"] as const;

export const archNodes: ArchNode[] = [
  { id: "react", label: "React.js", short: "Rx", brand: "#61DAFB", layer: 0, row: 0 },
  { id: "next", label: "Next.js", short: "Nx", brand: "#FFFFFF", layer: 0, row: 1 },
  { id: "tailwind", label: "Tailwind", short: "Tw", brand: "#38BDF8", layer: 0, row: 2 },
  { id: "node", label: "Node.js", short: "Nd", brand: "#5FA04E", layer: 1, row: 0 },
  { id: "express", label: "Express", short: "Ex", brand: "#FFFFFF", layer: 1, row: 1 },
  { id: "rest", label: "REST API", short: "Api", brand: "#0EA5E9", layer: 1, row: 2 },
  { id: "mongodb", label: "MongoDB", short: "Mg", brand: "#47A248", layer: 2, row: 0 },
  { id: "mysql", label: "MySQL", short: "My", brand: "#4479A1", layer: 2, row: 1 },
  { id: "postgres", label: "PostgreSQL", short: "Pg", brand: "#4169E1", layer: 2, row: 2 },
];

export const archEdges: { from: ArchNodeId; to: ArchNodeId }[] = [
  { from: "react", to: "node" },
  { from: "react", to: "rest" },
  { from: "next", to: "node" },
  { from: "next", to: "express" },
  { from: "tailwind", to: "node" },
  { from: "node", to: "mongodb" },
  { from: "node", to: "mysql" },
  { from: "express", to: "mysql" },
  { from: "express", to: "postgres" },
  { from: "rest", to: "postgres" },
];

/* ------------------------------------------------------------------
   PROJECTS — bento grid
   Bento layout = 1 flagship card + 2 medium cards + 1 stats card.
     · featuredProject → the big card (cover + stack + details)
     · bentoProjects   → the two medium cards
   Everything here also feeds the `projects` command in the terminal.
------------------------------------------------------------------ */
export type CoverVariant = "dashboard" | "storefront" | "crm";

export type Project = {
  title: string;
  category: string;
  year: string;
  summary: string;
  metric: string;
  tags: string[];
  accent: Accent;
  /** live preview or repo link */
  href: string;
  /** which generated app mock is drawn on the card cover */
  cover: CoverVariant;
  /** optional real screenshot — paste a URL here to override the cover */
  image?: string;
  /** optional detail row — used by the flagship card */
  stats?: { label: string; value: string }[];
};

export const featuredProject: Project = {
  title: "IPO Application Platform",
  category: "Fintech Web App",
  year: "2025",
  summary:
    "A web app for browsing upcoming IPOs and working through the application flow end to end — React front end, Node/Express APIs, PostgreSQL underneath. Built during my internship at Bluestock Fintech.",
  metric: "React · Node · Postgres",
  tags: ["React.js", "Node.js", "Express", "PostgreSQL"],
  accent: "cyan",
  href: "https://github.com/kuldeepinfo30-cmyk",
  cover: "dashboard",
  stats: [
    { label: "front end", value: "React" },
    { label: "api layer", value: "Node/Express" },
    { label: "database", value: "Postgres" },
  ],
};

export const bentoProjects: Project[] = [
  {
    title: "E-Library Management System",
    category: "Enterprise Tool",
    year: "2024",
    summary:
      "Structured book and member records, search, and a full issue/return workflow sitting on top of a Java + MySQL backend. Tested the records and the workflow before hand-off.",
    metric: "Java · MySQL",
    tags: ["Java", "MySQL", "JDBC"],
    accent: "violet",
    href: "https://github.com/kuldeepinfo30-cmyk",
    cover: "crm",
  },
  {
    title: "Local Client Builds",
    category: "Freelance · 12 delivered",
    year: "2024 — 2026",
    summary:
      "Admin dashboards, booking flows and inventory panels built end to end for local businesses. Links land in the client vault below as each build clears its NDA window.",
    metric: "12 projects",
    tags: ["React.js", "Node.js", "MongoDB"],
    accent: "emerald",
    href: "https://github.com/kuldeepinfo30-cmyk",
    cover: "storefront",
  },
];

/** Full list — drives the terminal's `projects` command. */
export const projects: Project[] = [featuredProject, ...bentoProjects];

/* ------------------------------------------------------------------
   CLIENT VAULT — the "show me everything" panel
   Paste each project as an object below and it appears in the vault
   instantly. `href` can be a live URL, a repo, or a demo video — an
   empty string means "not public yet" and hides the open button.
------------------------------------------------------------------ */
export type ClientProject = {
  title: string;
  type: string;
  year: string;
  summary: string;
  stack: string[];
  /** live URL, repo, or demo video — "" while the build is private */
  href: string;
};

export const clientProjects: ClientProject[] = [
  // {
  //   title: "Retail Inventory Panel",
  //   type: "Internal Dashboard",
  //   year: "2025",
  //   summary: "Stock levels, purchase entries and low-stock alerts for a single-store retailer.",
  //   stack: ["React.js", "Node.js", "MySQL"],
  //   href: "",
  // },
];

/* ------------------------------------------------------------------
   APPROACH — why hiring me is safe
------------------------------------------------------------------ */
export const approach = {
  headline: "Turning Complex Product Visions into High-Performance Realities.",
  intro:
    "When you hire me, you aren't just hiring a programmer — you are partnering with a technical strategist who makes sure your launch lands cleanly.",
  pillars: [
    {
      icon: "zap" as const,
      title: "Conversion-Focused UX",
      body: "Every interface I design is built to guide your users smoothly towards your core business actions — sign-ups, purchases, or workflow completion.",
    },
    {
      icon: "layers" as const,
      title: "Bank-Grade Security",
      body: "Secure JWT authentication, strict API rate-limiting and hardened database structures so your client data stays bulletproof.",
    },
    {
      icon: "clock" as const,
      title: "Agile & Transparent Delivery",
      body: "No ghosting, no endless delays. You get a live preview link on Day 1, with incremental updates every week so you always know the exact progress.",
    },
  ],
};

/* ------------------------------------------------------------------
   WORK STATS — small bento card (activity graph + numbers)
------------------------------------------------------------------ */
export const freelanceStats = {
  handle: "github.com/kuldeepinfo30-cmyk",
  heading: "build activity · this year",
  total: "12",
  /** what the big number counts */
  unit: "client projects delivered",
  /** 84 cells — 12 weeks × 7 days. 0 = quiet, 4 = busiest. */
  contributions: [
    0, 1, 2, 0, 3, 1, 0, 2, 4, 1, 0, 2, 3, 0, 1, 0, 2, 4, 3, 1, 0, 0, 2, 1, 3,
    0, 4, 2, 1, 3, 0, 2, 4, 1, 0, 2, 0, 3, 1, 2, 4, 0, 1, 2, 0, 3, 1, 0, 4, 3,
    1, 2, 0, 4, 2, 1, 0, 4, 3, 1, 0, 2, 3, 2, 1, 0, 4, 2, 3, 1, 1, 3, 2, 0, 4,
    1, 0, 2, 0, 4, 3, 1, 2, 3,
  ],
  highlights: [
    { value: "12", label: "Projects" },
    { value: "2", label: "Internships" },
    { value: "4", label: "Years" },
  ],
};

/* ------------------------------------------------------------------
   EXPERIENCE
------------------------------------------------------------------ */
export const experience = [
  {
    period: "Oct 2026 — Now",
    role: "Data Annotation & Machine Learning",
    org: "TaskUs",
    points: [
      "Labelling and reviewing training data that feeds machine-learning pipelines — accuracy over speed.",
      "Flagging label conflicts and edge cases before they ever reach the model.",
      "Working to documented QA guidelines, with weekly accuracy targets to hit.",
    ],
    accent: "emerald" as Accent,
    current: true,
  },
  {
    period: "Jul — Aug 2025",
    role: "Software Development Engineer Intern",
    org: "Bluestock Fintech",
    points: [
      "Built an IPO web application with React.js, Node.js and PostgreSQL — the application data, the API workflows, and the screens on top of them.",
      "Validated API request/response payloads in Postman and chased down error-handling gaps before they reached the UI.",
      "Worked day to day in Git/GitHub, following the team's documented development process.",
      "Investigated issues across the frontend, backend and database layers.",
    ],
    accent: "cyan" as Accent,
  },
  {
    period: "Sept 2024",
    role: "Software Development Intern",
    org: "Hindalco Industries Ltd.",
    points: [
      "Worked on an E-Library Management System — structured records, search, and a full issue/return workflow.",
      "Tested application records and workflows, and validated data for consistency across the system.",
      "Used Java and MySQL for the application and database work, reviewing data for reliable retrieval.",
      "Documented implementation details and investigated issues found during development and validation.",
    ],
    accent: "violet" as Accent,
  },
  {
    period: "2022 — 2026",
    role: "B.Tech, Computer Science",
    org: "Dronacharya Group of Institutions · AKTU",
    points: [
      "Started my B.Tech in 2022 under Dr. A.P.J. Abdul Kalam Technical University.",
      "Where the fundamentals came from — data structures, DBMS, OOP and Java.",
    ],
    accent: "pink" as Accent,
  },
];

/* ------------------------------------------------------------------
   TERMINAL
------------------------------------------------------------------ */
export const terminalBoot = [
  "initialising shell · kuldeep@portfolio ~ v1.0.0",
  "loading module: full-stack-developer",
  "connection secure — type `help` to begin",
];
