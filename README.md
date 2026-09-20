# DSA Cheat Sheet

A compact, dependency-free Python 3 revision cheat sheet featuring a 3-level hierarchical navigation tree (Category $\to$ Subcategory $\to$ Topic/Technique), LeetCode Monaco editor syntax highlighting, and discrete non-scrolling page views across two core domains:

1. Arrays & Hashing
2. Dynamic Programming

## Structure

```text
.
├── AGENTS.md                  # Working rules for AI-assisted edits
├── README.md                  # Overview & guide
├── dsa_revision.html          # Entry point containing discrete page views & favicon
└── assets/
    ├── css/
    │   └── cheat-sheet.css    # Dark LeetCode Monaco-style theme & 3-level tree styles
    └── js/
        └── cheat-sheet.js     # Tree navigation, page switching & copy logic
```

## Navigation Hierarchy (A $\to$ B $\to$ C)

The sidebar is organized into a clean 3-level taxonomy without artificial badges:

- **Level 1 (Category - A)**: Arrays & Hashing, Dynamic Programming
- **Level 2 (Subcategory - B)**: Overview & Blueprint, Hash Maps & Sets, Prefix & Suffix Accumulation, Two Pointers & Sliding Window, Practice Problems
- **Level 3 (Topic / Technique - C)**: Specific sub-techniques (e.g., Hash Set Lookups, Complement Map, Product Except Self, Two Pointers, Climbing Stairs, Coin Change, LIS)

## Code Style & Highlighting

- Styled after LeetCode's Python 3 editor with Monaco Dark syntax colors:
  - Blue (`#569cd6`) for `class` and `def`
  - Purple/Magenta (`#c586c0`) for control flow (`for`, `in`, `if`, `return`, `from`, `import`)
  - Soft yellow (`#dcdcaa`) for functions and builtins (`len`, `max`, `range`)
  - Sky blue (`#9cdcfe`) for variables and parameters
  - Teal (`#4ec9b0`) for types (`List`, `int`, `bool`) and `@cache`
  - Soft green (`#b5cea8`) for numbers
  - Salmon/Peach (`#ce9178`) for strings and docstrings
  - Forest green (`#6a9955`) for comments
- Structured as clean Python 3 function/script snippets with ASCII docstring intuition diagrams.

## Open it

Open [dsa_revision.html](dsa_revision.html) directly in any web browser. No server, build step, package manager, or internet connection is required.
