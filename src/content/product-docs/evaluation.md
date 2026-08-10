# Evaluation

Provenant has two kinds of evidence today:

- retrieval evidence: whether Provenant finds issue-relevant files
- context-size evidence: whether Provenant gives agents a smaller representation than raw source loading

Usage and savings telemetry is separate. It measures local agent sessions after installation and should be treated as operational evidence unless run under a controlled benchmark.

## SWE-bench Verified

The current retrieval evaluation uses SWE-bench Verified: 500 real GitHub issues across 12 Python repositories.

| Metric | Baseline | Provenant | Delta |
|---|---:|---:|---:|
| File Coverage@5, wiki BM25 | 56.2% | 63.8% | +7.6 pp |
| File Coverage@5, reranker + selective HyDE | 56.2% | 66.2% | +10.0 pp |
| File Coverage@10, reranker + selective HyDE | 69.0% | 75.2% | +6.2 pp |
| MRR, reranker + selective HyDE | 0.404 | 0.454 | +0.050 |

File Coverage@5 means the correct issue-relevant file appears in the top 5 retrieved files. Coverage@10 uses the top 10. MRR is mean reciprocal rank.

## Token Efficiency

The token-efficiency measurements compare Provenant wiki/context output against naive source loading for question-answering workloads.

| Repository | Provenant wiki tokens | Naive source tokens | Reduction |
|---|---:|---:|---:|
| Flask | 1,070 | 69,044 | 64.5x |
| Django | 994 | 59,634 | 60.0x |

For Django, answer quality was approximately at parity in the measured set, with a -0.15 average judge-score delta across 20 questions and 8 exact ties.

## Low-Confidence Repair

Provenant tracks attribution confidence as:

```text
cited_pages / retrieved_pages
```

In one repair study, 4 low-confidence queries were identified, 2 improved after repair, and the average judge score changed from 4.50 to 4.75. The run repaired 10 pages out of 1,393 at an estimated cost of about $0.02.

## What The Numbers Support

These numbers support a narrow claim:

Provenant can improve file localization and reduce context size for coding-agent retrieval workflows.

They do not, by themselves, prove that every downstream coding task succeeds more often or costs less. That is why the ccusage integration exists: it gives teams repo-local operational data about token and cost behavior after Provenant is installed.

## Reproducibility Trail

The repo includes compact benchmark artifacts under `benchmarks/`:

- `sample_results.json`
- `swebench_verified_summary.csv`

The longer methodology is described in the Provenant whitepaper:

https://www.shreyashsharma.com/writing/provenant

