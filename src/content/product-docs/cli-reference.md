# CLI Reference

This page lists the commands users most often need. Use `--help` on any command for the exact local options.

## Setup

```bash
provenant init .
provenant doctor .
provenant status .
```

## Serve

```bash
provenant mcp .
provenant mcp . --transport sse --port 7338
provenant serve .
provenant serve --stop
```

## Query

```bash
provenant ask "Where is billing handled?" --path .
provenant search "billing invoice retries" .
```

## Maintain

```bash
provenant update .
provenant watch .
provenant hook install
provenant hook status
```

## Usage Telemetry

```bash
provenant usage sync .
provenant usage sync . --use-npx
provenant usage sync . --online
provenant usage report . --by day
provenant usage report . --by project
provenant usage report . --by agent
provenant usage report . --by model
provenant usage report . --by session
provenant usage report . --json
```

## Analysis

```bash
provenant dead-code .
provenant costs .
provenant compression-report .
```

## Export

```bash
provenant export .
```

## Workspaces

```bash
provenant workspace --help
```

