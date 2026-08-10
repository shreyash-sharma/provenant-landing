import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen, ChevronRight, Github, Search } from "lucide-react";
import readme from "../content/product-docs/README.md?raw";
import cliReference from "../content/product-docs/cli-reference.md?raw";
import commonWorkflows from "../content/product-docs/common-workflows.md?raw";
import configuration from "../content/product-docs/configuration.md?raw";
import dashboard from "../content/product-docs/dashboard.md?raw";
import editorAndAgentSetup from "../content/product-docs/editor-and-agent-setup.md?raw";
import evaluation from "../content/product-docs/evaluation.md?raw";
import faq from "../content/product-docs/faq.md?raw";
import generatedWiki from "../content/product-docs/generated-wiki.md?raw";
import glossary from "../content/product-docs/glossary.md?raw";
import howItWorks from "../content/product-docs/how-it-works.md?raw";
import installation from "../content/product-docs/installation.md?raw";
import mcpTools from "../content/product-docs/mcp-tools.md?raw";
import overview from "../content/product-docs/overview.md?raw";
import privacyAndSecurity from "../content/product-docs/privacy-and-security.md?raw";
import quickstart from "../content/product-docs/quickstart.md?raw";
import repositoryIndex from "../content/product-docs/repository-index.md?raw";
import retrievalModel from "../content/product-docs/retrieval-model.md?raw";
import troubleshooting from "../content/product-docs/troubleshooting.md?raw";
import updatingTheIndex from "../content/product-docs/updating-the-index.md?raw";
import usageAndSavings from "../content/product-docs/usage-and-savings.md?raw";
import workspaces from "../content/product-docs/workspaces.md?raw";

type GroupName = "Start" | "Core Concepts" | "Agent Workflows" | "Measurement" | "Operations";

type DocPage = {
  slug: string;
  title: string;
  fileName: string;
  group: GroupName;
  source: string;
};

type MarkdownBlock =
  | { type: "heading"; depth: number; id: string; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "code"; language: string; code: string }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "quote"; text: string };

const DOC_GROUPS: Array<{ title: GroupName; pages: DocPage[] }> = [
  {
    title: "Start",
    pages: [
      { slug: "docs-index", title: "Product Docs", fileName: "README.md", group: "Start", source: readme },
      { slug: "overview", title: "Overview", fileName: "overview.md", group: "Start", source: overview },
      { slug: "quickstart", title: "Quickstart", fileName: "quickstart.md", group: "Start", source: quickstart },
      { slug: "installation", title: "Installation", fileName: "installation.md", group: "Start", source: installation },
      { slug: "configuration", title: "Configuration", fileName: "configuration.md", group: "Start", source: configuration },
    ],
  },
  {
    title: "Core Concepts",
    pages: [
      { slug: "how-it-works", title: "How Provenant Works", fileName: "how-it-works.md", group: "Core Concepts", source: howItWorks },
      { slug: "repository-index", title: "Repository Index", fileName: "repository-index.md", group: "Core Concepts", source: repositoryIndex },
      { slug: "retrieval-model", title: "Retrieval Model", fileName: "retrieval-model.md", group: "Core Concepts", source: retrievalModel },
      { slug: "generated-wiki", title: "Generated Wiki", fileName: "generated-wiki.md", group: "Core Concepts", source: generatedWiki },
      { slug: "workspaces", title: "Workspaces", fileName: "workspaces.md", group: "Core Concepts", source: workspaces },
    ],
  },
  {
    title: "Agent Workflows",
    pages: [
      { slug: "mcp-tools", title: "MCP Tools", fileName: "mcp-tools.md", group: "Agent Workflows", source: mcpTools },
      {
        slug: "editor-and-agent-setup",
        title: "Editor And Agent Setup",
        fileName: "editor-and-agent-setup.md",
        group: "Agent Workflows",
        source: editorAndAgentSetup,
      },
      { slug: "common-workflows", title: "Common Workflows", fileName: "common-workflows.md", group: "Agent Workflows", source: commonWorkflows },
      { slug: "dashboard", title: "Dashboard", fileName: "dashboard.md", group: "Agent Workflows", source: dashboard },
    ],
  },
  {
    title: "Measurement",
    pages: [
      { slug: "usage-and-savings", title: "Usage And Savings", fileName: "usage-and-savings.md", group: "Measurement", source: usageAndSavings },
      { slug: "evaluation", title: "Evaluation", fileName: "evaluation.md", group: "Measurement", source: evaluation },
    ],
  },
  {
    title: "Operations",
    pages: [
      { slug: "updating-the-index", title: "Updating The Index", fileName: "updating-the-index.md", group: "Operations", source: updatingTheIndex },
      { slug: "cli-reference", title: "CLI Reference", fileName: "cli-reference.md", group: "Operations", source: cliReference },
      { slug: "troubleshooting", title: "Troubleshooting", fileName: "troubleshooting.md", group: "Operations", source: troubleshooting },
      { slug: "privacy-and-security", title: "Privacy And Security", fileName: "privacy-and-security.md", group: "Operations", source: privacyAndSecurity },
      { slug: "faq", title: "FAQ", fileName: "faq.md", group: "Operations", source: faq },
      { slug: "glossary", title: "Glossary", fileName: "glossary.md", group: "Operations", source: glossary },
    ],
  },
];

