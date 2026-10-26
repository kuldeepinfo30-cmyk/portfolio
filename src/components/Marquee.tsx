/**
 * Infinite tech ticker. Pure CSS animation — no JS loop, no jank.
 */
export function Marquee({
  items,
  reverse = false,
  duration = 34,
  className = "",
}: {
  items: string[];
  reverse?: boolean;
  duration?: number;
  className?: string;
}) {
  const row = [...items, ...items];

  return (
    <div
      className={`marquee-track mask-fade-x relative flex overflow-hidden ${className}`}
    >
      <div
        className="anim-marquee flex w-max items-center"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {row.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex items-center gap-6 pr-6 sm:gap-10 sm:pr-10"
          >
            <span className="text-[0.95rem] font-medium tracking-tight whitespace-nowrap text-ink-dim transition-colors duration-300 hover:text-ink-strong sm:text-base">
              {item}
            </span>
            <span className="h-1 w-1 shrink-0 rounded-full bg-accent/70" />
          </span>
        ))}
      </div>
    </div>
  );
}
