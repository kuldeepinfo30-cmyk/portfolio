"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  archEdges,
  archLayers,
  archNodes,
  type ArchNode,
  type ArchNodeId,
} from "@/lib/data";
import { EASE } from "@/lib/motion";

/** column centres, as a % of the stage width — 3 evenly spaced layers */
const LAYER_X = [16.5, 50, 83.5];
/** row centres, as a % of the stage height — 3 slots inside every layer */
const ROW_Y = [18, 50, 82];
/** rendered node width in px — keep in sync with `w-24` on the tile */
const NODE_W = 96;
/** how far a flow travels before it fades out, in seconds */
const HOP_DELAY = 0.26;

/** "#61DAFB" + 0.16 → "rgba(97, 218, 251, 0.16)" */
function withAlpha(hex: string, alpha: number) {
  const value = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(value.slice(i, i + 2), 16));
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/** the four possible endpoints of an edge, in stage pixels */
function anchors(from: ArchNode, to: ArchNode, w: number, h: number) {
  const a = { x: (LAYER_X[from.layer] / 100) * w, y: (ROW_Y[from.row] / 100) * h };
  const b = { x: (LAYER_X[to.layer] / 100) * w, y: (ROW_Y[to.row] / 100) * h };
  return { a, b };
}

/**
 * A horizontal bezier that leaves the right edge of the source tile and
 * lands on the left edge of the target tile.
 */
function edgePath(from: ArchNode, to: ArchNode, w: number, h: number) {
  const { a, b } = anchors(from, to, w, h);
  const dir = b.x >= a.x ? 1 : -1;
  // never eat more than half the gap, so the line can't fold back on itself
  const inset = Math.max(0, Math.min(NODE_W / 2, Math.abs(b.x - a.x) / 2 - 4));
  const x1 = a.x + dir * inset;
  const x2 = b.x - dir * inset;
  const mx = (x1 + x2) / 2;

  return `M ${x1} ${a.y} C ${mx} ${a.y} ${mx} ${b.y} ${x2} ${b.y}`;
}

/**
 * Breadth-first walk over the graph, two hops out from the hovered node.
 * Each node and edge carries the hop it was reached on, which is what
 * makes the glow travel client → server → data instead of blinking at once.
 */
function trace(origin: ArchNodeId | null) {
  const nodes = new Map<ArchNodeId, number>();
  const edges = new Map<string, number>();

  if (!origin) return { nodes, edges };

  nodes.set(origin, 0);
  let frontier: ArchNodeId[] = [origin];

  for (let hop = 1; hop <= 2; hop += 1) {
    const next: ArchNodeId[] = [];

    frontier.forEach((current) => {
      archEdges.forEach((edge) => {
        const other = edge.from === current ? edge.to : edge.to === current ? edge.from : null;
        if (!other) return;

        const key = `${edge.from}-${edge.to}`;
        if (edges.has(key)) return;

        edges.set(key, hop);
        if (!nodes.has(other)) {
          nodes.set(other, hop);
          next.push(other);
        }
      });
    });

    frontier = next;
  }

  return { nodes, edges };
}