const DOCS = DOC_GROUPS.flatMap((group) => group.pages);
const DOCS_BY_SLUG = new Map(DOCS.map((page) => [page.slug, page]));
const DOCS_BY_FILE = new Map(DOCS.map((page) => [page.fileName.toLowerCase(), page]));

function slugify(value: string) {
  return (
    value
      .toLowerCase()
      .replace(/`/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "section"
  );
}

function uniqueHeadingId(text: string, seen: Map<string, number>) {
  const base = slugify(text);
  const count = seen.get(base) ?? 0;
  seen.set(base, count + 1);
  return count === 0 ? base : `${base}-${count + 1}`;
}

function isHeading(line: string) {
  return /^#{1,4}\s+/.test(line.trim());
}

function isFence(line: string) {
  return line.trim().startsWith("```");
}

function isBullet(line: string) {
  return /^\s*-\s+/.test(line);
}

function isOrdered(line: string) {
  return /^\s*\d+\.\s+/.test(line);
}

function isTableSeparator(line: string) {
  return /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(line.trim());
}

function isTableStart(lines: string[], index: number) {
  return lines[index]?.trim().startsWith("|") && isTableSeparator(lines[index + 1] ?? "");
}

function parseTableRow(line: string) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function parseMarkdown(source: string) {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const blocks: MarkdownBlock[] = [];
  const seenHeadings = new Map<string, number>();
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed) {
      index += 1;
      continue;
    }

    if (isFence(line)) {
      const language = trimmed.slice(3).trim() || "text";
      const code: string[] = [];
      index += 1;
      while (index < lines.length && !isFence(lines[index])) {
        code.push(lines[index]);
        index += 1;
      }
      index += 1;
      blocks.push({ type: "code", language, code: code.join("\n") });
      continue;
    }

    const heading = trimmed.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      const text = heading[2].trim();
      blocks.push({ type: "heading", depth: heading[1].length, id: uniqueHeadingId(text, seenHeadings), text });
      index += 1;
      continue;
    }

    if (isTableStart(lines, index)) {
      const headers = parseTableRow(line);
      const rows: string[][] = [];
      index += 2;
      while (index < lines.length && lines[index].trim().startsWith("|")) {
        rows.push(parseTableRow(lines[index]));
        index += 1;
      }
      blocks.push({ type: "table", headers, rows });
      continue;
    }

    if (isBullet(line) || isOrdered(line)) {
      const ordered = isOrdered(line);
      const items: string[] = [];
      while (index < lines.length && (ordered ? isOrdered(lines[index]) : isBullet(lines[index]))) {
        items.push(lines[index].replace(ordered ? /^\s*\d+\.\s+/ : /^\s*-\s+/, "").trim());
        index += 1;
      }
      blocks.push({ type: "list", ordered, items });
      continue;
    }

    if (trimmed.startsWith(">")) {
      const quote: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith(">")) {
        quote.push(lines[index].replace(/^\s*>\s?/, ""));
        index += 1;
      }
      blocks.push({ type: "quote", text: quote.join(" ") });
      continue;
    }

    const paragraph: string[] = [trimmed];
    index += 1;
    while (
      index < lines.length &&
      lines[index].trim() &&
      !isFence(lines[index]) &&
      !isHeading(lines[index]) &&
      !isTableStart(lines, index) &&
      !isBullet(lines[index]) &&
      !isOrdered(lines[index]) &&
      !lines[index].trim().startsWith(">")
    ) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    blocks.push({ type: "paragraph", text: paragraph.join(" ") });
  }

  return blocks;
}

