# Glossary

## Agent

An AI coding assistant that can inspect code, call tools, and make or suggest edits.

## Assisted Session

A coding-agent usage session that Provenant can correlate with at least one Provenant MCP tool event.

## ccusage

An optional tool that reads local coding-agent usage logs and reports token and estimated cost data. Provenant imports its JSON output.

## Coverage@5

The percentage of tasks where the correct issue-relevant file appears in the top 5 retrieved files.

## Coverage@10

The percentage of tasks where the correct issue-relevant file appears in the top 10 retrieved files.

## Embedder

A model that converts text into vectors for semantic search. Provenant can use local or hosted embedders.

## MCP

Model Context Protocol. Provenant uses MCP to expose repository tools to coding agents.

## MRR

Mean reciprocal rank. A retrieval metric that rewards ranking the correct item higher.

## Provenant Index

The local `.provenant/` state built from repository source, generated wiki pages, symbol data, graph relationships, and history-derived signals.

## Provenant-Assisted Usage

Usage where Provenant MCP activity appears inside the same time window as a coding-agent session.

## Wiki Page

A generated, cited explanation of a file or code area. It is used as a retrieval surface and orientation layer.