function ArchTile({
  node,
  hop,
  dimmed,
  onEnter,
  onLeave,
  onToggle,
  pinned,
}: {
  node: ArchNode;
  /** undefined = not part of the trace, 0 = the hovered node itself */
  hop: number | undefined;
  dimmed: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onToggle: () => void;
  pinned: boolean;
}) {
  const hot = hop !== undefined;

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${LAYER_X[node.layer]}%`, top: `${ROW_Y[node.row]}%` }}
    >
      <motion.button
        type="button"
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onFocus={onEnter}
        onBlur={onLeave}
        onClick={onToggle}
        aria-pressed={pinned}
        aria-label={`${node.label} — trace the data flow`}
        animate={{ scale: hot ? 1.06 : 1, opacity: dimmed ? 0.4 : 1 }}
        transition={{ duration: 0.32, ease: EASE }}
        style={
          hot
            ? {
                borderColor: withAlpha(node.brand, 0.55),
                background: `linear-gradient(150deg, ${withAlpha(node.brand, 0.2)}, rgba(255,255,255,0.02))`,
                boxShadow: `0 0 0 1px ${withAlpha(node.brand, 0.22)}, 0 18px 50px -26px ${node.brand}, 0 0 34px -14px ${node.brand}`,
              }
            : undefined
        }
        className="arch-node flex w-24 flex-col items-center gap-1.5 rounded-2xl px-2 py-2.5"
      >
        <span
          className="arch-node__mono flex h-7 w-7 items-center justify-center rounded-lg border font-mono text-[0.62rem] font-semibold"
          style={
            hot
              ? {
                  borderColor: withAlpha(node.brand, 0.5),
                  color: node.brand,
                  backgroundColor: withAlpha(node.brand, 0.14),
                }
              : undefined
          }
        >
          {node.short}
        </span>
        <span className="text-center text-[0.64rem] leading-tight font-medium tracking-tight text-ink-strong">
          {node.label}
        </span>
      </motion.button>
    </div>
  );
}

/* ------------------------------------------------------------------
   ARCHITECTURE PLAYGROUND
   Hover (or tap) a node and the request path lights up hop by hop:
   React → Node.js → PostgreSQL, and so on.
------------------------------------------------------------------ */
export function ArchitectureGraph() {
  const reduceMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });
  const [hovered, setHovered] = useState<ArchNodeId | null>(null);
  const [pinned, setPinned] = useState<ArchNodeId | null>(null);

  /* the canvas is measured so the connectors can be drawn in real pixels
     (a percentage viewBox would distort the curves and the stroke ends) */
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setBox({ w: width, h: height });
    });

    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  const origin = hovered ?? pinned;
  const { nodes: hopByNode, edges: hopByEdge } = useMemo(() => trace(origin), [origin]);
  const byId = useMemo(
    () => new Map(archNodes.map((node) => [node.id, node])),
    [],
  );

  /* the caption: every traced node grouped by layer */
  const chain = archLayers
    .map((_, layer) => archNodes.filter((node) => node.layer === layer && hopByNode.has(node.id)))
    .filter((group) => group.length > 0);

  return (
    <div className="glass ring-glow rounded-3xl p-5 sm:p-7">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="mono-label">architecture playground</span>
          <h3 className="mt-2.5 text-[1.1rem] font-semibold tracking-tight text-ink-strong sm:text-[1.35rem]">
            Trace how a request travels through my stack.
          </h3>
        </div>
        <p className="font-mono text-[0.58rem] tracking-[0.2em] text-ink-dim uppercase">
          client → server → data
        </p>
      </header>

      <div
        ref={stageRef}
        className="relative mt-8 h-[28rem] w-full sm:h-[24rem] lg:h-[26rem]"
      >
        {/* faint blueprint grid */}
        <div
          aria-hidden
          className="grid-lines mask-fade-y pointer-events-none absolute inset-0 opacity-40"
        />

        {/* layer captions */}
        {archLayers.map((label, index) => (
          <span
            key={label}
            className="absolute top-0 -translate-x-1/2 font-mono text-[0.55rem] tracking-[0.26em] text-ink-dim uppercase"
            style={{ left: `${LAYER_X[index]}%` }}
          >
            0{index + 1} · {label}
          </span>
        ))}

        {/* connectors */}
        {box.w > 0 ? (
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox={`0 0 ${box.w} ${box.h}`}
            fill="none"
          >
            {archEdges.map((edge) => {
              const from = byId.get(edge.from);
              const to = byId.get(edge.to);
              if (!from || !to) return null;

              const key = `${edge.from}-${edge.to}`;
              const hop = hopByEdge.get(key);
              const hot = hop !== undefined;
              const color = from.brand;
              const delay = hot ? (hop - 1) * HOP_DELAY : 0;
              const d = edgePath(from, to, box.w, box.h);

              return (
                <g key={key}>
                  <path
                    d={d}
                    style={{ stroke: "var(--line-strong)" }}
                    strokeWidth={1}
                    vectorEffect="non-scaling-stroke"
                  />

                  {/* travelling packets — the ambient pulse when idle */}
                  <motion.path
                    d={d}
                    className="arch-flow"
                    stroke={color}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeDasharray="1 11"
                    vectorEffect="non-scaling-stroke"
                    animate={{ opacity: origin ? (hot ? 0.85 : 0.05) : 0.22 }}
                    transition={{ duration: 0.35, ease: EASE }}
                  />

                  {/* the drawn line that travels one hop at a time */}
                  <motion.path
                    d={d}
                    stroke={color}
                    strokeWidth={2.4}
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    initial={false}
                    animate={{ pathLength: hot ? 1 : 0, opacity: hot ? 0.95 : 0 }}
                    transition={{
                      pathLength: {
                        duration: reduceMotion ? 0 : 0.55,
                        ease: EASE,
                        delay,
                      },
                      opacity: { duration: 0.22, delay },
                    }}
                    style={hot ? { filter: `drop-shadow(0 0 5px ${withAlpha(color, 0.9)})` } : undefined}
                  />
                </g>
              );
            })}
          </svg>
        ) : null}

        {/* nodes */}
        {archNodes.map((node) => (
          <ArchTile
            key={node.id}
            node={node}
            hop={hopByNode.get(node.id)}
            dimmed={Boolean(origin) && !hopByNode.has(node.id)}
            pinned={pinned === node.id}
            onEnter={() => setHovered(node.id)}
            onLeave={() => setHovered(null)}
            onToggle={() => setPinned((current) => (current === node.id ? null : node.id))}
          />
        ))}
      </div>

      {/* live caption of the traced path */}
      <div className="mt-6 flex min-h-[1.5rem] flex-wrap items-center gap-x-2 gap-y-1.5 border-t border-line pt-5">
        <span className="font-mono text-[0.55rem] tracking-[0.24em] text-ink-dim uppercase">
          {origin ? "traced path" : "flow"}
        </span>

        {chain.length ? (
          <span className="flex flex-wrap items-center gap-x-2 gap-y-1.5 font-mono text-[0.66rem]">
            {chain.map((group, index) => (
              <span key={index} className="flex items-center gap-2">
                {index > 0 ? <span className="text-accent">→</span> : null}
                <span className="text-ink-soft">
                  {group.map((node) => node.label).join(" + ")}
                </span>
              </span>
            ))}
          </span>
        ) : (
          <span className="font-mono text-[0.66rem] text-ink-dim">
            hover{" "}
            <span className="text-accent-soft">React</span> to watch the request flow
            all the way to the database
          </span>
        )}
      </div>
    </div>
  );
}