function isHeadingBlock(block: MarkdownBlock): block is Extract<MarkdownBlock, { type: "heading" }> {
  return block.type === "heading";
}

function firstParagraph(source: string) {
  return (
    source
      .replace(/\r\n/g, "\n")
      .split("\n")
      .map((line) => line.trim())
      .find((line) => line && !line.startsWith("#") && !line.startsWith("- ") && !line.startsWith("|") && !line.startsWith("```")) ??
    "Provenant documentation."
  );
}

function routeForSlug(slug: string, basePath: string) {
  return slug === "docs-index" ? basePath : `${basePath}/${slug}`;
}

function resolveMarkdownHref(href: string, basePath: string) {
  if (/^(https?:|mailto:)/.test(href)) return href;

  const [path, hash] = href.split("#");
  const fileName = path.replace(/^\.\//, "").replace(/^\//, "").toLowerCase();
  const linkedPage = DOCS_BY_FILE.get(fileName);

  if (!linkedPage) return href;
  return `${routeForSlug(linkedPage.slug, basePath)}${hash ? `#${slugify(hash)}` : ""}`;
}

function InlineText({ text, basePath }: { text: string; basePath: string }) {
  const parts: React.ReactNode[] = [];
  const pattern = /(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|https?:\/\/[^\s)]+)/g;
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > cursor) {
      parts.push(text.slice(cursor, match.index));
    }

    const token = match[0];
    if (token.startsWith("`")) {
      parts.push(
        <code key={`${token}-${match.index}`} className="rounded-md border border-[var(--color-line)] bg-cream-deep/65 px-1.5 py-0.5 font-mono text-[0.86em] text-navy">
          {token.slice(1, -1)}
        </code>,
      );
    } else if (token.startsWith("**")) {
      parts.push(
        <strong key={`${token}-${match.index}`} className="font-semibold text-navy">
          {token.slice(2, -2)}
        </strong>,
      );
    } else if (token.startsWith("[")) {
      const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (link) {
        const href = resolveMarkdownHref(link[2], basePath);
        const external = /^(https?:|mailto:)/.test(href);
        parts.push(
          <a
            key={`${href}-${match.index}`}
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="font-medium text-rust underline decoration-rust/25 underline-offset-4 hover:decoration-rust"
          >
            {link[1]}
          </a>,
        );
      } else {
        parts.push(token);
      }
    } else {
      parts.push(
        <a
          key={`${token}-${match.index}`}
          href={token}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-rust underline decoration-rust/25 underline-offset-4 hover:decoration-rust"
        >
          {token}
        </a>,
      );
    }

    cursor = match.index + token.length;
  }

  if (cursor < text.length) {
    parts.push(text.slice(cursor));
  }

  return <>{parts}</>;
}

type FlowNode = {
  id: string;
  label: string;
  shape: "box" | "database";
  x: number;
  y: number;
  width: number;
  height: number;
};

type FlowEdge = {
  from: string;
  to: string;
};

type SequenceMessage = {
  from: string;
  to: string;
  label: string;
  dashed: boolean;
};

function wrapDiagramLabel(label: string, maxLineLength = 22) {
  const words = label.split(/\s+/);
  const lines: string[] = [];
  let current = "";

  words.forEach((word) => {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxLineLength && current) {
      lines.push(current);
      current = word;
      return;
    }
    current = next;
  });

  if (current) lines.push(current);
  return lines.length > 0 ? lines : [label];
}

