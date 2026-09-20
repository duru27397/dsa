# DSA Cheat Sheet Agent Guide

## Purpose

This repository is a small, dependency-free revision sheet for Python 3 data
structures and algorithms. Keep it fast to open locally and easy to scan while
revising.

## Project shape

- `dsa_revision.html` is the single-page entry point serving discrete page views with an embedded SVG favicon.
- `assets/css/cheat-sheet.css` contains the dark LeetCode-style theme, Monaco-style Python 3 syntax highlighting, and 3-level tree navigation.
- `assets/js/cheat-sheet.js` manages tree expansion, discrete page switching (no scrolling across sections), URL hash routing, and clipboard copy fallbacks.
- Navigation uses a clean 3-level sidebar hierarchy (Category -> Subcategory -> Topic/Technique):
  1. Level 1 (Category): Arrays & Hashing, Dynamic Programming, Stack & Queue, Binary Search
  2. Level 2 (Subcategory): Overview & Blueprint, Hash Maps & Sets, Prefix & Suffix Accumulation, Two Pointers & Sliding Window, LIFO & FIFO Fundamentals, Monotonic Stack, Monotonic Queue & Deque, Search in Arrays & Bisect, Rotated Arrays & Invariants, Solution Space & Monotonic Functions, Practice Problems
  3. Level 3 (Topic / Technique): Specific techniques (e.g., Hash Set Lookups, Complement Map, Product Except Self, Two Pointers, Linear Recurrence, Unbounded Knapsack, Next Greater Element, Sliding Window Maximum, Bisect Insertion Point, Rotated Array Search, Peak Element Invariant, Koko Bananas Minimization, Split Array Largest Sum, etc.)
  - No artificial "L1", "L2", "L3", "BP", or "REF" badges in the sidebar.
- Code blocks follow Python 3 snippet style (clean function definitions without class wrapper or line numbers, with docstring ASCII diagrams, type hints, and Monaco dark syntax highlighting).
- Each section acts as a distinct, non-scrolling page view (`.page-view`), showing only one section at a time.

## Editing rules

- Preserve the dark UI, orange accent, and LeetCode Monaco syntax highlighting colors (blue `def`/`class`, purple flow keywords, yellow functions, teal types, pastel green numbers, salmon strings/docstrings, forest green comments).
- Keep code examples structured as clean Python 3 function/script snippets with clear docstring diagrams.
- Maintain discrete page views: each section is displayed independently without scrolling through other sections.
- Use semantic HTML and relative asset paths so `dsa_revision.html` works from
  `file://` without a server or build step.
- Do not add frameworks, package managers, trackers, network calls, or runtime
  dependencies.

## Verification

After a change:

1. Run `git diff --check`.
2. Open `dsa_revision.html` directly in a browser.
3. Verify the 3-level sidebar navigation (Category -> Subcategory -> Topic/Technique) and confirm absence of L1/L2/L3 badges in the sidebar.
4. Confirm discrete page switching: navigating between sections changes the view without scrolling across other sections and resets scroll to top.
5. Verify LeetCode Monaco editor syntax highlighting, code copy buttons (with fallback for `file://`), and responsive mobile drawer.
