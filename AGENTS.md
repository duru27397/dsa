# DSA Agent Guide

## Purpose

This repository is a fast, dependency-free revision sheet for Python 3 data
structures and algorithms. It is designed to open instantly from local `file://`
paths in any modern browser (Safari, Chrome, Firefox, Edge) without any build
step, server, or runtime dependencies.

---

## Project Shape & Key Files

- `dsa_revision.html`: Single-page entry point serving discrete page views (`.page-view`), embedded favicon links (ICO, PNG, SVG, Apple Touch Icon), topbar breadcrumbs, and mobile drawer backdrop.
- `assets/css/cheat-sheet.css`: LeetCode-style dark theme, Monaco Python 3 syntax highlighting, 3-level tree navigation, component styling, and mobile responsive media queries.
- `assets/js/cheat-sheet.js`: Tree node expansion/collapse, discrete page switching (no scrolling between sections), URL hash routing (`#page-id?sub=technique-id`), clipboard copy with `file://` fallback, and mobile drawer controls.
- `favicon.ico`, `apple-touch-icon.png`, `assets/favicon.png`, `assets/favicon.svg`: Multi-format icon assets ensuring crisp favicon rendering across all browsers (including macOS Safari tabs).

---

## Design System & UI Specifications

### 1. Color Palette & Theme Tokens
```css
--bg-main: #141414;        /* Page background */
--bg-surface: #1b1b1b;     /* Sidebar & topbar background */
--bg-card: #202020;        /* Pattern card & blueprint card background */
--bg-code: #1e1e1e;        /* Code block background */
--border: #353535;         /* Primary borders */
--border-soft: #2a2a2a;    /* Subtle dividers & card borders */
--text: #eff1f6;           /* High-contrast primary text */
--muted: #9ea0a5;          /* Secondary & label text */
--faint: #64748b;          /* Icons, chevrons, and subtle indicators */
--orange: #ffa116;         /* LeetCode accent / active brand color */
--easy: #00b8a3;           /* Success / copied state / easy difficulty */
--cyan: #2dd4bf;           /* Code takeaway highlights */
```

### 2. Topbar & Breadcrumbs
- Topbar (`.topbar`) is fixed at the top of the content area (`height: 56px`, `52px` on mobile).
- Breadcrumbs dynamically reflect the active Category and Subcategory:
  ```html
  <div class="breadcrumb">
    <span id="current-topic">
      <span class="breadcrumb-category">Binary Search</span>
      <span class="breadcrumb-divider" aria-hidden="true">
        <svg class="breadcrumb-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </span>
      <span class="breadcrumb-page">Sorted Arrays &amp; Boundaries</span>
    </span>
  </div>
  ```
- **Rule**: Category is styled in `var(--muted)`, the divider is an SVG chevron icon in `var(--faint)`, and the page title is in `var(--text)`.

### 3. Sidebar 3-Level Hierarchy
The sidebar provides clear, clean navigation without artificial "L1", "L2", "L3", "BP", or "REF" badges:
1. **Level 1 (Category)**:
   - Structure: `.tree-node.l1-node` > `.tree-header.l1-header` > `.tree-toggle` + `.nav-item.l1-link`
   - Content: Category icon (e.g. `⚡`, `📈`, `🥞`, `🎯`) + category name.
2. **Level 2 (Subcategory)**:
   - Structure: `.tree-node.l2-node` > `.tree-header.l2-header` > `.tree-toggle` + `.nav-item.l2-link`
   - Examples: Overview & Blueprint, Hash Maps & Sets, 1D State Transitions, Practice Problems.
3. **Level 3 (Topic / Technique)**:
   - Structure: `.tree-children.l3-children` > `.nav-item.l3-link`
   - Content: Leaf dot (`•`) + technique name (e.g. "Hash Set Lookups", "Bisect Left / Right").
   - Attribute: `data-target-sub="technique-card-id"` scrolls to and briefly highlights the target technique.

### 4. Component Patterns

#### A. Blueprint Code Card (Space-Optimized)
- To maximize visible code space, blueprint cards omit redundant language dropdown bars.
- The copy button floats in the top-right corner of the card:
  ```html
  <section class="blueprint-card" aria-label="Arrays &amp; Hashing Blueprint">
    <button class="copy-button blueprint-copy" type="button" data-code="arrays-code"><span>📋</span> Copy</button>
    <pre class="code-block" id="arrays-code"><code>...</code></pre>
  </section>
  ```

