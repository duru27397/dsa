# DSA

A compact, dependency-free Python 3 revision guide featuring a 3-level hierarchical navigation tree (Category $\to$ Subcategory $\to$ Topic/Technique), LeetCode Monaco editor syntax highlighting, and discrete non-scrolling page views across core algorithmic domains:

1. Arrays & Hashing
2. Dynamic Programming
3. Stack & Queue
4. Binary Search
5. Union-Find (DSU)
6. Special Algorithms (KMP Pattern Matching)
7. Intervals (Clustering, Scheduling & Line Sweep)

---

## Structure

```text
.
├── AGENTS.md                  # Comprehensive design system & agent working rules
├── README.md                  # Overview & guide
├── dsa_revision.html          # Entry point containing discrete page views & favicon links
├── favicon.ico                # Multi-resolution binary icon (Safari/Chrome/Firefox/Windows)
├── apple-touch-icon.png       # 64x64/180x180 touch icon for Safari tabs & mobile bookmarks
└── assets/
    ├── favicon.png            # High-DPI PNG favicon asset
    ├── favicon.svg            # Vector SVG favicon asset
    ├── css/
    │   └── cheat-sheet.css    # Dark LeetCode Monaco-style theme, responsive layout & 3-level tree styles
    └── js/
        └── cheat-sheet.js     # Tree navigation, page switching, copy logic & mobile drawer controls
```

---

## Navigation Hierarchy (A $\to$ B $\to$ C)

The sidebar is organized into a clean 3-level taxonomy without artificial badges:

- **Level 1 (Category - A)**: Arrays & Hashing, Dynamic Programming, Stack & Queue, Binary Search, Union-Find (DSU), Special Algorithms, Intervals
- **Level 2 (Subcategory - B)**: Overview & Blueprint, Hash Maps & Sets, Prefix & Suffix Accumulation, Two Pointers & Sliding Window, Permutation Cycles & Swapping, LIFO & FIFO Fundamentals, Monotonic Stack, Monotonic Queue & Deque, Search in Arrays & Bisect, Rotated Arrays & Invariants, Solution Space & Monotonic Functions, Connected Components & Cycles, Dynamic Grid DSU, KMP Pattern Matching, Merging & Inserting Intervals, Scheduling & Greedy Selection, Sweep-Line & Gaps, Practice Problems
- **Level 3 (Topic / Technique - C)**: Specific sub-techniques (e.g., Permutation Proof (A ➔ B), Cyclic Replacements, Minimum Swaps to Transform, Merge Intervals, Insert Interval, Interval Intersections, Non-Overlapping Greedy, Meeting Rooms Min-Heap, Burst Balloons Arrow Stabbing, Chronological Line Sweep, Employee Free Time Gap Mining, Remove Covered Intervals)

---

## Key Features

- **Space-Optimized Blueprint Cards**: Redundant language headers have been eliminated; code begins immediately at the top of the card with a sleek floating copy button.
- **Top-tier Mobile Responsiveness**: Complete off-canvas mobile drawer with smooth slide-in, backdrop blur overlay, tap-to-dismiss, and keyboard accessibility (`Escape`).
- **Momentum Horizontal Scrolling**: Code blocks, ASCII trace diagrams, and problem cards support smooth horizontal swiping on mobile devices without overflowing.
- **Cross-Browser Favicon Support**: Built-in `.ico`, `.png`, and `.svg` favicons designed specifically to render properly in Safari tabs (including local `file://` URLs), Chrome, Firefox, and Edge.

---

## Code Style & Highlighting

- **Strict `camelCase` Standard**: All Python 3 functions, variables, and parameters MUST use `camelCase` (e.g. `climbStairs`, `targetSum`, `isFirst`, `prevIdx`, `windowIsInvalid`, `nextGreater`), NEVER `snake_case`. Class names use `PascalCase`.
- **Single-Line Initial States**: Related setup variables are consolidated on one line via tuple unpacking (e.g. `prev2, prev1 = 0, 0`, `left, right = 0, len(nums) - 1`, `q, res = deque(), []`).
- **Vertical Breathing Room**: Newline breaks separate guards, setup, loops, branching conditions, and returns for optimal code scanning.
- **Rich Comments & Docstrings**: Include explanatory docstrings (`"""..."""`) with ASCII diagrams and `#` inline comments explaining state transitions and complexity invariants.
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

---

## Open it

Open [dsa_revision.html](dsa_revision.html) directly in any web browser (Safari, Chrome, Firefox, Edge). No server, build step, package manager, or internet connection is required.
