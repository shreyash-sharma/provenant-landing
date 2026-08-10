# Quickstart

## Install

```bash
pip install provenant
```

## Initialize A Repository

```bash
provenant init /path/to/repo
```

During init, Provenant writes local state under:

```text
/path/to/repo/.provenant/
```

If `ccusage` is not installed and the terminal is interactive, Provenant asks whether to install it. The prompt explains that `ccusage` is optional and is used to measure coding-agent token and cost trends.

If you skip it, install it later with:

```bash
npm install -g ccusage
```

Then import usage data with:

```bash
provenant usage sync /path/to/repo
```

## Start MCP For An Agent

```bash
provenant mcp /path/to/repo
```

Use this command in an MCP-compatible client such as Claude Code, Cursor, Cline, Windsurf, or any client that can run a stdio MCP server.

Example MCP server config:

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

## Start The Local Dashboard

```bash
provenant serve /path/to/repo
```

Stop it with:

```bash
provenant serve --stop
```

## Ask From The CLI

```bash
provenant ask "Where is authentication handled?" --path /path/to/repo
```

## Search From The CLI

```bash
provenant search "database migration validation" /path/to/repo
```

## Check The Install

```bash
provenant doctor /path/to/repo
```

## Common Next Steps

- Run `provenant update /path/to/repo` after meaningful code changes.
- Run `provenant usage sync /path/to/repo` after using an agent with Provenant MCP.
- Open the Usage tab in the local dashboard to see imported token and estimated cost data.

