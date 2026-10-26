/**
 * Fixed page background: theme wash, aurora blobs, a faint technical grid,
 * film grain and a vignette.
 * Server component — pure CSS, no JS cost.
 *
 * Every colour here reads a theme token, so the light "studio" and the
 * "hacker" palettes repaint the whole backdrop by just swapping
 * `data-theme` on <html>.
 */
export function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* base wash */}
      <div className="absolute inset-0" style={{ backgroundImage: "var(--wash)" }} />

      {/* aurora blobs — promoted layers, animated on the GPU only */}
      <div
        className="aurora anim-float top-[-14rem] left-[-10rem] h-[34rem] w-[34rem]"
        style={{ background: "var(--aurora-1)", animationDelay: "-3s" }}
      />
      <div
        className="aurora anim-float top-[18%] right-[-14rem] h-[30rem] w-[30rem]"
        style={{ background: "var(--aurora-2)", animationDelay: "-9s" }}
      />
      <div
        className="aurora anim-float bottom-[-16rem] left-[22%] h-[32rem] w-[32rem]"
        style={{ background: "var(--aurora-3)", animationDelay: "-14s" }}
      />

      {/* technical grid */}
      <div className="grid-lines mask-fade-y absolute inset-0 opacity-[0.55]" />

      {/* horizon glow */}
      <div
        className="absolute top-0 left-1/2 h-px w-[80%] -translate-x-1/2"
        style={{
          backgroundImage:
            "linear-gradient(90deg, transparent, rgba(var(--glow), 0.6), transparent)",
        }}
      />

      {/* grain + vignette */}
      <div
        className="noise absolute inset-0 mix-blend-overlay"
        style={{ opacity: "var(--grain)" }}
      />
      <div className="absolute inset-0" style={{ backgroundImage: "var(--vignette)" }} />
    </div>
  );
}
