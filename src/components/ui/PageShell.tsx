import type { ReactNode } from "react";

/**
 * Shared wrapper for every route that isn't the landing page.
 *
 * It only exists to clear the fixed navbar — each section already brings
 * its own vertical rhythm, so adding padding here would double up on the
 * spacing the sections were just tightened to.
 */
export function PageShell({ children }: { children: ReactNode }) {
  return <div className="pt-24 sm:pt-28">{children}</div>;
}
