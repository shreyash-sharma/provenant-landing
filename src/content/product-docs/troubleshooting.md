# Troubleshooting

## `provenant` Command Not Found

Check the active Python environment:

```bash
python -m pip show provenant
python -m pip install provenant
```

If installed in a virtual environment, activate that environment before running Provenant.

## No `.provenant/` Directory

Initialize the repository:

```bash
provenant init .
```

MCP can start without the directory, but tools will not have repo intelligence to read.

## MCP Client Cannot Connect

Verify the configured command:

```bash
provenant mcp /absolute/path/to/repo
```

Use an absolute repo path in the MCP config when the client starts servers from an unknown working directory.

## Dashboard Does Not Open

Start the local server:

```bash
provenant serve .
```

If an old server is stuck, stop it:

```bash
provenant serve --stop
```

Then start again.

## Usage Tab Says ccusage Is Missing

Install `ccusage`:

```bash
npm install -g ccusage
```

Then sync:

```bash
provenant usage sync .
```

If you do not want a global install:

```bash
provenant usage sync . --use-npx
```

## Usage Sync Times Out

Increase the timeout:

```bash
provenant usage sync . --timeout 180
```

If pricing refresh is slow or network access is unavailable, keep the default offline mode. Use `--online` only when needed.

## Search Results Look Stale

Refresh the index:

```bash
provenant update .
```

If you switched branches or deleted generated state, run:

```bash
provenant init .
```

## Hosted Provider Fails

Check the provider key:

```bash
echo %OPENAI_API_KEY%
echo %GEMINI_API_KEY%
```

On macOS or Linux:

```bash
echo $OPENAI_API_KEY
echo $GEMINI_API_KEY
```

You can use local embeddings if hosted provider setup is not ready:

```bash
provenant init . --embedder local
```

