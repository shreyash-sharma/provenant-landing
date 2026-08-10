# FAQ

## Does Provenant Upload My Code?

Not by default. Provenant stores repo intelligence locally under `.provenant/`. Hosted embedding or LLM providers may receive text if you configure them.

## Is ccusage Required?

No. `ccusage` is optional. Provenant uses it only for coding-agent token and estimated cost telemetry.

## Will The Usage Tab Prove Provenant Saved Money?

It shows observed differences between Provenant-assisted and unassisted local sessions. That is useful operational evidence, but it is not a randomized experiment. For stronger proof, run comparable baseline and treatment tasks with the same agent and model.

## Should I Commit `.provenant/`?

Usually no. Add it to the application repo's `.gitignore`:

```gitignore
.provenant/
```

## Does Provenant Replace Source Reads?

No. Provenant narrows the search space. The agent should still inspect files before editing them.

## Does Provenant Work Without Internet?

Core local indexing and local embedding workflows can work without hosted providers. Any configured hosted LLM or embedding provider needs network access. `ccusage` sync defaults to offline mode from Provenant.

## Which Agents Can Use Provenant?

Any agent or editor that can run an MCP server can use Provenant. Most local setups use:

```bash
provenant mcp /path/to/repo
```

## When Should I Run `provenant update`?

Run it after branch switches, larger code changes, or dependency changes. Use watch mode or hooks if you want more automatic refreshes.

