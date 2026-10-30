# Portfolio — Kuldeep Yadav

A personal portfolio and freelance landing site for **Kuldeep Yadav**, a full-stack developer based in Greater Noida, India.

The site introduces who I am, what I work with, the projects I have shipped, and how to get in touch. It is built to be read quickly by a potential client or recruiter: every section answers one question, and the whole thing stays fast while still moving.

Live site: https://portfolio-kuldeep-yadav-10.vercel.app/

---

## Highlights

- **Six real pages.** The landing page carries every section, and each nav item also opens a standalone page: `/about`, `/skills`, `/work`, `/experience`, `/contact`. No scroll hijacking and no reloads — navigation is client-side.
- **Three complete themes.** `cyber` (deep-space purple), `studio` (warm paper, matte black), and `hacker` (matrix green on black). A theme switcher flips a single `data-theme` attribute on `<html>`, and every colour in the app reads from CSS custom properties, so nothing is left unreadable when the palette changes.
- **Custom animated cursor.** A soft glowing dot tracks the pointer with spring physics, and the ring expands into a compact "View Project" badge over project cards. It is GPU-composited, disabled on touch devices, and respects `prefers-reduced-motion`.
- **Content lives in one file.** Names, links, projects, skills, experience, and copy all come from `src/lib/data.ts`. Editing the site means editing that file.
- **Accessibility and motion.** Reduced-motion users get an instant, animation-free experience; the cursor opts out on coarse pointers; focus states and `aria-current` are wired through the navigation.

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack, Cache Components) |
| UI | React 19, TypeScript 5 |
| Styling | Tailwind CSS v4 with `@theme` tokens |
| Animation | Framer Motion 14 |
| Fonts | Geist Sans and Geist Mono via `next/font` |
| Deployment | Vercel |

## Project structure

```
src/
├─ app/
│  ├─ layout.tsx          # Shell: backdrop, cursor, navbar, footer providers
│  ├─ page.tsx            # Landing page — every section in order
│  ├─ globals.css         # Theme tokens, utility classes, animation keyframes
│  ├─ about/page.tsx      # Standalone routes, one per nav item
│  ├─ skills/page.tsx
│  ├─ work/page.tsx
│  ├─ experience/page.tsx
│  └─ contact/page.tsx
├─ components/
│  ├─ Hero.tsx, About.tsx, Skills.tsx, Projects.tsx,
│  │  ProjectShowcase.tsx, Approach.tsx, Experience.tsx,
│  │  Contact.tsx, Footer.tsx, Navbar.tsx
│  └─ ui/                 # Cursor, Magnetic buttons, DotNav, Motion helpers, icons
└─ lib/
   ├─ data.ts             # All site content — the only file you normally edit
   ├─ motion.ts           # Shared easing curves and variants
   ├─ scroll.ts           # Smooth in-page scrolling helper
   ├─ useMediaQuery.ts
   └─ useTheme.ts
```

## Getting started

Requires Node.js 20 or newer.

```bash
# install dependencies
npm install

# start the dev server on http://localhost:3000
npm run dev

# production build
npm run build

# serve the production build locally
npm run start

# lint
npm run lint
```

Always run `npm run build` before pushing. It type-checks the whole project and catches most problems that would otherwise fail on Vercel.

## Editing the content

Open `src/lib/data.ts`. Everything user-facing is exported from there:

| Export | Controls |
| --- | --- |
| `site` | Name, role, bio, email, location, availability |
| `navLinks` | Top navigation (real routes) |
| `sectionLinks` | Landing-page anchors used by the desktop dot rail |
| `socials` | GitHub, LinkedIn, email links |
| `stats` | The four numbers in the hero |
| `about` | The About section: intro, story paragraphs, facts, principles |
| `coreSkills`, `skillGroups` | Skill meters and the badge field |
| `featuredProject`, `bentoProjects` | Project cards |
| `clientProjects` | The client vault — paste one object per project and it appears |
| `experience` | Career timeline entries |
| `approach` | The "how I work" pillars |

To add a client project, append an entry to `clientProjects`:

```ts
export const clientProjects: ClientProject[] = [
  {
    title: "Retail Inventory Panel",
    type: "Internal Dashboard",
    year: "2025",
    summary: "Stock levels, purchase entries and low-stock alerts for a single-store retailer.",
    stack: ["React.js", "Node.js", "MySQL"],
    href: "https://example.com", // "" hides the open button
  },
];
```

## Rate limits and behaviour worth knowing

- The custom cursor only renders on fine pointers (`hover: hover` and `pointer: fine`) and is hidden entirely on touch screens.
- Root elements use `overflow-x: clip` so decorative glows and blurred shapes can never create a horizontal scroll on mobile.
- Scroll-triggered animations use `viewport={{ once: true }}` so sections animate in once instead of re-rendering on every pass.
- Large blurred background layers are composited on the GPU and have no `backdrop-filter`, which keeps scrolling smooth.

## Deployment

The site is deployed on Vercel, connected to this GitHub repository. Pushing to `main` triggers a production deployment automatically.

```bash
git add .
git commit -m "describe your change"
git push
```

Then check the project on [vercel.com](https://vercel.com/dashboard) — the newest deployment moves from _Building_ to _Ready_ in a minute or two. After that, hard-refresh the live site (`Ctrl + Shift + R`) so the browser does not serve a cached copy.

To deploy from scratch: import this repository on Vercel, keep the detected framework preset (Next.js), and leave the build command and output directory at their defaults.

## Contact

- **Email:** kuldeepinfo30@gmail.com
- **GitHub:** [kuldeepinfo30-cmyk](https://github.com/kuldeepinfo30-cmyk)
- **LinkedIn:** [kuldeep-yadav](https://www.linkedin.com/in/kuldeep-yadav-159146445/)
- **Location:** Greater Noida, India

Open to freelance projects and full-time roles.