#### B. Pattern Cards & Visual Traces
- Pattern cards describe specific algorithmic techniques:
  ```html
  <article class="pattern-card" id="technique-id">
    <div class="pattern-card-head">
      <h3>Technique Title</h3>
    </div>
    <p class="use-when"><strong>Use when:</strong> Condition describing when to apply this pattern.</p>
    <div class="why-box">
      <strong>Why it works &amp; Visual Trace</strong>
      <p>Intuition explanation...</p>
      <pre class="trace-diagram"><code>ASCII diagram illustrating the invariant or trace</code></pre>
    </div>
    <div class="mini-code-wrap">
      <button class="copy-button mini-copy" type="button" data-code="mini-code-id">Copy</button>
      <pre class="mini-code" id="mini-code-id"><code>...</code></pre>
    </div>
  </article>
  ```

#### C. Practice Problem Cards
- Linked problems connect patterns to real LeetCode problems:
  ```html
  <div class="pattern-problem-card">
    <div class="pattern-problem-top">
      <a class="pattern-problem-title" href="https://leetcode.com/problems/..." target="_blank" rel="noopener">
        <span>Problem Name</span>
        <span>↗</span>
      </a>
      <div class="pattern-problem-badges">
        <span class="problem-tag">Tag Name</span>
        <span class="badge-diff diff-easy">Easy</span>
        <span class="actual-diff">Actual: <span class="diff-num">2/5</span></span>
      </div>
    </div>
    <p class="pattern-problem-takeaway">
      <strong>Pattern Takeaway:</strong> Key intuition summary.
    </p>
  </div>
  ```

### 5. Python 3 Monaco Dark Syntax Highlighting
All code snippets use semantic span classes matching Monaco / VS Code Dark:
- Blue (`#569cd6`): `.kw-def`, `.kw-class`
- Magenta/Purple (`#c586c0`): `.flow` (`from`, `import`, `for`, `in`, `if`, `and`, `return`, `while`, `else`)
- Warm Yellow (`#dcdcaa`): `.fn` (`len`, `max`, `range`, `enumerate`, user functions)
- Sky Blue (`#9cdcfe`): `.param`, `.var` (`nums`, `target`, `i`, `left`, `right`)
- Teal (`#4ec9b0`): `.type`, `.decorator` (`List`, `int`, `bool`, `dict`, `set`, `@cache`)
- Soft Green (`#b5cea8`): `.num` (`0`, `1`, `2`)
- Salmon/Peach (`#ce9178`): `.str`, `.docstr` (string literals & docstrings)
- Forest Green (`#6a9955`, italic): `.comment` (`# comments`)
- Neutral (`#d4d4d4`): `.punct` (colons, brackets, parentheses)

### 6. Python 3 Coding Standards: Strict camelCase, Single-Line Inits & Vertical Breathing Room
- **Strict camelCase Requirement**:
  - ALL Python 3 function names, variable names, and parameter names MUST use `camelCase` (e.g., `climbStairs`, `climbStairsTopDown`, `targetSum`, `isFirst`, `prevIdx`, `windowIsInvalid`, `canExtend`, `minEatingSpeed`, `nextGreater`, `prevI`).
  - `snake_case` is STRICTLY FORBIDDEN in Python code across this entire repository (do NOT use `climb_stairs`, `is_first`, `prev_idx`, `next_greater`, etc.).
  - Class names use `PascalCase` (e.g. `MinStack`).
- **Single-Line Initial States**:
  - Related initialization variables MUST be combined on a single line using tuple unpacking:
    ```python
    prev2, prev1 = 0, 0
    left, right = 0, len(nums) - 1
    wordSet, n = set(wordDict), len(s)
    q, res = deque(), []
    n, dp = len(weights), [0] * (capacity + 1)
    ```
- **Vertical Breathing Room & Newline Breaks**:
  - Separate logical phases with a blank line:
    1. Early guard clauses (`if not nums: return 0`).
    2. Initial state setup.
    3. Loop blocks (`for` / `while`).
    4. Complex conditional branches (`if` / `elif` / `else`) and state updates inside loops.
    5. Final `return` statement.
