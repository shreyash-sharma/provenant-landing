# Editor And Agent Setup

Provenant works with MCP-compatible coding agents.

## Standard MCP Command

```bash
provenant mcp /path/to/repo
```

Most local clients use stdio transport. Web-based clients may use SSE:

```bash
provenant mcp /path/to/repo --transport sse --port 7338
```

## Generic MCP Config

```json
{
  "mcpServers": {
    "provenant": {
      "command": "provenant",
      "args": ["mcp", "/path/to/repo"]
    }
  }
}
```

## Recommended Agent Instruction

Use a short project instruction such as:

```text
Before broad file reads, ask Provenant for relevant files, symbols, and risk context.
Prefer cited Provenant context for orientation, then verify against source before editing.
```

## When To Use Provenant During Agent Work

Use Provenant at the start of:

- bug localization
- unfamiliar feature work
- refactors with unknown blast radius
- tests that fail in a module the agent has not seen
- cross-repo or cross-package tasks

## When Source Reads Still Matter

Provenant narrows the search space. It does not remove the need to inspect source before changing it. Agents should still read the exact files they edit and run relevant checks.