function parseFlowNode(value: string) {
  const trimmed = value.trim();
  const databaseMatch = trimmed.match(/^([A-Za-z0-9_]+)\[\((.+)\)\]$/);
  if (databaseMatch) {
    return { id: databaseMatch[1], label: databaseMatch[2], shape: "database" as const };
  }

  const boxedMatch = trimmed.match(/^([A-Za-z0-9_]+)\[(.+)\]$/);
  if (boxedMatch) {
    return { id: boxedMatch[1], label: boxedMatch[2], shape: "box" as const };
  }

  return { id: trimmed, label: trimmed, shape: "box" as const };
}

function parseFlowchart(code: string) {
  const lines = code.split("\n").map((line) => line.trim()).filter(Boolean);
  const direction = lines[0]?.includes("TD") ? "TD" : "LR";
  const nodes = new Map<string, Omit<FlowNode, "x" | "y" | "width" | "height">>();
  const edges: FlowEdge[] = [];

  lines.slice(1).forEach((line) => {
    const parts = line.split("-->");
    if (parts.length !== 2) return;

    const from = parseFlowNode(parts[0]);
    const to = parseFlowNode(parts[1]);
    nodes.set(from.id, { ...from });
    nodes.set(to.id, { ...to });
    edges.push({ from: from.id, to: to.id });
  });

  const depths = new Map<string, number>();
  nodes.forEach((_, id) => depths.set(id, 0));

  for (let pass = 0; pass < nodes.size; pass += 1) {
    edges.forEach((edge) => {
      const fromDepth = depths.get(edge.from) ?? 0;
      const toDepth = depths.get(edge.to) ?? 0;
      if (toDepth <= fromDepth) depths.set(edge.to, fromDepth + 1);
    });
  }

  const layers = new Map<number, string[]>();
  nodes.forEach((_, id) => {
    const depth = depths.get(id) ?? 0;
    layers.set(depth, [...(layers.get(depth) ?? []), id]);
  });

  const maxLayerSize = Math.max(...Array.from(layers.values()).map((layer) => layer.length), 1);
  const maxDepth = Math.max(...Array.from(layers.keys()), 0);
  const layerGap = direction === "LR" ? 190 : 118;
  const rowGap = direction === "LR" ? 88 : 188;
  const width = direction === "LR" ? Math.max(760, maxDepth * layerGap + 260) : Math.max(760, maxLayerSize * rowGap + 160);
  const height = direction === "LR" ? Math.max(280, maxLayerSize * rowGap + 130) : Math.max(260, maxDepth * layerGap + 130);
  const laidOutNodes = new Map<string, FlowNode>();

  layers.forEach((layer, depth) => {
    const layerSpan = direction === "LR" ? height : width;
    const itemGap = direction === "LR" ? rowGap : rowGap;
    const start = (layerSpan - (layer.length - 1) * itemGap) / 2;

    layer.forEach((id, index) => {
      const node = nodes.get(id);
      if (!node) return;
      const labelLines = wrapDiagramLabel(node.label);
      const nodeWidth = direction === "LR" ? 170 : 180;
      const nodeHeight = Math.max(54, 34 + labelLines.length * 16);
      const x = direction === "LR" ? 42 + depth * layerGap : start + index * itemGap - nodeWidth / 2;
      const y = direction === "LR" ? start + index * itemGap - nodeHeight / 2 : 38 + depth * layerGap;
      laidOutNodes.set(id, { ...node, x, y, width: nodeWidth, height: nodeHeight });
    });
  });

  return { direction, nodes: laidOutNodes, edges, width, height };
}

function FlowNodeView({ node }: { node: FlowNode }) {
  const lines = wrapDiagramLabel(node.label);
  const centerX = node.x + node.width / 2;
  const centerY = node.y + node.height / 2 - (lines.length - 1) * 8;

  return (
    <g>
      {node.shape === "database" ? (
        <>
          <rect x={node.x} y={node.y} width={node.width} height={node.height} rx={node.height / 2} fill="#fffdf5" stroke="#ff5a1f" strokeWidth="1.5" />
          <ellipse cx={centerX} cy={node.y + 10} rx={node.width / 2 - 8} ry="8" fill="none" stroke="#ff5a1f" strokeWidth="1.1" opacity="0.65" />
        </>
      ) : (
        <rect x={node.x} y={node.y} width={node.width} height={node.height} rx="12" fill="#fffdf5" stroke="#ff5a1f" strokeWidth="1.5" />
      )}
      <text x={centerX} y={centerY} textAnchor="middle" dominantBaseline="middle" fill="#06101c" fontSize="12" fontWeight="650">
        {lines.map((line, index) => (
          <tspan key={line} x={centerX} dy={index === 0 ? 0 : 15}>
            {line}
          </tspan>
        ))}
      </text>
    </g>
  );
}

