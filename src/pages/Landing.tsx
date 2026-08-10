import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Copy,
  Database,
  FileText,
  Gauge,
  Github,
  LayoutGrid,
  Lightbulb,
  Search,
  Server,
  ShieldX,
  Sparkles,
  Terminal,
  Trophy,
  WalletCards,
} from "lucide-react";
import { CountUp, Reveal, staggerChild, staggerParent } from "../components/motion";
import { HealingDemo } from "../components/HealingDemo";

const GITHUB_URL = "https://github.com/shreyash-sharma/provenant";
const WHITEPAPER_URL = "https://www.shreyashsharma.com/writing/provenant";
const PYPI_URL = "https://pypi.org/project/provenant/";
const AWARD_ANNOUNCEMENT_URL = "https://www.linkedin.com/feed/update/urn:li:activity:7490669407539572736/";

function MicrosoftLogo({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 23 23" className={className} aria-hidden="true">
      <rect x="0" y="0" width="10.5" height="10.5" fill="#F25022" />
      <rect x="12.5" y="0" width="10.5" height="10.5" fill="#7FBA00" />
      <rect x="0" y="12.5" width="10.5" height="10.5" fill="#00A4EF" />
      <rect x="12.5" y="12.5" width="10.5" height="10.5" fill="#FFB900" />
    </svg>
  );
}

function Wrap({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`mx-auto w-full max-w-[1180px] px-6 sm:px-10 ${className}`}>
      {children}
    </section>
  );
}

function SectionHead({ label }: { label: string }) {
  return (
    <Reveal className="mb-6">
      <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.12em] text-rust">
        <span className="h-px w-9 bg-rust" />
        {label}
      </span>
    </Reveal>
  );
}

function Takeaway({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) {
  return (
    <Reveal className="mt-8">
      <div className="flex items-center gap-4 rounded-2xl border border-rust/20 bg-peach px-6 py-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-rust/25 bg-white">
          <Icon className="h-4 w-4 text-rust" />
        </span>
        <p className="text-[15px] font-semibold text-navy">{children}</p>
      </div>
    </Reveal>
  );
}

function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(command).catch(() => {});
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1500);
      }}
      className="tactile group flex w-full min-w-0 items-center justify-between gap-5 rounded-xl border border-[var(--color-line-strong)] bg-white px-5 py-3.5 font-mono text-sm text-navy shadow-[0_12px_30px_rgba(21,34,56,0.08)] hover:border-rust/50 sm:w-auto"
    >
      <span className="min-w-0 truncate">
        <span className="text-rust">$</span> {command}
      </span>
      {copied ? <Check className="h-4 w-4 text-green" /> : <Copy className="h-4 w-4 text-muted" />}
    </button>
  );
}

function WikiPageMock() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white shadow-[0_18px_45px_rgba(21,34,56,0.08)]">
      <div className="flex items-center justify-between border-b border-[var(--color-line)] bg-cream-deep/45 px-4 py-2.5">
        <span className="font-mono text-[11px] text-slate">src/flask/ctx.py</span>
        <span className="font-mono text-[11px] text-green">confidence 0.82</span>
      </div>
      <div className="space-y-4 px-4 py-4">
        <div>
          <div className="label mb-1.5 text-muted">Purpose</div>
          <p className="text-[13px] leading-relaxed text-slate">
            Manages request and application context stacks: pushes, pops, and teardown callbacks
            that bound the lifetime of <span className="font-mono text-navy">g</span> and{" "}
            <span className="font-mono text-navy">request</span>.
          </p>
        </div>
        <div>
          <div className="label mb-2 text-muted">Key symbols</div>
          <div className="flex flex-wrap gap-1.5">
            {["RequestContext", "AppContext", "after_this_request"].map((symbol) => (
              <span
                key={symbol}
                className="rounded-md border border-violet/25 bg-violet-tint px-2 py-0.5 font-mono text-[11px] text-violet"
              >
                {symbol}
              </span>
            ))}
          </div>
        </div>
        <div className="border-t border-[var(--color-line)] pt-3">
          <div className="label mb-1.5 text-muted">Cited in answer</div>
          <div className="space-y-1 font-mono text-[11px] text-slate">
            <div>
              <span className="text-rust">-&gt;</span> ctx.py:41-68 / RequestContext.push
            </div>
            <div>
              <span className="text-rust">-&gt;</span> ctx.py:120-134 / teardown handling
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-[var(--color-line)] bg-navy px-4 py-2">
        <span className="font-mono text-[11px] text-cream">1,070 tokens</span>
        <span className="font-mono text-[11px] text-cream/70">not 69,000 raw tokens</span>
      </div>
    </div>
  );
}

