import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Phase = "query" | "weak" | "repairing" | "healed";

const SEQUENCE: { phase: Phase; ms: number }[] = [
  { phase: "query", ms: 1700 },
  { phase: "weak", ms: 2400 },
  { phase: "repairing", ms: 2300 },
  { phase: "healed", ms: 3100 },
];

const COPY: Record<Phase, { status: string; tone: string; dot: string; note: string }> = {
  query: {
    status: "retrieving",
    tone: "text-slate",
    dot: "bg-slate",
    note: '"What handles request context teardown?"',
  },
  weak: {
    status: "retrieved / not cited",
    tone: "text-rust",
    dot: "bg-rust",
    note: "The page surfaced, but never made it into the answer.",
  },
  repairing: {
    status: "rewriting page",
    tone: "text-amber",
    dot: "bg-amber",
    note: "The failed retrieval becomes the rewrite prompt.",
  },
  healed: {
    status: "cited",
    tone: "text-green",
    dot: "bg-green",
    note: "Next query lands the right page. No human filed a bug.",
  },
};

const CONFIDENCE: Record<Phase, number> = {
  query: 0.2,
  weak: 0.2,
  repairing: 0.2,
  healed: 0.82,
};

const SUMMARY_BEFORE = "Handles context. Used by the application at runtime.";
const SUMMARY_AFTER =
  "Pushes and pops RequestContext and AppContext; runs teardown callbacks that bound the lifetime of g and request.";

export function HealingDemo() {
  const [index, setIndex] = useState(0);
  const phase = SEQUENCE[index].phase;
  const copy = COPY[phase];
  const confidence = CONFIDENCE[phase];
  const healed = phase === "healed";

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIndex((current) => (current + 1) % SEQUENCE.length);
    }, SEQUENCE[index].ms);

    return () => window.clearTimeout(timer);
  }, [index]);

  return (
    <div className="overflow-hidden rounded-3xl border border-[var(--color-line-strong)] bg-white shadow-[0_24px_70px_rgba(21,34,56,0.12)]">
      <div className="flex items-center justify-between border-b border-[var(--color-line)] bg-cream-deep/45 px-5 py-3">
        <span className="font-mono text-[11px] text-slate">src/flask/ctx.py</span>
        <div className="flex items-center gap-2">
          <motion.span
            key={phase}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            className={`font-mono text-[11px] ${copy.tone}`}
          >
            {copy.status}
          </motion.span>
          <motion.span
            animate={
              phase === "repairing"
                ? { scale: [1, 1.6, 1], opacity: [1, 0.45, 1] }
                : { scale: 1, opacity: 1 }
            }
            transition={phase === "repairing" ? { repeat: Infinity, duration: 1 } : {}}
            className={`h-1.5 w-1.5 rounded-full ${copy.dot}`}
          />
        </div>
      </div>

      <div className="border-b border-[var(--color-line)] px-5 py-5">
        <div className="mb-2 flex items-baseline justify-between">
          <span className="label text-muted">Attribution confidence</span>
          <span className={`figure text-3xl tabular-nums ${healed ? "text-green" : "text-rust"}`}>
            {confidence.toFixed(2)}
          </span>
        </div>
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-cream-deep">
          <motion.div
            className={`absolute inset-y-0 left-0 ${healed ? "bg-green" : "bg-rust"}`}
            animate={{ width: `${confidence * 100}%` }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          />
          <div className="absolute inset-y-[-4px] left-[35%] w-px bg-navy/45" />
        </div>
        <div className="mt-1.5 flex justify-between font-mono text-[10px] text-muted">
          <span>0.00</span>
          <span>repair threshold 0.35</span>
          <span>1.00</span>
        </div>
      </div>

      <div className="ruled px-5 py-5">
        <div className="label mb-2 text-muted">Wiki summary</div>
        <div className="relative min-h-[4.1rem]">
          <AnimatePresence mode="wait">
            <motion.p
              key={healed ? "after" : "before"}
              initial={{ opacity: 0, y: 7 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -7 }}
              transition={{ duration: 0.35 }}
              className={`text-[14px] leading-relaxed ${healed ? "text-navy" : "text-muted"}`}
            >
              {healed ? SUMMARY_AFTER : SUMMARY_BEFORE}
            </motion.p>
          </AnimatePresence>
          {phase === "repairing" && (
            <motion.div
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-amber/18 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 1.15, ease: "linear" }}
            />
          )}
        </div>
      </div>

      <div className="border-t border-[var(--color-line)] bg-navy px-5 py-3">
        <AnimatePresence mode="wait">
          <motion.p
            key={phase}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="font-mono text-[11px] text-cream"
          >
            {copy.note}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
