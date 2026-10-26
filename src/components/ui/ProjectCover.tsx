import { accentStyles, type Accent, type CoverVariant } from "@/lib/data";

/** Deterministic heights for the analytics bar chart (percent). */
const BARS = [38, 62, 30, 84, 52, 72, 26, 60, 44, 78];
/** Faux product label widths (px) for the storefront grid. */
const PRODUCTS = [16, 24, 12, 28, 18, 22];
/** Faux card counts per kanban column. */
const COLUMNS = [3, 2, 3];

function WindowChrome({ accent }: { accent: Accent }) {
  const a = accentStyles[accent];
  return (
    <div className="flex shrink-0 items-center gap-1.5">
      <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
      <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
      <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
      <span className="ml-2 h-1.5 w-14 rounded-full bg-white/[0.07]" />
      <span className={`ml-auto h-1.5 w-8 rounded-full opacity-70 ${a.dot}`} />
    </div>
  );
}

function DashboardMock({ accent }: { accent: Accent }) {
  const a = accentStyles[accent];
  return (
    <div className="flex h-full flex-col p-3.5">
      <WindowChrome accent={accent} />
      <div className="mt-3.5 flex min-h-0 flex-1 gap-3">
        <div className="hidden w-[18%] flex-col gap-2 sm:flex">
          <span className={`h-1.5 w-full rounded-full opacity-70 ${a.dot}`} />
          <span className="h-1.5 w-4/5 rounded-full bg-white/[0.08]" />
          <span className="h-1.5 w-3/5 rounded-full bg-white/[0.08]" />
          <span className="h-1.5 w-4/5 rounded-full bg-white/[0.08]" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center gap-2">
            <span className={`h-1.5 w-16 rounded-full opacity-80 ${a.dot}`} />
            <span className="h-1.5 w-8 rounded-full bg-white/[0.08]" />
          </div>
          <div className="mt-3 flex min-h-0 flex-1 items-end gap-1">
            {BARS.map((height, index) => (
              <span
                key={index}
                style={{ height: `${height}%` }}
                className={`flex-1 rounded-t-[3px] bg-gradient-to-t opacity-70 ${a.bar}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StorefrontMock({ accent }: { accent: Accent }) {
  const a = accentStyles[accent];
  return (
    <div className="flex h-full flex-col p-3.5">
      <WindowChrome accent={accent} />
      <div className="mt-3 flex min-h-0 flex-1 flex-col gap-2.5">
        <div className="flex shrink-0 items-center gap-2">
          <span className="h-1.5 w-10 rounded-full bg-white/[0.08]" />
          <span className="h-1.5 w-6 rounded-full bg-white/[0.08]" />
          <span className={`ml-auto h-3 w-14 rounded-full opacity-70 ${a.dot}`} />
        </div>
        <div className="grid min-h-0 flex-1 grid-cols-3 grid-rows-2 gap-2">
          {PRODUCTS.map((width, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg border border-white/8 bg-white/[0.03]"
            >
              <span
                className={`absolute inset-0 bg-gradient-to-br opacity-[0.18] ${a.bar}`}
              />
              <span
                className="absolute bottom-1.5 left-1.5 h-1.5 rounded-full bg-white/25"
                style={{ width: `${width}px` }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CrmMock({ accent }: { accent: Accent }) {
  return (
    <div className="flex h-full flex-col p-3.5">
      <WindowChrome accent={accent} />
      <div className="mt-3.5 flex min-h-0 flex-1 gap-2">
        {COLUMNS.map((count, column) => (
          <div
            key={column}
            className="flex min-w-0 flex-1 flex-col gap-1.5 rounded-lg border border-white/8 bg-white/[0.02] p-1.5"
          >
            <span className="h-1 w-6 rounded-full bg-white/15" />
            {Array.from({ length: count }).map((_, index) => (
              <span key={index} className="h-3.5 rounded bg-white/[0.06]" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Generated, fully on-brand cover art for a project card — a stylised
 * app window instead of a stock photo. Distinct per project variant.
 */
export function ProjectCover({
  variant,
  accent,
}: {
  variant: CoverVariant;
  accent: Accent;
}) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <span
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-[#0c0a1d] via-[#08061a] to-[#04030e]"
      />
      <span
        aria-hidden
        className={`absolute -top-14 -left-10 h-44 w-44 rounded-full blur-3xl ${accentStyles[accent].bg}`}
      />
      <span aria-hidden className="grid-lines absolute inset-0 opacity-60" />

      <div className="relative h-full w-full">
        {variant === "dashboard" ? <DashboardMock accent={accent} /> : null}
        {variant === "storefront" ? <StorefrontMock accent={accent} /> : null}
        {variant === "crm" ? <CrmMock accent={accent} /> : null}
      </div>
    </div>
  );
}