function HeroWorkbench() {
  return (
    <div className="memory-stage relative w-full max-w-full min-w-0 overflow-hidden rounded-[1.75rem] border border-white/10 p-4 text-cream sm:p-5">
      <img
        src="/provenant-mark-white.png"
        alt=""
        className="memory-fox pointer-events-none absolute -right-10 top-7 z-0 h-56 w-56 object-contain sm:h-64 sm:w-64"
      />
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="h-2 w-2 shrink-0 rounded-full bg-rust" />
          <span className="truncate font-mono text-[11px] text-cream/70">cost trace / flask</span>
        </div>
        <span className="rounded-full bg-rust px-2.5 py-1 font-mono text-[10px] font-medium text-white">
          v0.1.6
        </span>
      </div>

      <div className="relative z-10 mt-5 grid min-w-0 gap-3 md:grid-cols-[1fr_auto_1fr] md:items-stretch">
        <div className="min-w-0 rounded-2xl border border-white/10 bg-black/18 p-4">
          <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-cream/45">raw-file pull</div>
          <div className="mt-5 figure text-5xl text-cream">69k</div>
          <div className="mt-1 font-mono text-[11px] text-cream/55">tokens per query</div>
          <div className="mt-5 rounded-xl border border-rust/25 bg-rust/10 p-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-rust">baseline cost</div>
            <div className="mt-1 figure text-3xl text-rust">$0.13</div>
          </div>
          <div className="mt-4 space-y-2 font-mono text-[10px] text-cream/58">
            <div className="h-2 rounded-full bg-white/16" />
            <div className="h-2 w-11/12 rounded-full bg-white/16" />
            <div className="h-2 w-4/5 rounded-full bg-white/16" />
          </div>
        </div>

        <div className="hidden w-14 items-center justify-center md:flex">
          <div className="relative h-full w-px bg-white/10">
            <span className="cost-packet absolute left-1/2 top-6 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-rust shadow-[0_0_18px_rgba(255,90,31,0.75)]" />
          </div>
        </div>

        <div className="relative min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-cream-soft p-4 text-navy">
          <div className="flex items-center justify-between gap-4">
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">Provenant packet</div>
            <span className="font-mono text-[11px] text-rust">cited</span>
          </div>
          <div className="mt-5 figure text-5xl text-rust">1,070</div>
          <div className="mt-1 font-mono text-[11px] text-muted">tokens per query</div>
          <div className="mt-5 grid gap-3">
            <div className="rounded-xl border border-[var(--color-line)] bg-white p-3">
              <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">query cost</div>
              <div className="mt-1 figure text-3xl text-navy">$0.002</div>
            </div>
            <div className="rounded-xl border border-rust/25 bg-rust-tint p-3">
              <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-rust">reduction</div>
              <div className="mt-1 figure text-3xl text-rust">60-65x</div>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-[var(--color-line)] bg-white p-3">
            <div className="mb-2 flex items-center justify-between gap-3 font-mono text-[10px] text-muted">
              <span>session usage</span>
              <span>ccusage sync</span>
            </div>
            <div className="space-y-2">
              {[
                ["raw baseline", "w-[92%] bg-navy"],
                ["with Provenant", "w-[18%] bg-rust"],
              ].map(([label, cls]) => (
                <div key={label}>
                  <div className="mb-1 font-mono text-[10px] text-muted">{label}</div>
                  <div className="h-2 rounded-full bg-cream-deep">
                    <div className={`h-full rounded-full ${cls}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RepoIndexAnimation() {
  const files = ["routes/auth.py", "models/user.py", "ctx.py"];
  const pages = ["wiki page", "citation map", "MCP memory"];

  return (
    <div className="repo-flow-card relative overflow-hidden rounded-3xl border border-[var(--color-line-strong)] bg-white p-5 shadow-[0_24px_70px_rgba(21,34,56,0.10)]">
      <div className="repo-scan pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-transparent via-rust/18 to-transparent" />
      <div className="relative z-20 flex items-center justify-between border-b border-[var(--color-line)] pb-3">
        <div>
          <div className="label text-muted">Index pass</div>
          <div className="mt-1 font-mono text-xs text-navy">repo to cited memory</div>
        </div>
        <div className="rounded-full border border-green/20 bg-green-tint px-3 py-1 font-mono text-[11px] text-green">
          live
        </div>
      </div>

      <div className="relative z-20 grid gap-5 py-5 sm:grid-cols-[0.9fr_0.7fr_0.9fr] sm:items-center">
        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={file}
              className={`rounded-xl border border-[var(--color-line)] bg-cream-soft px-3 py-2.5 shadow-sm ${index === 1 ? "repo-float-a" : ""}`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[11px] text-slate">{file}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-rust" />
              </div>
              <div className="mt-2 h-1.5 rounded-full bg-cream-deep">
                <div className="h-full rounded-full bg-rust/60" style={{ width: `${56 + index * 14}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="relative hidden min-h-36 sm:block">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 180 150" aria-hidden="true">
            <path className="repo-flow-line" d="M10 30 C70 30 82 75 170 75" fill="none" stroke="#df641f" strokeWidth="2" />
            <path className="repo-flow-line" d="M10 75 C65 75 92 75 170 35" fill="none" stroke="#477c59" strokeWidth="2" />
            <path className="repo-flow-line" d="M10 120 C70 120 90 80 170 115" fill="none" stroke="#6857a5" strokeWidth="2" />
          </svg>
          <div className="repo-pulse absolute left-[42%] top-[38%] flex h-14 w-14 items-center justify-center rounded-full border border-rust/25 bg-peach font-mono text-[10px] font-semibold text-rust shadow-[0_10px_28px_rgba(223,100,31,0.18)]">
            score
          </div>
        </div>

        <div className="space-y-2">
          {pages.map((page, index) => (
            <div
              key={page}
              className={`rounded-xl border px-3 py-2.5 shadow-sm ${
                index === 0
                  ? "border-green/20 bg-green-tint"
                  : index === 1
                    ? "border-violet/20 bg-violet-tint repo-float-b"
                    : "border-rust/20 bg-rust-tint"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[11px] text-navy">{page}</span>
                <span className="font-mono text-[10px] text-muted">{index === 0 ? "0.82" : index === 1 ? "cited" : "ready"}</span>
              </div>
              <div className="mt-2 grid grid-cols-4 gap-1">
                {[0, 1, 2, 3].map((bar) => (
                  <span
                    key={bar}
                    className="h-1.5 rounded-full bg-white/80"
                    style={{ opacity: 0.45 + bar * 0.14 }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-20 grid grid-cols-3 gap-2 border-t border-[var(--color-line)] pt-3 font-mono text-[10px] text-muted">
        <span>tree-sitter</span>
        <span className="text-center">FTS + vector</span>
        <span className="text-right">MCP tools</span>
      </div>
    </div>
  );
}

function AwardPhotos() {
  const shots = [
    { src: "/award-cheque.jpg", caption: "Prize presentation - Microsoft Build AI" },
    { src: "/award-stage.jpg", caption: "Presenting Provenant" },
    { src: "/award-cert.jpg", caption: "Certificate of excellence" },
  ];
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});
  const anyLoaded = Object.values(loaded).some(Boolean);

  return (
    <div className={anyLoaded ? "mt-8 grid gap-4 sm:grid-cols-3" : ""}>
      {shots.map((shot) => (
        <figure
          key={shot.src}
          className={loaded[shot.src] ? "overflow-hidden rounded-xl border border-[var(--color-line)] bg-white" : "hidden"}
        >
          <img
            src={shot.src}
            alt={shot.caption}
            loading="lazy"
            onLoad={() => setLoaded((state) => ({ ...state, [shot.src]: true }))}
            onError={() => setLoaded((state) => ({ ...state, [shot.src]: false }))}
            className="aspect-[4/3] w-full object-cover"
          />
          <figcaption className="px-3 py-2.5 font-mono text-[11px] text-muted">{shot.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}

const PROBLEMS = [
  {
    icon: FileText,
    label: "Context bloat",
    title: "Agents read too much",
    body: "Raw source retrieval dumps files. Agents burn context on boilerplate before they find the few lines that matter.",
  },
  {
    icon: Search,
    label: "Recall gap",
    title: "They miss the right files",
    body: "Developer questions are natural language. Code is syntax, call graphs, and naming accidents. Keyword search only gets partway there.",
  },
  {
    icon: ShieldX,
    label: "No feedback loop",
    title: "They do not learn from misses",
    body: "A bad retrieval looks like a good retrieval unless you score whether the answer actually cited what was retrieved.",
  },
] as const;

const TONE: Record<string, { text: string; border: string; bg: string; ring: string }> = {
  green: { text: "text-navy", border: "border-[var(--color-line)]", bg: "bg-cream-soft", ring: "border-rust/20" },
  violet: { text: "text-navy", border: "border-[var(--color-line)]", bg: "bg-cream-soft", ring: "border-rust/20" },
  rust: { text: "text-rust", border: "border-rust/20", bg: "bg-rust-tint", ring: "border-rust/25" },
};

const PIPELINE = [
  {
    n: "01",
    icon: Database,
    tone: "green",
    title: "Retrieve",
    body: "Tree-sitter parses the repository. An LLM writes a compact page per file. SQLite FTS5 and LanceDB retrieve lexically and semantically, then fuse the results.",
  },
  {
    n: "02",
    icon: Gauge,
    tone: "violet",
    title: "Score",
    body: "The answer is measured against what it cited. Attribution confidence is cited pages divided by retrieved pages, read from citations the model already emits.",
  },
  {
    n: "03",
    icon: Sparkles,
    tone: "rust",
    title: "Heal",
    body: "Below threshold, uncited pages are rewritten in the background using the retrieval failure as the prompt. The agent keeps moving while the index improves.",
  },
] as const;

const VALIDATION = [
  { metric: "Package downloads", base: "public release", ours: "2.5K+", delta: "downloads" },
  { metric: "File Coverage@10", base: "69.0%", ours: "75.2%", delta: "+6.2 pp" },
  { metric: "Mean reciprocal rank", base: "0.404", ours: "0.454", delta: "+0.050" },
  { metric: "Tokens per query", base: "~69,000", ours: "~1,070", delta: "60-65x lower" },
  { metric: "Cost per query", base: "~$0.13", ours: "~$0.002", delta: "~65x cheaper" },
  { metric: "Blind answer quality", base: "5-point rubric", ours: "-0.15", delta: "preserved" },
];

const USAGE_BREAKDOWNS = [
  "token and cost totals",
  "cache impact",
  "model mix",
  "agent and project splits",
  "session-level comparisons",
];

const INTERFACES = [
  {
    icon: Terminal,
    tone: "green",
    title: "CLI",
    note: "for a local repo",
    lines: ["pip install provenant", "provenant init .", "provenant serve"],
  },
  {
    icon: Server,
    tone: "violet",
    title: "MCP server",
    note: "for AI-native workflows",
    lines: ["provenant_context()", "provenant_why()", "provenant_risk()"],
  },
  {
    icon: LayoutGrid,
    tone: "rust",
    title: "Web UI",
    note: "for teams",
    lines: ["localhost:7337/wiki", "/knowledge", "/repair"],
  },
] as const;

const COMPETITORS = ["Provenant", "DeepWiki", "CodeScene", "Sourcegraph"];
const COMPARISON: Record<string, boolean[]> = {
  "Self-hostable and open source": [true, false, false, false],
  "MCP-native tool access": [true, false, false, true],
  "Cited, attribution-scored answers": [true, false, false, false],
  "Self-healing repair loop": [true, false, false, false],
  "Dead-code detection": [true, false, false, false],
  "Risk and blast-radius scoring": [true, false, true, false],
  "Git archaeology: why and blame": [true, false, true, false],
};

const FAQ = [
  {
    q: "What is Provenant?",
    a: "A codebase intelligence layer for AI coding agents. It indexes a repository into a cited natural-language wiki, serves that memory over MCP, and repairs weak pages automatically.",
  },
  {
    q: "Does it replace Copilot, Cursor, or Claude Code?",
    a: "No. It sits underneath them as a retrieval plane. Your existing agent calls Provenant tools instead of pulling raw files into context.",
  },
  {
    q: "Does my source code leave my machine?",
    a: "The index stays on disk in .provenant/. Only text sent to your configured LLM or embedding provider leaves the machine. You can run fully local with Ollama plus a local embedder.",
  },
  {
    q: "How is the 60-65x token reduction measured?",
    a: "Per-query context cost using wiki pages versus reading full raw files for the same SWE-bench Verified question: roughly 1,070 tokens versus 69,000. In 0.1.6, you can also import local ccusage reports and compare sessions with Provenant MCP activity against unassisted sessions.",
  },
  {
    q: "Can I see whether it saves money in my own workflow?",
    a: "Yes. Provenant 0.1.6 adds optional ccusage integration, a CLI usage report, and a web Usage tab for token, cost, cache, model, agent, project, and session breakdowns.",
  },
  {
    q: "What does self-healing actually do?",
    a: "When a retrieved page is not cited, confidence drops. Below 0.35, a background job rewrites that page against source using the failure as feedback, then cools down to avoid thrashing.",
  },
];

function SavingsSection() {
  return (
    <Wrap id="usage" className="pb-24">
      <SectionHead label="Savings you can inspect" />
      <Reveal>
        <div className="grid gap-5 lg:grid-cols-[0.88fr_1.12fr] lg:items-stretch">
          <div className="rounded-3xl border border-rust/25 bg-navy p-8 text-cream shadow-[0_28px_80px_rgba(21,34,56,0.12)]">
            <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full border border-peach/25 bg-peach/10">
              <WalletCards className="h-5 w-5 text-peach" />
            </div>
            <h2 className="display text-4xl sm:text-[3rem]">Savings should be visible, not assumed.</h2>
            <p className="mt-5 text-[15px] leading-relaxed text-cream/78">
              Provenant 0.1.6 imports local ccusage reports and compares sessions where agents used
              Provenant MCP context against sessions that relied on raw-file context.
            </p>
            <div className="mt-7 rounded-2xl border border-white/12 bg-white/8 p-4 font-mono text-xs text-cream/82">
              <div><span className="text-peach">$</span> provenant usage sync --use-npx</div>
              <div className="mt-2"><span className="text-peach">$</span> provenant usage report</div>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-[var(--color-line)] bg-white shadow-[0_24px_70px_rgba(21,34,56,0.08)]">
            <div className="flex items-center justify-between border-b border-[var(--color-line)] bg-cream-deep/45 px-6 py-4">
              <div>
                <div className="label text-muted">Usage tab</div>
                <div className="mt-1 text-lg font-semibold text-navy">Provenant-assisted savings view</div>
              </div>
              <span className="rounded-full border border-rust/20 bg-rust-tint px-3 py-1 font-mono text-[11px] text-rust">
                v0.1.6
              </span>
            </div>

            <div className="p-6">
              <div className="grid gap-3 sm:grid-cols-[0.75fr_1.25fr]">
                <div className="rounded-2xl border border-rust/20 bg-rust-tint p-5">
                  <div className="label text-rust">With Provenant MCP</div>
                  <div className="mt-3 figure text-4xl text-rust">up to 65x</div>
                  <p className="mt-2 text-[13px] leading-relaxed text-slate">
                    Compare sessions where agents called context-bearing Provenant tools.
                  </p>
                </div>

                <div className="rounded-2xl border border-[var(--color-line)] bg-cream-soft p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="label text-muted">Session comparison</span>
                    <span className="font-mono text-[10px] text-rust">imported from ccusage</span>
                  </div>
                  <div className="space-y-4">
                    {[
                      { label: "unassisted raw-file session", value: "100%", cls: "usage-bar-a bg-navy" },
                      { label: "Provenant-assisted session", value: "18%", cls: "usage-bar-b bg-rust" },
                      { label: "cache retained", value: "42%", cls: "usage-bar-c bg-slate" },
                      { label: "model spend avoided", value: "65x", cls: "usage-bar-d bg-rust" },
                    ].map((row) => (
                      <div key={row.label}>
                        <div className="mb-1.5 flex items-center justify-between font-mono text-[10px] text-muted">
                          <span>{row.label}</span>
                          <span>{row.value}</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-white">
                          <div className={`h-full rounded-full ${row.cls}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-2 sm:grid-cols-5">
                {USAGE_BREAKDOWNS.map((item) => (
                  <div key={item} className="rounded-xl border border-[var(--color-line)] bg-cream-soft px-3 py-3 text-center text-[12px] leading-snug text-slate">
                    {item}
                  </div>
                ))}
              </div>

              <p className="mt-4 font-mono text-[11px] leading-relaxed text-muted">
                Optional telemetry only. ccusage is offered during init, can run through npx, and
                stores normalized snapshots in Provenant's local database.
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </Wrap>
  );
}

export function Landing() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <div className="border-b border-rust/18 bg-peach/80">
        <Wrap className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-2.5 text-center">
          <MicrosoftLogo className="h-3.5 w-3.5" />
          <span className="text-[13px] font-semibold text-navy">
            Microsoft Build AI Hackathon winner
          </span>
          <span className="hidden text-[13px] text-slate sm:inline">out of 27,787 teams</span>
          <a
            href={AWARD_ANNOUNCEMENT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group hidden items-center gap-1 text-[13px] font-medium text-rust sm:inline-flex"
          >
            View announcement
            <ArrowUpRight className="h-3 w-3 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </Wrap>
      </div>

      <header className="sticky top-0 z-40 border-b border-[var(--color-line)] bg-cream-soft/90 backdrop-blur-md">
        <Wrap className="flex h-16 items-center justify-between">
          <div aria-hidden="true" />
          <nav className="hidden items-center gap-8 font-mono text-xs text-slate md:flex">
            <a href="#problem" className="transition hover:text-rust">problem</a>
            <a href="#how" className="transition hover:text-rust">method</a>
            <a href="#results" className="transition hover:text-rust">results</a>
            <a href="#usage" className="transition hover:text-rust">savings</a>
            <a href="/docs" className="transition hover:text-rust">docs</a>
            <a href="#award" className="transition hover:text-rust">award</a>
            <a href={WHITEPAPER_URL} target="_blank" rel="noopener noreferrer" className="transition hover:text-rust">
              paper
            </a>
          </nav>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-lg border border-[var(--color-line-strong)] bg-white px-3.5 py-1.5 font-mono text-xs text-navy transition hover:border-rust/50 sm:flex"
          >
            <Github className="h-3.5 w-3.5" />
            GitHub
          </a>
        </Wrap>
      </header>

      <Wrap className="hero-field overflow-hidden pb-16 pt-8 lg:pb-20 lg:pt-12">
        <motion.img
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          src="/provenant.png"
          alt="Provenant"
          className="hero-wordmark mx-auto mb-8 h-auto w-full max-w-[230px] object-contain sm:max-w-[300px] lg:mb-10"
        />
        <div className="hero-layout grid min-w-0 grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[0.98fr_1.02fr] lg:items-center lg:gap-16">
        <motion.div initial="hidden" animate="show" variants={staggerParent} className="hero-copy min-w-0">
          <motion.div variants={staggerChild} className="mb-5 flex flex-wrap items-center gap-3">
            <span className="h-px w-10 bg-rust" />
            <span className="label text-rust">Lower token cost for agents</span>
          </motion.div>
          <motion.h1 variants={staggerChild} className="display max-w-3xl">
            <span className="figure block text-[6.8rem] leading-[0.78] text-rust sm:text-[9rem]">
              60-65x
            </span>
            <span className="mt-3 block text-[3rem] sm:text-[4.15rem]">less context per query.</span>
          </motion.h1>
          <motion.p variants={staggerChild} className="hero-copy-text mt-6 max-w-xl text-[17px] leading-relaxed text-slate">
            Provenant indexes the repo once so agents retrieve compact cited pages instead of
            rereading raw files. The Usage tab shows token and dollar savings from your own sessions.
          </motion.p>
          <motion.div variants={staggerChild} className="hero-copy-actions mt-8 grid gap-3 sm:flex sm:max-w-xl sm:flex-wrap sm:items-center sm:gap-4">
            <CopyCommand command="pip install provenant" />
            <a
              href={WHITEPAPER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 font-mono text-xs text-slate transition hover:text-rust"
            >
              Read the manuscript
              <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </motion.div>
          <motion.div variants={staggerChild} className="hero-proof-chips mt-8 grid max-w-xl grid-cols-2 gap-3 font-mono text-[11px] text-muted sm:grid-cols-4">
            {[
              ["~1,070", "tokens"],
              ["~$0.002", "query"],
              ["ccusage", "sync"],
              ["local", "index"],
            ].map(([value, label]) => (
              <span key={`${value}-${label}`} className="rounded-lg border border-[var(--color-line)] bg-white/55 px-3 py-2 text-center">
                <span className="block text-navy">{value}</span>
                <span className="block text-[10px]">{label}</span>
              </span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="hero-visual min-w-0"
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="label text-muted">Cost trace for one query</span>
            <span className="flex items-center gap-1.5 font-mono text-[11px] text-muted">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rust" />
              tracing
            </span>
          </div>
          <HeroWorkbench />
        </motion.div>
        </div>
      </Wrap>

      <Wrap className="pb-22">
        <div className="proof-ledger overflow-hidden rounded-2xl border border-[var(--color-line)] shadow-[0_18px_55px_rgba(6,16,28,0.06)]">
          <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { value: "60-65x", label: "measured context reduction" },
            { value: "$0.002", label: "Provenant cost per query" },
            { value: "$0.13", label: "raw-file baseline cost" },
            { value: "2.5K+", label: "downloads" },
          ].map((stat, index) => {
            const card = (
              <div className="proof-ledger-cell h-full px-6 py-5">
                <div className={`figure text-4xl ${index === 0 ? "text-rust" : "text-navy"}`}>{stat.value}</div>
                <div className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{stat.label}</div>
              </div>
            );

            return (
              <Reveal key={stat.label} delay={index * 0.06} className="h-full">
                {card}
              </Reveal>
            );
          })}
          </div>
        </div>
      </Wrap>

      <SavingsSection />

      <Wrap id="problem" className="pb-24">
        <SectionHead label="Root cause" />
        <Reveal>
          <h2 className="display max-w-3xl text-4xl sm:text-[3.25rem]">
            Bigger context windows make bad retrieval more expensive.
          </h2>
        </Reveal>
        <div className="failure-ledger mt-10 overflow-hidden rounded-3xl border border-[var(--color-line-strong)] bg-white shadow-[0_22px_60px_rgba(21,34,56,0.08)]">
          {PROBLEMS.map((problem, index) => {
            return (
              <Reveal key={problem.title} delay={index * 0.05}>
                <div className={`failure-row grid gap-4 px-6 py-6 pl-16 sm:grid-cols-[0.8fr_1.2fr] sm:items-center ${index !== PROBLEMS.length - 1 ? "border-b border-[var(--color-line)]" : ""}`}>
                  <div className="flex items-center gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-rust/20 bg-rust-tint">
                      <problem.icon className="h-5 w-5 text-rust" />
                    </span>
                    <div>
                      <div className="label text-muted">{problem.label}</div>
                      <h3 className="mt-1 text-xl font-semibold text-navy">{problem.title}</h3>
                    </div>
                  </div>
                  <p className="text-[15px] leading-relaxed text-slate">{problem.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Takeaway icon={Lightbulb}>
          The unit of context should be evidence, not a file dump.
        </Takeaway>
      </Wrap>

      <Wrap className="pb-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-[var(--color-line-strong)] bg-navy p-6 text-cream shadow-[0_30px_90px_rgba(21,34,56,0.18)] sm:p-8">
            <div className="proof-ribbon pointer-events-none absolute left-0 top-0 h-full w-1/2" />
            <div className="relative grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
              <div>
                <div className="label text-peach">In one coding session</div>
                <h2 className="display mt-4 text-4xl sm:text-[3rem]">Watch raw context become a cheaper packet.</h2>
                <p className="mt-5 text-[15px] leading-relaxed text-cream/78">
                  The loop is simple: retrieve fewer pages, cite the evidence, then repair the
                  index when a retrieved page was not useful.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { title: "1. Trim", body: "69k raw tokens become about 1k cited tokens", tone: "bg-peach text-rust" },
                  { title: "2. Prove", body: "The answer carries the pages it actually used", tone: "bg-cream-soft text-navy" },
                  { title: "3. Report", body: "Usage sync shows savings by session", tone: "bg-rust-tint text-rust" },
                ].map((item, index) => (
                  <div
                    key={item.title}
                    className="repo-float-a rounded-2xl border border-white/12 bg-white p-4 text-navy"
                    style={{ animationDelay: `${index * 0.45}s` }}
                  >
                    <span className={`rounded-full px-2.5 py-1 font-mono text-[10px] ${item.tone}`}>
                      {item.title}
                    </span>
                    <p className="mt-4 text-[13px] leading-relaxed text-slate">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </Wrap>

      <Wrap id="how" className="pb-24">
        <SectionHead label="Method" />
        <Reveal>
          <h2 className="display max-w-3xl text-4xl sm:text-[3.25rem]">
            Retrieve. Score. <span className="text-rust">Heal.</span>
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {PIPELINE.map((step, index) => {
            const tone = TONE[step.tone];
            return (
              <Reveal key={step.n} delay={index * 0.08} className="h-full">
                <div className="h-full rounded-2xl border border-[var(--color-line)] bg-white p-6">
                  <div className="mb-5 flex items-center gap-3">
                    <span className={`flex h-12 w-12 items-center justify-center rounded-full border ${tone.ring} ${tone.bg}`}>
                      <step.icon className={`h-5 w-5 ${tone.text}`} />
                    </span>
                    <span className="font-mono text-xs text-muted">{step.n}</span>
                  </div>
                  <h3 className={`text-lg font-semibold ${tone.text}`}>{step.title}</h3>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-slate">{step.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="label text-muted">Repository index, forming live</span>
            <span className="flex items-center gap-1.5 font-mono text-[11px] text-muted">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green" />
              indexing
            </span>
          </div>
          <RepoIndexAnimation />
        </Reveal>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_0.85fr] lg:items-start">
          <Reveal>
            <div className="h-full rounded-2xl border border-violet/20 bg-violet-tint p-7">
              <div className="label text-muted">Citation telemetry</div>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-navy">
                The answer grades the retrieval.
              </h3>
              <div className="mt-5 rounded-xl border border-violet/20 bg-white px-4 py-3 font-mono text-[15px] text-violet">
                confidence = cited pages / retrieved pages
              </div>
              <p className="mt-4 text-[14px] leading-relaxed text-slate">
                No judge model. No second pass. If the agent used a page, it cited it. If it ignored
                a retrieved page, Provenant treats that as index feedback and repairs the weak page
                in the background.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-[var(--color-line)] bg-white p-4">
                  <div className="font-mono text-xl text-navy">$0.05</div>
                  <div className="mt-1 text-[12px] uppercase tracking-[0.16em] text-muted">Flask index</div>
                  <div className="mt-2 text-[13px] text-slate">70 source files turned into cited memory.</div>
                </div>
                <div className="rounded-xl border border-[var(--color-line)] bg-white p-4">
                  <div className="font-mono text-xl text-navy">$1.00</div>
                  <div className="mt-1 text-[12px] uppercase tracking-[0.16em] text-muted">Django index</div>
                  <div className="mt-2 text-[13px] text-slate">1,393 files, still cheaper than repeated full-context pulls.</div>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mb-3">
              <span className="label text-muted">One page, as the agent receives it</span>
            </div>
            <WikiPageMock />
          </Reveal>
        </div>

        <Reveal className="mt-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="label text-muted">Repair loop, replayed</span>
            <span className="flex items-center gap-1.5 font-mono text-[11px] text-muted">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rust" />
              looping
            </span>
          </div>
          <HealingDemo />
        </Reveal>
      </Wrap>

      <Wrap id="results" className="pb-24">
        <SectionHead label="Validation" />
        <Reveal>
          <h2 className="display max-w-3xl text-4xl sm:text-[3.25rem]">
            Measured on SWE-bench Verified, not a flattering private demo.
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate">
            500 human-validated tasks across 12 repositories. Results improve retrieval while
            reducing token load by roughly two orders of magnitude.
          </p>
        </Reveal>

        <Reveal className="mt-10">
          <div className="overflow-x-auto rounded-2xl border border-[var(--color-line)] bg-white">
            <table className="w-full min-w-[620px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[var(--color-line)] bg-cream-deep/65">
                  <th className="label px-5 py-3.5 font-medium text-muted">Metric</th>
                  <th className="label px-5 py-3.5 font-medium text-muted">Baseline</th>
                  <th className="label px-5 py-3.5 font-medium text-muted">Provenant</th>
                  <th className="label px-5 py-3.5 font-medium text-muted">Change</th>
                </tr>
              </thead>
              <tbody className="font-mono text-sm">
                {VALIDATION.map((row, index) => (
                  <tr key={row.metric} className={index !== VALIDATION.length - 1 ? "border-b border-[var(--color-line)]" : ""}>
                    <td className="px-5 py-3.5 font-sans text-navy">{row.metric}</td>
                    <td className="px-5 py-3.5 text-muted">{row.base}</td>
                    <td className="px-5 py-3.5 font-semibold text-navy">{row.ours}</td>
                    <td className="px-5 py-3.5 text-green">{row.delta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 font-mono text-[11px] leading-relaxed text-muted">
            Coverage@k = the correct issue-relevant file appears in the top k results. Per-repository
            breakdown is in the{" "}
            <a href={WHITEPAPER_URL} target="_blank" rel="noopener noreferrer" className="text-rust hover:underline">
              manuscript
            </a>
            .
          </p>
        </Reveal>

        <Takeaway icon={FileText}>
          This is a measured retrieval system first, a hackathon winner second.
        </Takeaway>
      </Wrap>

      <Wrap className="pb-24">
        <SectionHead label="Interfaces" />
        <Reveal>
          <h2 className="display max-w-3xl text-4xl sm:text-[3.25rem]">
            One engine, three ways in.
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {INTERFACES.map((item, index) => {
            const tone = TONE[item.tone];
            return (
              <Reveal key={item.title} delay={index * 0.08} className="h-full">
                <div className="h-full rounded-2xl border border-[var(--color-line)] bg-white p-6">
                  <span className={`mb-5 flex h-12 w-12 items-center justify-center rounded-full border ${tone.ring} ${tone.bg}`}>
                    <item.icon className={`h-5 w-5 ${tone.text}`} />
                  </span>
                  <h3 className="text-lg font-semibold text-navy">{item.title}</h3>
                  <div className="mt-0.5 font-mono text-[11px] uppercase tracking-wider text-muted">{item.note}</div>
                  <div className="mt-4 space-y-1.5 rounded-lg bg-cream-deep/55 px-3.5 py-3 font-mono text-xs text-slate">
                    {item.lines.map((line) => (
                      <div key={line}>
                        <span className="text-rust">-&gt;</span> {line}
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Wrap>

      <Wrap id="compare" className="pb-24">
        <SectionHead label="Positioning" />
        <Reveal>
          <h2 className="display max-w-3xl text-4xl sm:text-[3.25rem]">
            Most tools document code. Provenant changes its memory when evidence fails.
          </h2>
        </Reveal>
        <Reveal className="mt-10">
          <div className="overflow-x-auto rounded-2xl border border-[var(--color-line)] bg-white">
            <table className="w-full min-w-[680px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[var(--color-line)] bg-cream-deep/65">
                  <th className="label px-5 py-3.5 font-medium text-muted">Capability</th>
                  {COMPETITORS.map((competitor) => (
                    <th
                      key={competitor}
                      className={`label px-5 py-3.5 text-center font-medium ${competitor === "Provenant" ? "text-rust" : "text-muted"}`}
                    >
                      {competitor}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(COMPARISON).map(([capability, flags], rowIndex, entries) => (
                  <tr key={capability} className={rowIndex !== entries.length - 1 ? "border-b border-[var(--color-line)]" : ""}>
                    <td className="px-5 py-3.5 text-[14px] text-navy">{capability}</td>
                    {flags.map((has, colIndex) => (
                      <td key={`${capability}-${colIndex}`} className="px-5 py-3.5 text-center">
                        {has ? (
                          <Check className={`mx-auto h-4 w-4 ${colIndex === 0 ? "text-rust" : "text-green"}`} />
                        ) : (
                          <span className="text-muted">-</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 font-mono text-[11px] text-muted">
            Self-assessed from publicly documented capabilities as of August 2026. Verify current
            vendor features before purchase decisions.
          </p>
        </Reveal>
      </Wrap>

      <Wrap id="award" className="pb-24">
        <SectionHead label="Recognition" />
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-rust/25 bg-white shadow-[0_28px_80px_rgba(21,34,56,0.10)]">
            <div className="grid gap-0 lg:grid-cols-[0.82fr_1.18fr]">
              <div className="relative overflow-hidden bg-navy p-8 text-cream sm:p-10">
                <div className="dotgrid absolute inset-0 opacity-20" />
                <div className="relative">
                  <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[13px] font-semibold text-navy">
                    <MicrosoftLogo className="h-4 w-4" />
                    Microsoft Build AI
                  </div>
                  <div className="figure text-[7rem] leading-[0.78] text-peach">1st</div>
                  <div className="label mt-4 text-cream/70">Nationally</div>
                  <p className="mt-8 max-w-sm text-[14px] leading-relaxed text-cream/78">
                    The win should be visible because it answers a trust question: did this hold up
                    in front of people who could interrogate the system?
                  </p>
                </div>
              </div>
              <div className="p-8 sm:p-12">
                <h2 className="display text-4xl sm:text-[3rem]">Built fast. Defended harder.</h2>
                <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-slate">
                  Provenant won first place nationally at the Microsoft Build AI Hackathon from a
                  field of 27,787 teams. The point is not the logo. The point is that the retrieval,
                  scoring, and repair loop survived a technical room, not just a polished demo.
                </p>
                <a
                  href={AWARD_ANNOUNCEMENT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl border border-rust/25 bg-peach px-4 py-2.5 font-mono text-xs font-medium text-rust transition hover:-translate-y-0.5 hover:border-rust/45 hover:bg-rust-tint"
                >
                  View LinkedIn announcement
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
                <dl className="mt-8 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-xl border border-[var(--color-line)] bg-cream-soft p-5">
                    <dt className="label mb-2 text-muted">Teams</dt>
                    <dd className="figure text-2xl text-navy">
                      <CountUp to={27787} />
                    </dd>
                  </div>
                  <div className="rounded-xl border border-[var(--color-line)] bg-cream-soft p-5">
                    <dt className="label mb-2 text-muted">Placed</dt>
                    <dd className="figure text-2xl text-rust">1st</dd>
                  </div>
                  <div className="rounded-xl border border-[var(--color-line)] bg-cream-soft p-5">
                    <dt className="label mb-2 text-muted">Judged on</dt>
                    <dd className="text-[13px] leading-snug text-slate">Technical depth and AI integration</dd>
                  </div>
                </dl>
                <AwardPhotos />
              </div>
            </div>
          </div>
        </Reveal>
      </Wrap>

      <Wrap className="pb-24">
        <SectionHead label="Questions" />
        <div className="overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white">
          {FAQ.map((item, index) => {
            const open = openFaq === index;
            return (
              <div key={item.q} className={index !== FAQ.length - 1 ? "border-b border-[var(--color-line)]" : ""}>
                <button
                  type="button"
                  onClick={() => setOpenFaq(open ? null : index)}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                >
                  <span className="text-[15px] font-semibold text-navy">{item.q}</span>
                  <span className="font-mono text-lg text-rust">{open ? "-" : "+"}</span>
                </button>
                {open && <p className="max-w-3xl px-6 pb-6 text-[14px] leading-relaxed text-slate">{item.a}</p>}
              </div>
            );
          })}
        </div>
      </Wrap>

      <Wrap className="pb-24">
        <Reveal>
          <div className="rounded-3xl border border-[var(--color-line)] bg-white px-8 py-14 text-center shadow-[0_24px_70px_rgba(21,34,56,0.08)] sm:px-14">
            <img src="/provenant-wordmark.png" alt="Provenant" className="mx-auto mb-7 h-9 w-auto" />
            <h2 className="display mx-auto max-w-xl text-4xl sm:text-[3rem]">
              Give your agent memory that can be audited.
            </h2>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <CopyCommand command="pip install provenant" />
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-[var(--color-line-strong)] px-5 py-3.5 font-mono text-sm text-navy transition hover:border-rust/50"
              >
                <Github className="h-4 w-4" />
                Star on GitHub
              </a>
            </div>
            <div className="mt-8 flex items-center justify-center gap-2 text-[13px] text-muted">
              <Trophy className="h-3.5 w-3.5 text-rust" />
              Winner, Microsoft Build AI Hackathon
            </div>
          </div>
        </Reveal>
      </Wrap>

      <footer className="border-t border-[var(--color-line)] py-8">
        <Wrap className="flex flex-col items-center justify-between gap-3 font-mono text-[11px] text-muted sm:flex-row">
          <span>Copyright {new Date().getFullYear()} Provenant / MIT</span>
          <div className="flex items-center gap-6">
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="hover:text-rust">GitHub</a>
            <a href={PYPI_URL} target="_blank" rel="noopener noreferrer" className="hover:text-rust">PyPI</a>
            <a href={WHITEPAPER_URL} target="_blank" rel="noopener noreferrer" className="hover:text-rust">Whitepaper</a>
          </div>
        </Wrap>
      </footer>
    </div>
  );
}
