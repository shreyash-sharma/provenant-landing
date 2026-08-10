# Installation

## Requirements

Provenant is installed as a Python package:

```bash
pip install provenant
```

Recommended environment:

- Python 3.11 or newer
- Git installed and available on `PATH`
- Node.js and npm only if you want optional `ccusage` installation through `provenant init`

## Verify The CLI

```bash
provenant --version
provenant doctor .
```

`doctor` checks common local setup problems and reports what to fix.

## Install In A Virtual Environment

For a clean project-local install:

```bash
python -m venv .venv
.venv\Scripts\activate
pip install provenant
```

On macOS or Linux:

```bash
python -m venv .venv
source .venv/bin/activate
pip install provenant
```

## Optional: ccusage

`ccusage` is not required for indexing or MCP. It is used for token and cost telemetry.

Install globally:

```bash
npm install -g ccusage
```

Or let Provenant run it through `npx` during sync:

```bash
provenant usage sync . --use-npx
```

## Upgrade

```bash
pip install --upgrade provenant
```

After an upgrade, refresh the repo index:

```bash
provenant update .
```

## Uninstall

```bash
pip uninstall provenant
```

This removes the Python package. It does not delete repo-local `.provenant/` directories.