function FlowEdgeView({ edge, nodes, direction }: { edge: FlowEdge; nodes: Map<string, FlowNode>; direction: string }) {
  const from = nodes.get(edge.from);
  const to = nodes.get(edge.to);
  if (!from || !to) return null;

  const fromX = direction === "LR" ? from.x + from.width : from.x + from.width / 2;
  const fromY = direction === "LR" ? from.y + from.height / 2 : from.y + from.height;
  const toX = direction === "LR" ? to.x : to.x + to.width / 2;
  const toY = direction === "LR" ? to.y + to.height / 2 : to.y;
  const midX = direction === "LR" ? (fromX + toX) / 2 : fromX;
  const midY = direction === "LR" ? fromY : (fromY + toY) / 2;
  const path =
    direction === "LR"
      ? `M ${fromX} ${fromY} C ${midX} ${fromY}, ${midX} ${toY}, ${toX - 8} ${toY}`
      : `M ${fromX} ${fromY} C ${fromX} ${midY}, ${toX} ${midY}, ${toX} ${toY - 8}`;

  return <path d={path} fill="none" stroke="#39485a" strokeWidth="1.35" markerEnd="url(#diagram-arrow)" />;
}

function FlowchartDiagram({ code }: { code: string }) {
  const diagram = parseFlowchart(code);

  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white shadow-[0_18px_45px_rgba(6,16,28,0.08)]">
      <div className="border-b border-[var(--color-line)] bg-cream-deep/45 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
        Diagram
      </div>
      <div className="overflow-x-auto p-5">
        <svg viewBox={`0 0 ${diagram.width} ${diagram.height}`} className="min-w-[760px] max-w-none rounded-xl bg-cream-soft">
          <defs>
            <marker id="diagram-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L8,3 z" fill="#39485a" />
            </marker>
          </defs>
          {diagram.edges.map((edge, index) => (
            <FlowEdgeView key={`${edge.from}-${edge.to}-${index}`} edge={edge} nodes={diagram.nodes} direction={diagram.direction} />
          ))}
          {Array.from(diagram.nodes.values()).map((node) => (
            <FlowNodeView key={node.id} node={node} />
          ))}
        </svg>
      </div>
    </div>
  );
}

function parseSequenceDiagram(code: string) {
  const lines = code.split("\n").map((line) => line.trim()).filter(Boolean);
  const participants = new Map<string, string>();
  const messages: SequenceMessage[] = [];

  lines.slice(1).forEach((line) => {
    const participant = line.match(/^participant\s+([A-Za-z0-9_]+)\s+as\s+(.+)$/);
    if (participant) {
      participants.set(participant[1], participant[2]);
      return;
    }

    const message = line.match(/^([A-Za-z0-9_]+)(-->>|->>)\s*([A-Za-z0-9_]+):\s*(.+)$/);
    if (!message) return;
    const from = message[1];
    const to = message[3];
    if (!participants.has(from)) participants.set(from, from);
    if (!participants.has(to)) participants.set(to, to);
    messages.push({ from, to, label: message[4], dashed: message[2] === "-->>" });
  });

  return { participants: Array.from(participants.entries()), messages };
}

