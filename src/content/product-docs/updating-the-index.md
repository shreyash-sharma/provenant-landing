# Updating The Index

The Provenant index should change when the repository changes.

## Manual Update

```bash
provenant update .
```

Run this after meaningful code changes, dependency changes, or branch switches.

## Status

```bash
provenant status .
```

Use status to check whether Provenant sees an initialized repo and whether local state is available.

## Watch Mode

For active development, use:

```bash
provenant watch .
```

Watch mode keeps Provenant closer to the current working tree. Use it when you are iterating with an agent and want the index refreshed without manually running update each time.

## Git Hooks

Provenant can install hooks so the index updates after commits:

```bash
provenant hook install
```

Check hook state:

```bash
provenant hook status
```

## When To Re-Init

Use `provenant init` again when:

- the repository has never been initialized
- you want to change setup choices made during init
- the `.provenant/` directory was deleted
- you want a clean rebuild instead of an incremental update

## Branch Switching

After switching branches, run:

```bash
provenant update .
```

This refreshes the index against the checked-out source.

