# Configuration

Provenant keeps repository-specific state in `.provenant/`. Configuration is written during `provenant init` and read by the CLI, MCP server, and local dashboard.

## Embedders

Embeddings are used for semantic retrieval. Provenant supports local and hosted embedding options.

```bash
provenant init . --embedder local
provenant init . --embedder openai
provenant init . --embedder gemini
provenant init . --embedder none
```

Use `local` when you want offline setup and no API key. Use a hosted provider when your team prefers provider-managed embeddings and has the required key.

## Environment Variables

Common provider keys:

```bash
OPENAI_API_KEY=...
GEMINI_API_KEY=...
GOOGLE_API_KEY=...
OPENROUTER_API_KEY=...
```

The MCP server loads `<repo>/.provenant/.env` before serving tools, so provider configuration can live with the local Provenant state.

## Index Mode

The default `init` flow indexes the repository and prepares retrieval state. Depending on selected options, it may also generate richer wiki pages through an LLM provider.

For teams that want lower setup cost, start with local embeddings and minimal hosted generation. For teams that want stronger narrative summaries, configure a hosted LLM provider.

## Local Server

Start:

```bash
provenant serve .
```

Stop:

```bash
provenant serve --stop
```

The local API and dashboard are served from the same process.

## Runtime State

Generated state should usually stay out of application source control:

```gitignore
.provenant/
```

The Provenant source repository may track fixtures and package assets, but application repos should treat `.provenant/` as local runtime state unless the team explicitly chooses otherwise.

