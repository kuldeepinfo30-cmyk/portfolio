import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { IntroProvider } from "@/components/Intro";
import { Navbar } from "@/components/Navbar";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Backdrop } from "@/components/ui/Backdrop";
import { Cursor } from "@/components/ui/Cursor";
import { CursorGlow } from "@/components/ui/CursorGlow";
import { DotNav } from "@/components/ui/DotNav";
import { site } from "@/lib/data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — ${site.role} & Freelance Engineer`,
    template: `%s · ${site.name}`,
  },
  description: site.bio,
  keywords: [
    "full-stack developer",
    "freelance developer",
    "React developer",
    "Next.js developer",
    "TypeScript",
    "web app development",
    site.name,
  ],
  authors: [{ name: site.name, url: site.email }],
  creator: site.name,
  openGraph: {
    type: "website",
    title: `${site.name} — ${site.role}`,
    description: site.bio,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.bio,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#030014",
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
};

/* Runs before the body paints so a returning visitor never sees the
   default theme flash. Canvas hexes are duplicated from globals.css —
   keep the three of them in sync if you retune a palette. */
const THEME_BOOT = `(function(){try{
var KEY="portfolio-theme",CANVAS={cyber:"#030014",studio:"#f3f3f1",hacker:"#000000"};
var t=localStorage.getItem(KEY);
if(!t||!(t in CANVAS))return;
document.documentElement.dataset.theme=t;
var m=document.querySelector('meta[name="theme-color"]');
if(m)m.setAttribute("content",CANVAS[t]);
}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="cyber"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="relative min-h-full bg-canvas text-ink">
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
        <IntroProvider>
          <Backdrop />
          <CursorGlow />
          <Cursor />
          <ScrollProgress />
          <Navbar />
          <DotNav />
          <main className="relative z-10">{children}</main>
        </IntroProvider>
      </body>
    </html>
  );
}