- **Rich Comments & Docstrings**:
  - Every function and blueprint snippet MUST include an ASCII diagram / intuition docstring (`"""..."""`) explaining the invariant, input trace, and logic.
  - Include inline comments (`#`) explaining key state transitions, pointer adjustments, invariant maintenance, and time/space complexity tradeoffs.
### 7. Dynamic Programming Architectural Models & Patterns
- **Two Architectural Engines**:
  1. *The Combinatorics Basket (Addition)*: Used for "how many ways?", "count paths", "all combinations". Sum branches (`take + skip` or `sum(choices)`). Never `max`/`min`, no `1 +`.
  2. *The Optimization Ruler (Min/Max)*: Used for "maximum profit", "minimum cost", "shortest/longest". Compare branches (`max(take, skip)` or `min(take + 1, ...)`). Add incremental cost (`1 +` or `val +`).
- **Two Exploration Engines**:
  1. *0/1 Take/Skip*: For bounded subsets (each item used $\le 1$ time). In 1D tabulation, capacity loop MUST run in **reverse** (`range(capacity, weight - 1, -1)`).
  2. *Shopping Menu Jump Loop*: For unbounded supply or multi-branch steps. In 1D tabulation, capacity loop runs **forward** (`range(coin, amount + 1)`).
- **Subarray vs Subsequence Physics**:
  - *Subarrays* are contiguous: state must either *extend* the contiguous streak or *restart* at zero.
  - *Subsequences* allow gaps: skipping elements preserves the streak (`take` or `skip`). Jump loops implicitly skip elements by leaping from `j` to `i`.
- **LIS Invariants**:
  - $O(n^2)$: Quadratic jump loop checking all valid predecessors `nums[j] < nums[i]`.
  - $O(n \log n)$: Patience sorting maintaining strictly increasing `tails[k]` (smallest tail among all increasing subsequences of length $k+1$) using `bisectLeft`.

---

## How to Add New UI Elements

### Adding a New Category (Level 1)
1. Add a new `.tree-node.l1-node` in `#nav-tree` with a unique `data-topic` and category icon.
2. Add corresponding `.page-view` sections in `<main class="content">`:
   - An Overview & Blueprint page (`id="<category>-blueprint"`).
   - Subcategory pages (`id="<category>-<subtopic>-sub"`).
   - A Practice Problems reference page (`id="<category>-reference"`).
3. Set `data-topic-title` and `data-page-title` on each `.page-view`.

### Adding a New Subcategory (Level 2)
1. In the sidebar category node, add a `.tree-node.l2-node` with `.l2-header` and `.l2-link` pointing to `#<page-id>`.
2. Add the corresponding `<section class="page-view" id="<page-id>">` in `dsa_revision.html`.

### Adding a New Technique (Level 3)
1. In the subcategory node, add an `.l3-children` container with `.nav-item.l3-link` pointing to `#<page-id>` with `data-target-sub="<technique-id>"`.
2. Inside the target page view, add an `<article class="pattern-card" id="<technique-id>">`.

---

## Mobile Responsiveness Guidelines

- **Drawer & Overlay**: On screens $\le 768\text{px}$, the sidebar becomes an off-canvas drawer with smooth slide-in, safe-area padding, and a dark blurred backdrop (`.sidebar-backdrop`).
- **Dismissal**: Tapping the backdrop, tapping any nav link, or pressing the `Escape` key closes the mobile drawer.
- **Topbar Truncation**: Breadcrumbs gracefully truncate on small screens without pushing the `☰ Topics` button out of the viewport.
- **Horizontal Scrolling**: All `.code-block`, `.mini-code`, `.trace-diagram`, and problem lists support momentum scrolling (`-webkit-overflow-scrolling: touch`) and never overflow the page horizontally.
- **Touch Targets**: All interactive elements (nav items, toggles, copy buttons, menu button) have comfortable minimum touch targets ($\ge 38\text{px}$).

---

## Verification Checklist

After making any change:
1. Run `git diff --check`.
2. Open `dsa_revision.html` directly in Safari, Chrome, and Firefox via `file://`.
3. Verify tab favicon displays the orange DSA tree icon (not the default compass).
4. Verify absence of redundant header bars on blueprint cards; verify top-right copy button.
5. Verify mobile drawer behavior: tap `☰ Topics`, verify backdrop, tap backdrop to close, press `Escape` to close.
6. Verify discrete page switching (no vertical scrolling between sections, resets scroll to top).
7. Verify Python 3 Monaco syntax highlighting across all code blocks.