function SequenceDiagram({ code }: { code: string }) {
  const diagram = parseSequenceDiagram(code);
  const columnWidth = 185;
  const left = 64;
  const top = 54;
  const messageGap = 58;
  const width = Math.max(760, left * 2 + Math.max(diagram.participants.length - 1, 1) * columnWidth);
  const height = top + diagram.messages.length * messageGap + 86;
  const xFor = new Map(diagram.participants.map(([id], index) => [id, left + index * columnWidth]));

  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white shadow-[0_18px_45px_rgba(6,16,28,0.08)]">
      <div className="border-b border-[var(--color-line)] bg-cream-deep/45 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
        Sequence
      </div>
      <div className="overflow-x-auto p-5">
        <svg viewBox={`0 0 ${width} ${height}`} className="min-w-[760px] max-w-none rounded-xl bg-cream-soft">
          <defs>
            <marker id="sequence-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L8,3 z" fill="#39485a" />
            </marker>
          </defs>
          {diagram.participants.map(([id, label]) => {
            const x = xFor.get(id) ?? left;
            return (
              <g key={id}>
                <rect x={x - 62} y="18" width="124" height="38" rx="11" fill="#fffdf5" stroke="#ff5a1f" strokeWidth="1.5" />
                <text x={x} y="42" textAnchor="middle" fill="#06101c" fontSize="12" fontWeight="650">
                  {label}
                </text>
                <line x1={x} y1="66" x2={x} y2={height - 24} stroke="#737f8d" strokeDasharray="5 7" strokeWidth="1" />
              </g>
            );
          })}
          {diagram.messages.map((message, index) => {
            const fromX = xFor.get(message.from) ?? left;
            const toX = xFor.get(message.to) ?? left;
            const y = top + 42 + index * messageGap;
            const labelLines = wrapDiagramLabel(message.label, 34);
            return (
              <g key={`${message.from}-${message.to}-${index}`}>
                <line
                  x1={fromX}
                  y1={y}
                  x2={toX + (toX > fromX ? -10 : 10)}
                  y2={y}
                  stroke="#39485a"
                  strokeWidth="1.35"
                  strokeDasharray={message.dashed ? "6 6" : undefined}
                  markerEnd="url(#sequence-arrow)"
                />
                <text x={(fromX + toX) / 2} y={y - 12 - (labelLines.length - 1) * 7} textAnchor="middle" fill="#06101c" fontSize="12" fontWeight="600">
                  {labelLines.map((line, lineIndex) => (
                    <tspan key={line} x={(fromX + toX) / 2} dy={lineIndex === 0 ? 0 : 14}>
                      {line}
                    </tspan>
                  ))}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

function DocsDiagram({ code }: { code: string }) {
  const trimmed = code.trim();
  if (trimmed.startsWith("sequenceDiagram")) return <SequenceDiagram code={trimmed} />;
  if (trimmed.startsWith("flowchart")) return <FlowchartDiagram code={trimmed} />;
  return <MarkdownCode language="text" code={code} />;
}

function MarkdownCode({ language, code }: { language: string; code: string }) {
  if (language === "mermaid") {
    return <DocsDiagram code={code} />;
  }

  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-white/10 bg-navy text-cream shadow-[0_18px_45px_rgba(6,16,28,0.08)]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-cream/55">
        <span>{language}</span>
      </div>
      <pre className="overflow-x-auto px-4 py-4 text-[12px] leading-6">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function MarkdownBlockView({ block, basePath }: { block: MarkdownBlock; basePath: string }) {
  if (block.type === "heading") {
    if (block.depth === 1) return null;

    const Tag = block.depth === 2 ? "h2" : "h3";
    return (
      <Tag
        id={block.id}
        className={`${block.depth === 2 ? "mt-12 text-3xl" : "mt-8 text-xl"} scroll-mt-28 font-semibold tracking-[-0.035em] text-navy`}
      >
        {block.text}
      </Tag>
    );
  }

  if (block.type === "paragraph") {
    return (
      <p className="mt-4 text-[15.5px] leading-8 text-slate">
        <InlineText text={block.text} basePath={basePath} />
      </p>
    );
  }

  if (block.type === "list") {
    const Tag = block.ordered ? "ol" : "ul";
    return (
      <Tag className={`mt-4 space-y-2 text-[15.5px] leading-8 text-slate ${block.ordered ? "list-decimal pl-6" : ""}`}>
        {block.items.map((item) => (
          <li key={item} className={block.ordered ? "" : "flex gap-3"}>
            {!block.ordered && <span className="mt-3.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rust" />}
            <span>
              <InlineText text={item} basePath={basePath} />
            </span>
          </li>
        ))}
      </Tag>
    );
  }

  if (block.type === "code") {
    return <MarkdownCode language={block.language} code={block.code} />;
  }

  if (block.type === "quote") {
    return (
      <blockquote className="mt-5 border-l-2 border-rust bg-rust-tint px-5 py-4 text-[15px] leading-7 text-slate">
        <InlineText text={block.text} basePath={basePath} />
      </blockquote>
    );
  }

  return (
    <div className="mt-5 overflow-x-auto rounded-2xl border border-[var(--color-line)] bg-white shadow-[0_14px_36px_rgba(6,16,28,0.04)]">
      <table className="w-full min-w-[560px] border-collapse text-left">
        <thead>
          <tr className="border-b border-[var(--color-line)] bg-cream-deep/55">
            {block.headers.map((header) => (
              <th key={header} className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                <InlineText text={header} basePath={basePath} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, rowIndex) => (
            <tr key={`${row.join("-")}-${rowIndex}`} className={rowIndex !== block.rows.length - 1 ? "border-b border-[var(--color-line)]" : ""}>
              {row.map((cell, cellIndex) => (
                <td key={`${cell}-${cellIndex}`} className="px-4 py-3 text-[14px] leading-6 text-slate">
                  <InlineText text={cell} basePath={basePath} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MobileDocSelect({ activeSlug, basePath }: { activeSlug: string; basePath: string }) {
  const navigate = useNavigate();

  return (
    <label className="block lg:hidden">
      <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Current page</span>
      <select
        value={activeSlug}
        onChange={(event) => navigate(routeForSlug(event.target.value, basePath))}
        className="w-full rounded-xl border border-[var(--color-line)] bg-white px-3 py-2.5 text-sm text-navy outline-none focus:border-rust/45"
      >
        {DOC_GROUPS.map((group) => (
          <optgroup key={group.title} label={group.title}>
            {group.pages.map((page) => (
              <option key={page.slug} value={page.slug}>
                {page.title}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </label>
  );
}

export function Docs() {
  const { slug } = useParams();
  const location = useLocation();
  const [query, setQuery] = useState("");
  const basePath = location.pathname.startsWith("/provenant/docs") ? "/provenant/docs" : "/docs";
  const activePage = DOCS_BY_SLUG.get(slug ?? "docs-index") ?? DOCS[0];
  const parsedBlocks = useMemo(() => parseMarkdown(activePage.source), [activePage.source]);
  const headings = parsedBlocks.filter(isHeadingBlock);
  const title = headings.find((block) => block.depth === 1)?.text ?? activePage.title;
  const description = firstParagraph(activePage.source);
  const contentBlocks = parsedBlocks.filter((block) => !(block.type === "heading" && block.depth === 1));
  const toc = headings.filter((block) => block.depth > 1);
  const activeIndex = DOCS.findIndex((page) => page.slug === activePage.slug);
  const previous = activeIndex > 0 ? DOCS[activeIndex - 1] : null;
  const next = activeIndex < DOCS.length - 1 ? DOCS[activeIndex + 1] : null;
  const normalizedQuery = query.trim().toLowerCase();

  const filteredGroups = DOC_GROUPS.map((group) => ({
    ...group,
    pages: group.pages.filter((page) => {
      if (!normalizedQuery) return true;
      return `${page.title} ${page.fileName} ${page.source}`.toLowerCase().includes(normalizedQuery);
    }),
  }));

  return (
    <div className="min-h-screen bg-cream-soft text-navy">
      <header className="sticky top-0 z-50 border-b border-[var(--color-line)] bg-cream-soft/92 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1480px] items-center justify-between px-5 lg:px-8">
          <Link to="/" className="group flex items-center gap-3">
            <img src="/provenant.png" alt="Provenant" className="h-7 w-auto transition group-hover:-rotate-3" />
            <div>
              <div className="font-semibold leading-none tracking-[-0.02em] text-navy">Provenant Docs</div>
              <div className="mt-1 hidden font-mono text-[9px] uppercase tracking-[0.15em] text-muted sm:block">local repository intelligence</div>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <Link to="/" className="hidden items-center gap-2 rounded-lg px-3 py-2 font-mono text-xs text-slate transition hover:bg-white hover:text-rust sm:flex">
              <ArrowLeft className="h-3.5 w-3.5" />
              Landing
            </Link>
            <a
              href="https://github.com/shreyash-sharma/provenant"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-line)] bg-white px-3 py-2 font-mono text-xs text-navy transition hover:border-rust/40"
            >
              <Github className="h-3.5 w-3.5" />
              GitHub
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1480px] lg:grid-cols-[292px_minmax(0,1fr)] xl:grid-cols-[292px_minmax(0,1fr)_252px]">
        <aside className="hidden border-r border-[var(--color-line)] bg-cream-soft px-6 py-6 lg:sticky lg:top-16 lg:block lg:h-[calc(100dvh-4rem)] lg:overflow-y-auto">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search docs"
              className="w-full rounded-xl border border-[var(--color-line)] bg-white py-2.5 pl-9 pr-3 font-mono text-xs text-navy outline-none transition focus:border-rust/45"
            />
          </div>

          <nav className="mt-6 space-y-6">
            {filteredGroups.map((group) => {
              if (group.pages.length === 0) return null;
              return (
                <div key={group.title}>
                  <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.15em] text-muted">{group.title}</div>
                  <div className="space-y-1">
                    {group.pages.map((page) => {
                      const active = page.slug === activePage.slug;
                      return (
                        <Link
                          key={page.slug}
                          to={routeForSlug(page.slug, basePath)}
                          className={`group flex items-center justify-between rounded-lg px-3 py-2 text-[13px] leading-snug transition ${
                            active ? "bg-rust-tint font-semibold text-rust" : "text-slate hover:bg-white hover:text-navy"
                          }`}
                        >
                          <span>{page.title}</span>
                          {active && <ChevronRight className="h-3.5 w-3.5" />}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </nav>
        </aside>

        <main className="min-w-0 px-5 py-8 sm:px-10 lg:px-14 lg:py-14">
          <article className="mx-auto max-w-[850px]">
            <MobileDocSelect activeSlug={activePage.slug} basePath={basePath} />

            <div className="mt-8 flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted lg:mt-0">
              <BookOpen className="h-3.5 w-3.5 text-rust" />
              <span>{activePage.group}</span>
              <span className="text-rust">/</span>
              <span>{activePage.fileName}</span>
            </div>

            <h1 className="display mt-7 text-5xl sm:text-[4.6rem]">{title}</h1>
            <p className="mt-5 max-w-2xl text-[17px] leading-8 text-slate">
              <InlineText text={description} basePath={basePath} />
            </p>

            <div className="mt-12">
              {contentBlocks.map((block, index) => (
                <MarkdownBlockView key={`${block.type}-${index}`} block={block} basePath={basePath} />
              ))}
            </div>

            <div className="mt-14 grid gap-3 border-t border-[var(--color-line)] pt-6 sm:grid-cols-2">
              {previous ? (
                <Link to={routeForSlug(previous.slug, basePath)} className="rounded-2xl border border-[var(--color-line)] bg-white p-4 transition hover:border-rust/35">
                  <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Previous</div>
                  <div className="mt-2 font-semibold text-navy">{previous.title}</div>
                </Link>
              ) : (
                <div />
              )}
              {next && (
                <Link to={routeForSlug(next.slug, basePath)} className="rounded-2xl border border-[var(--color-line)] bg-white p-4 text-right transition hover:border-rust/35">
                  <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Next</div>
                  <div className="mt-2 font-semibold text-navy">{next.title}</div>
                </Link>
              )}
            </div>
          </article>
        </main>

        <aside className="hidden border-l border-[var(--color-line)] px-6 py-14 xl:sticky xl:top-16 xl:block xl:h-[calc(100dvh-4rem)] xl:overflow-y-auto">
          <div className="mb-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
            <BookOpen className="h-3.5 w-3.5" />
            On this page
          </div>
          <nav className="space-y-2">
            {toc.length > 0 ? (
              toc.map((heading) => (
                <a key={heading.id} href={`#${heading.id}`} className={`block leading-snug text-slate transition hover:text-rust ${heading.depth > 2 ? "pl-3 text-[12px]" : "text-[13px]"}`}>
                  {heading.text}
                </a>
              ))
            ) : (
              <p className="text-[13px] leading-6 text-muted">No page sections.</p>
            )}
          </nav>
        </aside>
      </div>
    </div>
  );
}
