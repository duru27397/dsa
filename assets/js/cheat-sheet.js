(() => {
  const sidebar = document.getElementById("sidebar");
  const menuButton = document.getElementById("menu-button");
  const sidebarBackdrop = document.getElementById("sidebar-backdrop");
  const currentTopic = document.getElementById("current-topic");
  const pages = [...document.querySelectorAll(".page-view")];
  const navItems = [...document.querySelectorAll(".nav-item")];

  const closeSidebar = () => {
    sidebar?.classList.remove("open");
    sidebarBackdrop?.classList.remove("active");
    menuButton?.setAttribute("aria-expanded", "false");
  };

  const openSidebar = () => {
    sidebar?.classList.add("open");
    sidebarBackdrop?.classList.add("active");
    menuButton?.setAttribute("aria-expanded", "true");
  };

  const toggleSidebar = () => {
    if (sidebar?.classList.contains("open")) {
      closeSidebar();
    } else {
      openSidebar();
    }
  };

  const pageAliases = {
    "arrays-hashing": "arrays-blueprint",
    "dynamic-programming": "dp-blueprint",
    "stack-queue": "stack-blueprint",
    "stacks-queues": "stack-blueprint",
    "arrays-l1": "arrays-hash",
    "arrays-l2": "arrays-prefix-sub",
    "arrays-l3": "arrays-pointers",
    "arrays-l4": "arrays-cycles-sub",
    "arrays-cycles": "arrays-cycles-sub",
    "arrays-cycles-sub": "arrays-cycles-sub",
    "dp-l1": "dp-state-sub",
    "dp-l2": "dp-knapsack-sub",
    "dp-l3": "dp-sequence-sub",
    "stack-l1": "stack-fundamental-sub",
    "stack-l2": "stack-monotonic-sub",
    "stack-l3": "queue-monotonic-sub",
    "binary-search": "bs-blueprint",
    "bs-l1": "bs-arrays-sub",
    "bs-l2": "bs-rotated-sub",
    "bs-l3": "bs-answer-sub",
    "union-find": "uf-blueprint",
    "uf-l1": "uf-components-sub",
    "uf-l2": "uf-advanced-sub",
    "special-algorithms": "special-blueprint",
    "spl-algo": "special-blueprint",
    "special-l1": "special-kmp-sub",
    "kmp": "special-kmp-sub",
    "intervals": "intervals-blueprint",
    "intervals-l1": "intervals-merge-sub",
    "intervals-l2": "intervals-scheduling-sub",
    "intervals-l3": "intervals-sweepline-sub",
    "intervals-blueprint": "intervals-blueprint",
    "intervals-merge-sub": "intervals-merge-sub",
    "intervals-scheduling-sub": "intervals-scheduling-sub",
    "intervals-sweepline-sub": "intervals-sweepline-sub",
    "intervals-reference": "intervals-reference",
    "advanced-python": "python-blueprint",
    "advanced-python-3": "python-blueprint",
    "python": "python-blueprint",
    "python-blueprint": "python-blueprint",
    "python-l1": "python-ordered-dict-sub",
    "python-ordered-dict": "python-ordered-dict-sub",
    "python-ordered-dict-sub": "python-ordered-dict-sub",
    "python-l2": "python-sorted-containers-sub",
    "python-sorted-containers": "python-sorted-containers-sub",
    "python-sorted-containers-sub": "python-sorted-containers-sub",
    "python-sorted-dict": "python-sorted-containers-sub",
    "python-sorted-set": "python-sorted-containers-sub",
    "python-l3": "python-collections-sub",
    "python-collections": "python-collections-sub",
    "python-collections-sub": "python-collections-sub",
    "python-counter": "python-collections-sub",
    "python-defaultdict": "python-collections-sub",
    "python-l4": "python-quirks-sub",
    "python-quirks": "python-quirks-sub",
    "python-quirks-sub": "python-quirks-sub",
    "python-regex": "python-quirks-sub",
    "python-reference": "python-reference",
    "range-queries": "range-queries-blueprint",
    "range-queries-blueprint": "range-queries-blueprint",
    "range-l1": "range-segment-tree-sub",
    "range-segment-tree": "range-segment-tree-sub",
    "range-segment-tree-sub": "range-segment-tree-sub",
    "segment-tree": "range-segment-tree-sub",
    "range-l2": "range-fenwick-tree-sub",
    "range-fenwick-tree": "range-fenwick-tree-sub",
    "range-fenwick-tree-sub": "range-fenwick-tree-sub",
    "fenwick-tree": "range-fenwick-tree-sub",
    "bit": "range-fenwick-tree-sub",
    "range-l3": "range-sqrt-decomp-sub",
    "range-sqrt-decomp": "range-sqrt-decomp-sub",
    "range-sqrt-decomp-sub": "range-sqrt-decomp-sub",
    "sqrt-decomposition": "range-sqrt-decomp-sub",
    "range-queries-reference": "range-queries-reference",
    "range-reference": "range-queries-reference"
  };

  const showPage = (rawTargetId, updateUrl = true, subTargetId = null) => {
    let targetId = pageAliases[rawTargetId] || rawTargetId;
    let targetPage = document.getElementById(targetId);

    // Fallback if targetPage doesn't exist
    if (!targetPage || !targetPage.classList.contains("page-view")) {
      targetId = "arrays-blueprint";
      targetPage = document.getElementById(targetId);
    }

    // Hide all pages, show target page
    pages.forEach((page) => {
      const isActive = page.id === targetId;
      page.classList.toggle("active", isActive);
      page.setAttribute("aria-hidden", isActive ? "false" : "true");
    });

    // Pause KMP simulator if switching to another page view
    if (targetId !== "special-kmp-sub") {
      window.pauseKmpSimulator?.();
    }

    // Reset window scroll to top
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    // Update breadcrumb in topbar
    if (currentTopic && targetPage) {
      const topicTitle = targetPage.dataset.topicTitle || "DSA";
      const pageTitle = targetPage.dataset.pageTitle || "";
      if (pageTitle) {
        currentTopic.innerHTML = `<span class="breadcrumb-category">${topicTitle}</span><span class="breadcrumb-divider" aria-hidden="true"><svg class="breadcrumb-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></span><span class="breadcrumb-page">${pageTitle}</span>`;
      } else {
        currentTopic.innerHTML = `<span class="breadcrumb-category">${topicTitle}</span>`;
      }
    }

    // Update active state in sidebar nav items
    navItems.forEach((item) => {
      const href = item.getAttribute("href");
      const targetSub = item.dataset.targetSub;
      const isActive = (href === `#${targetId}` && (!subTargetId || targetSub === subTargetId)) ||
                       (!subTargetId && href === `#${targetId}`);

      item.classList.toggle("active", isActive);
      item.setAttribute("aria-current", isActive ? "page" : "false");

      // If active, ensure all ancestor tree nodes are expanded
      if (isActive) {
        let parentNode = item.closest(".tree-node");
        while (parentNode) {
          parentNode.classList.add("expanded");
          parentNode = parentNode.parentElement?.closest(".tree-node");
        }
      }
    });

    // Handle subTargetId highlighting within page if specified
    if (subTargetId) {
      const subElem = document.getElementById(subTargetId);
      if (subElem) {
        document.querySelectorAll(".technique-card.highlighted, .pattern-card.highlighted").forEach((c) => c.classList.remove("highlighted"));
        subElem.classList.add("highlighted");
        subElem.scrollIntoView({ behavior: "smooth", block: "center" });
        window.setTimeout(() => {
          subElem.classList.remove("highlighted");
        }, 2200);
      }
    }

    if (updateUrl) {
      const newHash = subTargetId ? `#${targetId}?sub=${subTargetId}` : `#${targetId}`;
      history.replaceState(null, "", newHash);
    }

    closeSidebar();
  };

  // Toggle tree node expansion
  document.querySelectorAll(".tree-toggle").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const node = btn.closest(".tree-node");
      if (node) {
        node.classList.toggle("expanded");
      }
    });
  });

  // Nav item click handler
  navItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const href = item.getAttribute("href");
      if (!href) return;
      const targetId = href.slice(1);
      const subTargetId = item.dataset.targetSub || null;
      showPage(targetId, true, subTargetId);
    });
  });


  // Pattern reference back-links
  document.querySelectorAll(".pattern-ref-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const href = link.getAttribute("href");
      if (!href) return;
      const subTargetId = link.dataset.targetSub || null;
      showPage(href.slice(1), true, subTargetId);
    });
  });

  // Mobile menu toggle & backdrop dismissal
  menuButton?.addEventListener("click", toggleSidebar);
  sidebarBackdrop?.addEventListener("click", closeSidebar);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && sidebar?.classList.contains("open")) {
      closeSidebar();
    }
  });

  // Copy button logic (preserves file:// fallback)
  const copyText = async (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const helper = document.createElement("textarea");
    helper.value = text;
    helper.setAttribute("readonly", "");
    helper.style.position = "fixed";
    helper.style.opacity = "0";
    document.body.appendChild(helper);
    helper.select();
    const copied = document.execCommand("copy");
    helper.remove();
    if (!copied) throw new Error("Copy unavailable");
  };

  document.querySelectorAll(".copy-button").forEach((button) => {
    button.addEventListener("click", async () => {
      const code = document.getElementById(button.dataset.code);
      if (!code) return;

      const lineNodes = [...code.querySelectorAll(".line-text")];
      const text = lineNodes.length
        ? lineNodes.map((line) => line.innerText).join("\n")
        : code.innerText;

      try {
        await copyText(text);
        const original = button.innerHTML;
        button.innerHTML = "<span>✓</span> Copied";
        button.classList.add("copied");
        window.setTimeout(() => {
          button.innerHTML = original;
          button.classList.remove("copied");
        }, 1400);
      } catch {
        button.textContent = "Copy unavailable";
      }
    });
  });

  // Handle URL hash routing and browser history navigation
  const handleHash = () => {
    const rawHash = window.location.hash.slice(1);
    if (!rawHash) {
      showPage("arrays-blueprint", false);
      return;
    }
    const [pageId, query] = rawHash.split("?");
    let sub = null;
    if (query) {
      const params = new URLSearchParams(query);
      sub = params.get("sub");
    }
    showPage(pageId, false, sub);
  };

  /* =========================================================================
     LIVE INTERACTIVE KMP SEARCH SIMULATION ENGINE
     ========================================================================= */
  const initKmpSimulator = () => {
    const simRoot = document.getElementById("kmp-interactive-sim");
    if (!simRoot) return;

    const presetSelect = document.getElementById("sim-preset-select");
    const speedSelect = document.getElementById("sim-speed-select");
    const customBar = document.getElementById("sim-custom-bar");
    const inputTxt = document.getElementById("sim-input-txt");
    const inputPat = document.getElementById("sim-input-pat");
    const btnLoad = document.getElementById("sim-btn-load");

    const phaseBadge = document.getElementById("sim-phase-badge");
    const pointersVal = document.getElementById("sim-pointers-val");
    const offsetVal = document.getElementById("sim-offset-val");
    const matchesVal = document.getElementById("sim-matches-val");
    const stepVal = document.getElementById("sim-step-val");

    const viewport = document.getElementById("sim-viewport");
    const rowIndices = document.getElementById("sim-row-indices");
    const rowTxtPtr = document.getElementById("sim-row-txt-ptr");
    const rowTxtCells = document.getElementById("sim-row-txt-cells");
    const rowPatPtr = document.getElementById("sim-row-pat-ptr");
    const patSlider = document.getElementById("sim-pat-slider");
    const rowPatCells = document.getElementById("sim-row-pat-cells");
    const rowLpsCells = document.getElementById("sim-row-lps-cells");

    const expIcon = document.getElementById("sim-explainer-icon");
    const expTitle = document.getElementById("sim-explainer-title");
    const expDesc = document.getElementById("sim-explainer-desc");

    const btnReset = document.getElementById("sim-btn-reset");
    const btnPrev = document.getElementById("sim-btn-prev");
    const btnPlay = document.getElementById("sim-btn-play");
    const btnNext = document.getElementById("sim-btn-next");

    const presets = {
      classic: {
        txt: "ABABDABACDABABCABAB",
        pat: "ABABCABAB"
      },
      overlapping: {
        txt: "AABAACAADAABAABA",
        pat: "AABAABA"
      },
      periodic: {
        txt: "ABCDABDABCDABCDABDE",
        pat: "ABCDABD"
      }
    };

    let currentTxt = presets.classic.txt;
    let currentPat = presets.classic.pat;
    let lpsTable = [];
    let traceSteps = [];
    let currentStepIdx = 0;
    let isPlaying = false;
    let playTimer = null;
    let speedMs = 700;

    const computeLps = (pat) => {
      const lps = new Array(pat.length).fill(0);
      let k = 0, i = 1;
      while (i < pat.length) {
        if (pat[i] === pat[k]) {
          k++;
          lps[i] = k;
          i++;
        } else if (k > 0) {
          k = lps[k - 1];
        } else {
          i++;
        }
      }
      return lps;
    };

    const buildTrace = (txt, pat) => {
      const lps = computeLps(pat);
      const steps = [];
      let i = 0, j = 0;
      const matches = [];
      let stepNum = 0;

      steps.push({
        stepNum: 0,
        type: "INIT",
        i: 0,
        j: 0,
        shift: 0,
        charTxt: txt[0],
        charPat: pat[0],
        lpsLookup: null,
        matches: [],
        title: "Ready to Scan",
        desc: `Pattern initialized at text index 0. Precomputed LPS failure table: [${lps.join(", ")}]. Click <strong>Play</strong> or <strong>Step ▶</strong> to begin.`
      });

      while (i < txt.length) {
        stepNum++;
        const currI = i;
        const currJ = j;
        const shift = currI - currJ;

        if (txt[i] === pat[j]) {
          const isFullMatch = (j === pat.length - 1);
          if (isFullMatch) {
            matches.push(i - j);
            const nextJ = lps[j];
            const nextI = i + 1;
            steps.push({
              stepNum,
              type: "FOUND",
              i: currI,
              j: currJ,
              shift,
              charTxt: txt[currI],
              charPat: pat[currJ],
              lpsLookup: { idx: j, val: nextJ },
              matches: [...matches],
              nextI,
              nextJ,
              title: `🎉 Full Match Found at Index ${currI - currJ}!`,
              desc: `All ${pat.length} characters matched! <code>txt[${currI - currJ}..${currI}]</code> == <code>"${pat}"</code>. To continue searching for further matches without rewinding <code>i</code>, KMP queries <code>lps[${j}] = ${nextJ}</code>, setting <code>j = ${nextJ}</code>.`
            });
            i = nextI;
            j = nextJ;
          } else {
            const nextI = i + 1;
            const nextJ = j + 1;
            steps.push({
              stepNum,
              type: "MATCH",
              i: currI,
              j: currJ,
              shift,
              charTxt: txt[currI],
              charPat: pat[currJ],
              lpsLookup: null,
              matches: [...matches],
              nextI,
              nextJ,
              title: `✅ Character Match: '${txt[currI]}'`,
              desc: `<code>txt[${currI}]</code> ('${txt[currI]}') == <code>pat[${currJ}]</code> ('${pat[currJ]}'). Match streak extended to ${currJ + 1} character(s). Advancing both pointers to <code>i = ${nextI}</code>, <code>j = ${nextJ}</code>.`
            });
            i = nextI;
            j = nextJ;
          }
        } else {
          if (j > 0) {
            const lpsIdx = j - 1;
            const nextJ = lps[lpsIdx];
            const nextI = i;
            const slideAmount = currJ - nextJ;
            steps.push({
              stepNum,
              type: "FALLBACK",
              i: currI,
              j: currJ,
              shift,
              charTxt: txt[currI],
              charPat: pat[currJ],
              lpsLookup: { idx: lpsIdx, val: nextJ },
              matches: [...matches],
              nextI,
              nextJ,
              title: `⚡ Mismatch at j = ${currJ} → LPS Rollback`,
              desc: `Mismatch: <code>txt[${currI}]</code> ('${txt[currI]}') &ne; <code>pat[${currJ}]</code> ('${pat[currJ]}'). Since ${currJ} char(s) already matched, query <code>lps[${lpsIdx}] = ${nextJ}</code>. Prefix of length ${nextJ} matches the suffix! Pointer <code>i = ${currI}</code> <strong>never rewinds</strong>. Pattern slides right by ${slideAmount} cell(s), setting <code>j = ${nextJ}</code>.`
            });
            j = nextJ;
          } else {
            const nextI = i + 1;
            const nextJ = 0;
            steps.push({
              stepNum,
              type: "ADVANCE_I",
              i: currI,
              j: currJ,
              shift,
              charTxt: txt[currI],
              charPat: pat[currJ],
              lpsLookup: null,
              matches: [...matches],
              nextI,
              nextJ,
              title: `⏩ Mismatch at j = 0 → Advance Text Pointer`,
              desc: `Mismatch at start of pattern: <code>txt[${currI}]</code> ('${txt[currI]}') &ne; <code>pat[0]</code> ('${pat[0]}'). Zero characters matched. Advancing text pointer <code>i</code> from ${currI} to ${nextI}. Pattern slides right by 1 cell.`
            });
            i = nextI;
          }
        }
      }

      steps.push({
        stepNum: stepNum + 1,
        type: "DONE",
        i: txt.length,
        j,
        shift: txt.length - j,
        charTxt: "",
        charPat: "",
        lpsLookup: null,
        matches: [...matches],
        title: "🏁 Scan Complete",
        desc: `KMP traversal finished! Scanned all ${txt.length} text characters with <strong>zero rewinds</strong>. Found ${matches.length} occurrence(s) at start index: [${matches.join(", ") || "none"}].`
      });

      return { lps, steps };
    };

    const buildBoardDom = () => {
      rowIndices.innerHTML = "";
      rowTxtCells.innerHTML = "";
      rowPatCells.innerHTML = "";
      rowLpsCells.innerHTML = "";
      rowTxtPtr.innerHTML = "";
      rowPatPtr.innerHTML = "";

      for (let idx = 0; idx < currentTxt.length; idx++) {
        const idxCell = document.createElement("div");
        idxCell.className = "sim-idx-cell";
        idxCell.id = `sim-idx-${idx}`;
        idxCell.textContent = idx;
        rowIndices.appendChild(idxCell);

        const txtCell = document.createElement("div");
        txtCell.className = "sim-cell is-default";
        txtCell.id = `sim-txt-${idx}`;
        txtCell.textContent = currentTxt[idx];
        rowTxtCells.appendChild(txtCell);
      }

      for (let jdx = 0; jdx < currentPat.length; jdx++) {
        const patCell = document.createElement("div");
        patCell.className = "sim-cell is-default";
        patCell.id = `sim-pat-${jdx}`;
        patCell.textContent = currentPat[jdx];
        rowPatCells.appendChild(patCell);

        const lpsCell = document.createElement("div");
        lpsCell.className = "sim-lps-cell";
        lpsCell.id = `sim-lps-${jdx}`;
        lpsCell.textContent = lpsTable[jdx] !== undefined ? lpsTable[jdx] : 0;
        lpsCell.title = `lps[${jdx}] = ${lpsTable[jdx]}`;
        rowLpsCells.appendChild(lpsCell);
      }

      rowTxtPtr.innerHTML = `<div class="sim-ptr ptr-txt" id="ptr-txt-arrow" style="left: 18px">▼ i=0</div>`;
      rowPatPtr.innerHTML = `<div class="sim-ptr ptr-pat" id="ptr-pat-arrow" style="left: 18px">▲ j=0</div>`;
    };

    const renderStep = (idx) => {
      currentStepIdx = Math.max(0, Math.min(idx, traceSteps.length - 1));
      const step = traceSteps[currentStepIdx];
      const CELL_PITCH = 40;

      stepVal.textContent = `${currentStepIdx} / ${traceSteps.length - 1}`;
      pointersVal.textContent = (step.type === "DONE")
        ? `i = ${step.i} (End), j = ${step.j}`
        : `i = ${step.i}, j = ${step.j}`;
      offsetVal.textContent = step.shift;
      matchesVal.textContent = step.matches.length ? `[${step.matches.join(", ")}]` : "None";

      phaseBadge.className = "tele-chip-val";
      if (step.type === "INIT") {
        phaseBadge.textContent = "READY";
      } else if (step.type === "MATCH") {
        phaseBadge.classList.add("phase-match");
        phaseBadge.textContent = "MATCH";
      } else if (step.type === "FALLBACK") {
        phaseBadge.classList.add("phase-fallback");
        phaseBadge.textContent = "LPS ROLLBACK";
      } else if (step.type === "ADVANCE_I") {
        phaseBadge.classList.add("phase-advance");
        phaseBadge.textContent = "ADVANCE i";
      } else if (step.type === "FOUND") {
        phaseBadge.classList.add("phase-found");
        phaseBadge.textContent = "MATCH FOUND!";
      } else if (step.type === "DONE") {
        phaseBadge.classList.add("phase-done");
        phaseBadge.textContent = "FINISHED";
      }

      expTitle.textContent = step.title;
      expDesc.innerHTML = step.desc;
      if (step.type === "MATCH" || step.type === "FOUND") {
        expIcon.textContent = "✅";
      } else if (step.type === "FALLBACK") {
        expIcon.textContent = "⚡";
      } else if (step.type === "ADVANCE_I") {
        expIcon.textContent = "⏩";
      } else if (step.type === "DONE") {
        expIcon.textContent = "🏁";
      } else {
        expIcon.textContent = "💡";
      }

      const shiftPx = step.shift * CELL_PITCH;
      patSlider.style.transform = `translateX(${shiftPx}px)`;

      const ptrTxt = document.getElementById("ptr-txt-arrow");
      const ptrPat = document.getElementById("ptr-pat-arrow");
      const activeTxtPos = Math.min(step.i, currentTxt.length - 1) * CELL_PITCH + 18;
      const activePatPos = (step.shift + Math.min(step.j, currentPat.length - 1)) * CELL_PITCH + 18;

      if (ptrTxt) {
        ptrTxt.style.left = `${activeTxtPos}px`;
        ptrTxt.textContent = `▼ i=${step.i}`;
        ptrTxt.style.display = (step.type === "DONE") ? "none" : "inline-flex";
      }
      if (ptrPat) {
        ptrPat.style.left = `${activePatPos}px`;
        ptrPat.textContent = `▲ j=${step.j}`;
        ptrPat.style.display = (step.type === "DONE") ? "none" : "inline-flex";
      }

      for (let t = 0; t < currentTxt.length; t++) {
        const cell = document.getElementById(`sim-txt-${t}`);
        const idxElem = document.getElementById(`sim-idx-${t}`);
        if (cell) cell.className = "sim-cell is-default";
        if (idxElem) idxElem.classList.remove("is-active-idx");
      }
      for (let p = 0; p < currentPat.length; p++) {
        const cell = document.getElementById(`sim-pat-${p}`);
        const lpsCell = document.getElementById(`sim-lps-${p}`);
        if (cell) cell.className = "sim-cell is-default";
        if (lpsCell) lpsCell.classList.remove("lps-lookup-active");
      }

      if (step.i < currentTxt.length) {
        const activeIdxElem = document.getElementById(`sim-idx-${step.i}`);
        if (activeIdxElem) activeIdxElem.classList.add("is-active-idx");
      }

      if (step.type !== "DONE" && step.type !== "INIT") {
        const startMatch = step.shift;
        for (let m = 0; m < step.j; m++) {
          const tIdx = startMatch + m;
          const txtCell = document.getElementById(`sim-txt-${tIdx}`);
          const patCell = document.getElementById(`sim-pat-${m}`);
          if (txtCell) txtCell.className = "sim-cell is-matched";
          if (patCell) patCell.className = "sim-cell is-matched";
        }
      }

      if (step.type === "MATCH") {
        const txtCell = document.getElementById(`sim-txt-${step.i}`);
        const patCell = document.getElementById(`sim-pat-${step.j}`);
        if (txtCell) txtCell.className = "sim-cell is-matched is-testing";
        if (patCell) patCell.className = "sim-cell is-matched is-testing";
      } else if (step.type === "FALLBACK") {
        const txtCell = document.getElementById(`sim-txt-${step.i}`);
        const patCell = document.getElementById(`sim-pat-${step.j}`);
        if (txtCell) txtCell.className = "sim-cell is-mismatch";
        if (patCell) patCell.className = "sim-cell is-mismatch";
        if (step.lpsLookup && step.lpsLookup.idx !== undefined) {
          const lpsTarget = document.getElementById(`sim-lps-${step.lpsLookup.idx}`);
          if (lpsTarget) lpsTarget.classList.add("lps-lookup-active");
        }
      } else if (step.type === "ADVANCE_I") {
        const txtCell = document.getElementById(`sim-txt-${step.i}`);
        const patCell = document.getElementById(`sim-pat-${step.j}`);
        if (txtCell) txtCell.className = "sim-cell is-mismatch";
        if (patCell) patCell.className = "sim-cell is-dim";
      } else if (step.type === "FOUND") {
        const matchStart = step.shift;
        for (let m = 0; m < currentPat.length; m++) {
          const txtCell = document.getElementById(`sim-txt-${matchStart + m}`);
          const patCell = document.getElementById(`sim-pat-${m}`);
          if (txtCell) txtCell.className = "sim-cell is-found";
          if (patCell) patCell.className = "sim-cell is-found";
        }
        if (step.lpsLookup && step.lpsLookup.idx !== undefined) {
          const lpsTarget = document.getElementById(`sim-lps-${step.lpsLookup.idx}`);
          if (lpsTarget) lpsTarget.classList.add("lps-lookup-active");
        }
      } else if (step.type === "DONE") {
        step.matches.forEach((mStart) => {
          for (let m = 0; m < currentPat.length; m++) {
            const txtCell = document.getElementById(`sim-txt-${mStart + m}`);
            if (txtCell) txtCell.className = "sim-cell is-found";
          }
        });
      }

      if (viewport) {
        const activeX = (step.type === "DONE" ? currentTxt.length : step.i) * CELL_PITCH;
        const targetScroll = activeX - viewport.clientWidth / 2 + 30;
        viewport.scrollTo({
          left: Math.max(0, targetScroll),
          behavior: "smooth"
        });
      }

      btnPrev.disabled = (currentStepIdx === 0);
      btnNext.disabled = (currentStepIdx === traceSteps.length - 1);
    };

    const stopPlayback = () => {
      if (playTimer) {
        clearInterval(playTimer);
        playTimer = null;
      }
      isPlaying = false;
      btnPlay.classList.remove("is-playing");
      btnPlay.textContent = "▶ Play";
    };

    window.pauseKmpSimulator = stopPlayback;

    const startPlayback = () => {
      if (currentStepIdx >= traceSteps.length - 1) {
        currentStepIdx = 0;
        renderStep(0);
      }
      isPlaying = true;
      btnPlay.classList.add("is-playing");
      btnPlay.textContent = "⏸ Pause";
      playTimer = setInterval(() => {
        if (currentStepIdx < traceSteps.length - 1) {
          renderStep(currentStepIdx + 1);
        } else {
          stopPlayback();
        }
      }, speedMs);
    };

    const togglePlay = () => {
      if (isPlaying) {
        stopPlayback();
      } else {
        startPlayback();
      }
    };

    const loadScenario = (txt, pat) => {
      stopPlayback();
      currentTxt = (txt || "").trim().toUpperCase();
      currentPat = (pat || "").trim().toUpperCase();
      if (!currentTxt || !currentPat) return;

      const trace = buildTrace(currentTxt, currentPat);
      lpsTable = trace.lps;
      traceSteps = trace.steps;

      buildBoardDom();
      renderStep(0);
    };

    btnPlay.addEventListener("click", togglePlay);
    btnNext.addEventListener("click", () => {
      stopPlayback();
      if (currentStepIdx < traceSteps.length - 1) {
        renderStep(currentStepIdx + 1);
      }
    });
    btnPrev.addEventListener("click", () => {
      stopPlayback();
      if (currentStepIdx > 0) {
        renderStep(currentStepIdx - 1);
      }
    });
    btnReset.addEventListener("click", () => {
      stopPlayback();
      renderStep(0);
    });

    speedSelect.addEventListener("change", (e) => {
      speedMs = parseInt(e.target.value, 10) || 700;
      if (isPlaying) {
        stopPlayback();
        startPlayback();
      }
    });

    presetSelect.addEventListener("change", (e) => {
      const val = e.target.value;
      if (val === "custom") {
        customBar.style.display = "flex";
      } else {
        customBar.style.display = "none";
        const preset = presets[val] || presets.classic;
        inputTxt.value = preset.txt;
        inputPat.value = preset.pat;
        loadScenario(preset.txt, preset.pat);
      }
    });

    btnLoad.addEventListener("click", () => {
      const t = inputTxt.value.trim();
      const p = inputPat.value.trim();
      if (t && p) {
        loadScenario(t, p);
      }
    });

    loadScenario(presets.classic.txt, presets.classic.pat);
  };

  initKmpSimulator();

  /* =========================================================================
     LIVE INTERACTIVE ORDEREDDICT DLL & EVICTION SIMULATOR ENGINE
     ========================================================================= */
  const initOrderedDictSimulator = () => {
    const simRoot = document.getElementById("ordered-dict-sim");
    if (!simRoot) return;

    const chainEl = document.getElementById("od-dll-chain");
    const countVal = document.getElementById("od-count-val");
    const capVal = document.getElementById("od-cap-val");
    const headVal = document.getElementById("od-head-val");
    const tailVal = document.getElementById("od-tail-val");
    const logEl = document.getElementById("od-log-text");
    const keySelect = document.getElementById("od-key-select");
    const inputKey = document.getElementById("od-input-key");
    const inputVal = document.getElementById("od-input-val");
    const presetSelect = document.getElementById("od-preset-select");

    const btnMoveEnd = document.getElementById("od-btn-move-end");
    const btnMoveFront = document.getElementById("od-btn-move-front");
    const btnPopLast = document.getElementById("od-btn-pop-last");
    const btnPopFirst = document.getElementById("od-btn-pop-first");
    const btnPut = document.getElementById("od-btn-put");
    const btnReset = document.getElementById("od-btn-reset");

    let capacity = 4;
    let items = [
      { key: "alpha", val: "10" },
      { key: "beta", val: "20" },
      { key: "gamma", val: "30" }
    ];

    const setLog = (msg, isAlert = false) => {
      if (!logEl) return;
      logEl.innerHTML = isAlert
        ? `<span style="color: #f87171; font-weight: bold;">⚠</span> ${msg}`
        : `<span style="color: var(--easy); font-weight: bold;">✓</span> ${msg}`;
    };

    const updateControls = () => {
      if (keySelect) {
        keySelect.innerHTML = items.length === 0
          ? `<option value="">(Empty)</option>`
          : items.map(it => `<option value="${it.key}">${it.key}</option>`).join("");
      }
      if (countVal) countVal.textContent = `${items.length} / ${capacity}`;
      if (capVal) capVal.textContent = `${capacity}`;
      if (headVal) headVal.textContent = items.length ? `'${items[0].key}'` : "None";
      if (tailVal) tailVal.textContent = items.length ? `'${items[items.length - 1].key}'` : "None";
    };

    const render = (highlightKey = null) => {
      if (!chainEl) return;
      if (items.length === 0) {
        chainEl.innerHTML = `<div style="color: var(--muted); font-style: italic; padding: 1rem;">OrderedDict is currently empty. Use the input below to insert keys!</div>`;
        updateControls();
        return;
      }

      let html = "";
      items.forEach((item, idx) => {
        const isHead = idx === 0;
        const isTail = idx === items.length - 1;
        const isHighlight = item.key === highlightKey;

        let roleClass = "od-role-mid";
        let roleText = `Node #${idx}`;
        let cardClass = "od-node-card";

        if (isHead && isTail) {
          roleClass = "od-role-head";
          roleText = "Head & Tail";
          cardClass += " active-head active-tail";
        } else if (isHead) {
          roleClass = "od-role-head";
          roleText = "Head (LRU)";
          cardClass += " active-head";
        } else if (isTail) {
          roleClass = "od-role-tail";
          roleText = "Tail (MRU)";
          cardClass += " active-tail";
        }

        if (isHighlight) {
          cardClass += " flash-action";
        }

        html += `
          <div class="od-node-wrap" data-key="${item.key}" title="Click node to move_to_end('${item.key}')">
            <span class="od-node-role ${roleClass}">${roleText}</span>
            <div class="${cardClass}">
              <div class="od-node-key">'${item.key}'</div>
              <div class="od-node-val">val: ${item.val}</div>
            </div>
          </div>
        `;

        if (idx < items.length - 1) {
          html += `
            <div class="od-connector" aria-hidden="true">
              <span class="od-arrow-next">── next ──▶</span>
              <span class="od-arrow-prev">◀── prev ──</span>
            </div>
          `;
        }
      });

      chainEl.innerHTML = html;
      updateControls();
    };

    const moveToEnd = (key, last = true) => {
      const idx = items.findIndex(it => it.key === key);
      if (idx === -1) {
        setLog(`Key '${key}' not found in OrderedDict!`, true);
        return;
      }
      const [item] = items.splice(idx, 1);
      if (last) {
        items.push(item);
        setLog(`<code>d.move_to_end('${key}')</code>: Spliced node to TAIL (Most Recently Used / MRU).`);
      } else {
        items.unshift(item);
        setLog(`<code>d.move_to_end('${key}', False)</code>: Spliced node to HEAD (Least Recently Used / LRU).`);
      }
      render(key);
    };

    const popItem = (last = true) => {
      if (items.length === 0) {
        setLog(`<code>d.popitem()</code>: KeyError - OrderedDict is empty!`, true);
        return;
      }
      const popped = last ? items.pop() : items.shift();
      if (last) {
        setLog(`<code>d.popitem()</code>: Popped TAIL node ('${popped.key}', ${popped.val}) in O(1) LIFO order.`);
      } else {
        setLog(`<code>d.popitem(False)</code>: Popped HEAD node ('${popped.key}', ${popped.val}) in O(1) FIFO / LRU eviction!`);
      }
      render();
    };

    const putItem = (key, val) => {
      if (!key) return;
      const idx = items.findIndex(it => it.key === key);
      if (idx !== -1) {
        items[idx].val = val;
        const [updated] = items.splice(idx, 1);
        items.push(updated);
        setLog(`<code>d['${key}'] = ${val}</code>: Existing key updated &amp; refreshed to TAIL (MRU).`);
      } else {
        items.push({ key, val });
        if (items.length > capacity) {
          const evicted = items.shift();
          setLog(`<code>d['${key}'] = ${val}</code>: Capacity ${capacity} exceeded -> Evicted LRU HEAD ('${evicted.key}', ${evicted.val}) via <code>popitem(False)</code>!`, true);
        } else {
          setLog(`<code>d['${key}'] = ${val}</code>: Appended new node to TAIL in O(1) time.`);
        }
      }
      render(key);
    };

    chainEl?.addEventListener("click", (e) => {
      const nodeWrap = e.target.closest(".od-node-wrap");
      if (nodeWrap) {
        const key = nodeWrap.dataset.key;
        if (key) {
          moveToEnd(key, true);
        }
      }
    });

    btnMoveEnd?.addEventListener("click", () => {
      const k = keySelect?.value;
      if (k) moveToEnd(k, true);
    });

    btnMoveFront?.addEventListener("click", () => {
      const k = keySelect?.value;
      if (k) moveToEnd(k, false);
    });

    btnPopLast?.addEventListener("click", () => {
      popItem(true);
    });

    btnPopFirst?.addEventListener("click", () => {
      popItem(false);
    });

    btnPut?.addEventListener("click", () => {
      const k = inputKey?.value.trim() || `k${items.length + 1}`;
      const v = inputVal?.value.trim() || `${(items.length + 1) * 10}`;
      putItem(k, v);
      if (inputKey) inputKey.value = "";
    });

    presetSelect?.addEventListener("change", (e) => {
      const val = e.target.value;
      if (val === "lru") {
        capacity = 3;
        items = [
          { key: "A", val: "1" },
          { key: "B", val: "2" },
          { key: "C", val: "3" }
        ];
        setLog(`Loaded LRU Cache preset (Capacity: 3). Try inserting 'D' to see eviction!`);
      } else if (val === "fifo") {
        capacity = 5;
        items = [
          { key: "msg1", val: "100" },
          { key: "msg2", val: "200" },
          { key: "msg3", val: "300" }
        ];
        setLog(`Loaded FIFO stream preset. Use <code>popitem(False)</code> to consume in arrival order.`);
      } else if (val === "custom") {
        capacity = 4;
        items = [
          { key: "alpha", val: "10" },
          { key: "beta", val: "20" },
          { key: "gamma", val: "30" }
        ];
        setLog(`Reset to standard 3-node state.`);
      }
      render();
    });

    btnReset?.addEventListener("click", () => {
      capacity = 4;
      items = [
        { key: "alpha", val: "10" },
        { key: "beta", val: "20" },
        { key: "gamma", val: "30" }
      ];
      setLog(`OrderedDict simulator reset to initial state.`);
      render();
    });

    render();
  };

  initOrderedDictSimulator();

  const initRangeQuerySimulator = () => {
    const modeSelect = document.getElementById("rq-mode-select");
    const sizeVal = document.getElementById("rq-size-val");
    const modeLbl = document.getElementById("rq-mode-lbl");
    const resultVal = document.getElementById("rq-result-val");
    const opsVal = document.getElementById("rq-ops-val");
    const arrayCells = document.getElementById("rq-array-cells");
    const canvasEl = document.getElementById("rq-sim-canvas");
    const logEl = document.getElementById("rq-log-text");

    const inputQLeft = document.getElementById("rq-q-left");
    const inputQRight = document.getElementById("rq-q-right");
    const btnQuery = document.getElementById("rq-btn-query");

    const inputUIdx = document.getElementById("rq-u-idx");
    const inputUVal = document.getElementById("rq-u-val");
    const btnUpdate = document.getElementById("rq-btn-update");
    const btnReset = document.getElementById("rq-btn-reset");

    if (!canvasEl) return;

    let baseNums = [3, 2, 4, 5, 1, 6, 2, 8];
    let currentMode = "segtree";

    const setLog = (msg) => {
      if (logEl) logEl.innerHTML = msg;
    };

    const renderArrayCells = (highlightIndices = []) => {
      if (!arrayCells) return;
      arrayCells.innerHTML = baseNums.map((val, idx) => {
        const inQuery = highlightIndices.includes(idx);
        return `
          <div class="rq-cell ${inQuery ? 'in-query' : ''}" id="rq-cell-${idx}">
            <span class="rq-cell-idx">#${idx}</span>
            <span class="rq-cell-val">${val}</span>
          </div>
        `;
      }).join("");
    };

    const renderSegTree = (queryResult = null) => {
      const n = baseNums.length;
      const tree = new Array(2 * n).fill(0);
      for (let i = 0; i < n; i++) tree[n + i] = baseNums[i];
      for (let i = n - 1; i > 0; i--) tree[i] = tree[2 * i] + tree[2 * i + 1];

      let hitNodes = queryResult ? (queryResult.nodes || []) : [];
      let updatedNode = queryResult ? queryResult.updated : null;

      const levels = [
        [1],
        [2, 3],
        [4, 5, 6, 7],
        [8, 9, 10, 11, 12, 13, 14, 15]
      ];

      const nodeRanges = {
        1: "[0..7]",
        2: "[0..3]", 3: "[4..7]",
        4: "[0..1]", 5: "[2..3]", 6: "[4..5]", 7: "[6..7]",
        8: "[0]", 9: "[1]", 10: "[2]", 11: "[3]", 12: "[4]", 13: "[5]", 14: "[6]", 15: "[7]"
      };

      let html = `<div style="font-size: 0.72rem; color: var(--muted); font-weight: 700; text-transform: uppercase;">2N Segment Tree Dyadic Intervals:</div>`;
      levels.forEach(lvl => {
        html += `<div class="rq-tree-level">`;
        lvl.forEach(nodeId => {
          const isHit = hitNodes.includes(nodeId);
          const isUpd = updatedNode === nodeId;
          html += `
            <div class="rq-tree-node ${isHit ? 'is-hit' : ''} ${isUpd ? 'is-updated' : ''}" id="rq-node-${nodeId}" title="Node ${nodeId} covering ${nodeRanges[nodeId]}">
              <div class="rq-tree-range">${nodeRanges[nodeId]}</div>
              <div class="rq-tree-val">${tree[nodeId]}</div>
              <div class="rq-tree-node-id">N:${nodeId}</div>
            </div>
          `;
        });
        html += `</div>`;
      });

      canvasEl.innerHTML = html;
      if (modeLbl) modeLbl.textContent = "Segment Tree (2N Array)";
    };

    const renderFenwick = (queryResult = null) => {
      const n = baseNums.length;
      const bit = new Array(n + 1).fill(0);
      for (let i = 0; i < n; i++) {
        let idx = i + 1;
        while (idx <= n) {
          bit[idx] += baseNums[i];
          idx += idx & (-idx);
        }
      }

      let posHits = queryResult ? (queryResult.posHits || []) : [];
      let negHits = queryResult ? (queryResult.negHits || []) : [];

      let html = `<div style="font-size: 0.72rem; color: var(--muted); font-weight: 700; text-transform: uppercase;">Fenwick BIT lowbit = x & (-x) Coverage Intervals:</div><div class="rq-bit-row">`;
      for (let i = 1; i <= n; i++) {
        const lowbit = i & (-i);
        const start = i - lowbit + 1;
        const isPos = posHits.includes(i);
        const isNeg = negHits.includes(i);
        html += `
          <div class="rq-bit-card ${isPos ? 'hit-pos' : ''} ${isNeg ? 'hit-neg' : ''}" title="BIT[${i}] covers [${start}..${i}]">
            <div style="font-size: 0.65rem; color: var(--faint);">lowbit: ${lowbit}</div>
            <div style="font-size: 0.66rem; color: var(--muted);">[${start}..${i}]</div>
            <div style="font-size: 0.95rem; font-weight: 700; color: #fff; margin: 0.2rem 0;">${bit[i]}</div>
            <div style="font-size: 0.62rem; color: var(--orange);">BIT[${i}]</div>
          </div>
        `;
      }
      html += `</div>`;
      canvasEl.innerHTML = html;
      if (modeLbl) modeLbl.textContent = "Fenwick Tree (BIT)";
    };

    const renderSqrt = (queryResult = null) => {
      const n = baseNums.length;
      const blockSize = 3;
      const numBlocks = Math.ceil(n / blockSize);
      const blocks = new Array(numBlocks).fill(0);
      for (let i = 0; i < n; i++) {
        blocks[Math.floor(i / blockSize)] += baseNums[i];
      }

      let partials = queryResult ? (queryResult.partials || []) : [];
      let fullBlocks = queryResult ? (queryResult.fullBlocks || []) : [];

      let html = `<div style="font-size: 0.72rem; color: var(--muted); font-weight: 700; text-transform: uppercase;">SQRT Decomposition (Block Size B = 3):</div><div class="rq-blocks-row">`;
      for (let b = 0; b < numBlocks; b++) {
        const startIdx = b * blockSize;
        const endIdx = Math.min(n - 1, (b + 1) * blockSize - 1);
        const isFull = fullBlocks.includes(b);

        html += `
          <div class="rq-block-card ${isFull ? 'is-full-hit' : ''}">
            <div class="rq-block-header">
              <span>Block #${b} [${startIdx}..${endIdx}]</span>
              <span style="color: var(--orange); font-weight: 700;">Sum: ${blocks[b]}</span>
            </div>
            <div class="rq-block-elems">
        `;

        for (let i = startIdx; i <= endIdx; i++) {
          const isPart = partials.includes(i);
          html += `
            <div class="rq-elem-chip ${isPart ? 'chip-partial' : ''}" title="nums[${i}] = ${baseNums[i]}">
              <span style="font-size: 0.62rem; color: var(--faint);">#${i}:</span> ${baseNums[i]}
            </div>
          `;
        }

        html += `</div></div>`;
      }
      html += `</div>`;
      canvasEl.innerHTML = html;
      if (modeLbl) modeLbl.textContent = "SQRT Decomposition";
    };

    const render = (queryResult = null) => {
      if (sizeVal) sizeVal.textContent = baseNums.length;
      let activeIndices = [];
      if (queryResult && queryResult.range) {
        const [l, r] = queryResult.range;
        for (let i = l; i <= r; i++) activeIndices.push(i);
      }
      renderArrayCells(activeIndices);

      if (currentMode === "segtree") renderSegTree(queryResult);
      else if (currentMode === "fenwick") renderFenwick(queryResult);
      else if (currentMode === "sqrt") renderSqrt(queryResult);
    };

    const handleQuery = () => {
      const qLeft = Math.max(0, Math.min(baseNums.length - 1, parseInt(inputQLeft?.value || "1", 10)));
      const qRight = Math.max(0, Math.min(baseNums.length - 1, parseInt(inputQRight?.value || "5", 10)));
      if (qLeft > qRight) {
        setLog(`<span style="color: #f87171; font-weight: bold;">⚠</span> Invalid Range: Left (${qLeft}) must be <= Right (${qRight})!`);
        return;
      }

      let totalSum = 0;
      for (let i = qLeft; i <= qRight; i++) totalSum += baseNums[i];
      if (resultVal) resultVal.textContent = `Sum = ${totalSum}`;

      if (currentMode === "segtree") {
        const n = baseNums.length;
        let left = qLeft + n, right = qRight + n;
        const chosenNodes = [];
        const logs = [];

        while (left <= right) {
          if (left % 2 === 1) {
            chosenNodes.push(left);
            logs.push(`Left ptr <code>${left}</code> is ODD (right-child) -> consumed canonical node <code>N:${left}</code>`);
            left++;
          }
          if (right % 2 === 0) {
            chosenNodes.push(right);
            logs.push(`Right ptr <code>${right}</code> is EVEN (left-child) -> consumed canonical node <code>N:${right}</code>`);
            right--;
          }
          left = Math.floor(left / 2);
          right = Math.floor(right / 2);
        }

        if (opsVal) opsVal.textContent = `${chosenNodes.length} Nodes (O(log n))`;
        setLog(`<strong>Range Query [${qLeft}, ${qRight}]:</strong> Decomposed into <strong>${chosenNodes.length}</strong> canonical segment tree nodes: <code>[${chosenNodes.map(id => 'N:'+id).join(', ')}]</code>.<br>${logs.join(' &bull; ')} &rarr; Total Sum = <strong>${totalSum}</strong>.`);
        render({ range: [qLeft, qRight], nodes: chosenNodes });
      } else if (currentMode === "fenwick") {
        const posHits = [];
        let idxR = qRight + 1;
        while (idxR > 0) {
          posHits.push(idxR);
          idxR -= idxR & (-idxR);
        }

        const negHits = [];
        let idxL = qLeft;
        while (idxL > 0) {
          negHits.push(idxL);
          idxL -= idxL & (-idxL);
        }

        if (opsVal) opsVal.textContent = `${posHits.length + negHits.length} BIT Lookups (O(log n))`;
        setLog(`<strong>Fenwick Range Query [${qLeft}, ${qRight}]:</strong> Inclusion-Exclusion <code>query(${qRight + 1}) - query(${qLeft})</code>.<br>Added BIT indices: <code>[${posHits.map(i => 'BIT['+i+']').join(', ')}]</code> &bull; Deducted BIT indices: <code>[${negHits.length ? negHits.map(i => 'BIT['+i+']').join(', ') : 'None'}]</code> &rarr; Total Sum = <strong>${totalSum}</strong>.`);
        render({ range: [qLeft, qRight], posHits, negHits });
      } else if (currentMode === "sqrt") {
        const blockSize = 3;
        const startBlock = Math.floor(qLeft / blockSize);
        const endBlock = Math.floor(qRight / blockSize);
        const partials = [];
        const fullBlocks = [];

        if (startBlock === endBlock) {
          for (let i = qLeft; i <= qRight; i++) partials.push(i);
        } else {
          for (let i = qLeft; i < (startBlock + 1) * blockSize; i++) partials.push(i);
          for (let b = startBlock + 1; b < endBlock; b++) fullBlocks.push(b);
          for (let i = endBlock * blockSize; i <= qRight; i++) partials.push(i);
        }

        if (opsVal) opsVal.textContent = `${partials.length} partial + ${fullBlocks.length} full blocks (O(√n))`;
        setLog(`<strong>SQRT Query [${qLeft}, ${qRight}]:</strong> Partial left elements: <code>[${partials.filter(i => Math.floor(i/blockSize) === startBlock).join(', ')}]</code> &bull; Full middle blocks: <code>[${fullBlocks.map(b => 'Block #'+b).join(', ') || 'None'}]</code> &bull; Partial right elements: <code>[${partials.filter(i => Math.floor(i/blockSize) === endBlock).join(', ')}]</code> &rarr; Total Sum = <strong>${totalSum}</strong>.`);
        render({ range: [qLeft, qRight], partials, fullBlocks });
      }
    };

    const handleUpdate = () => {
      const idx = Math.max(0, Math.min(baseNums.length - 1, parseInt(inputUIdx?.value || "3", 10)));
      const val = parseInt(inputUVal?.value || "10", 10);
      const oldVal = baseNums[idx];
      baseNums[idx] = val;

      setLog(`<code>nums[${idx}] = ${val}</code> (was ${oldVal}): Point update mutated base array. Observe how ancestors adjust in O(log n) or O(1)!`);
      render();

      const cell = document.getElementById(`rq-cell-${idx}`);
      if (cell) {
        cell.classList.add("cell-updated");
        setTimeout(() => cell.classList.remove("cell-updated"), 1500);
      }
    };

    modeSelect?.addEventListener("change", (e) => {
      currentMode = e.target.value;
      if (opsVal) opsVal.textContent = "Ready";
      if (resultVal) resultVal.textContent = "--";
      setLog(`Switched view to <strong>${currentMode.toUpperCase()}</strong>. Execute Query or Update to test!`);
      render();
    });

    btnQuery?.addEventListener("click", handleQuery);
    btnUpdate?.addEventListener("click", handleUpdate);
    btnReset?.addEventListener("click", () => {
      baseNums = [3, 2, 4, 5, 1, 6, 2, 8];
      if (inputQLeft) inputQLeft.value = "1";
      if (inputQRight) inputQRight.value = "5";
      if (inputUIdx) inputUIdx.value = "3";
      if (inputUVal) inputUVal.value = "10";
      if (opsVal) opsVal.textContent = "Ready";
      if (resultVal) resultVal.textContent = "--";
      setLog(`Reset array to default state <code>[3, 2, 4, 5, 1, 6, 2, 8]</code>.`);
      render();
    });

    render();
    handleQuery();
  };

  initRangeQuerySimulator();

  // Interactive Range Engine Decision Hub Pills
  const initRangeDecisionHub = () => {
    const pills = [...document.querySelectorAll(".rq-pill-btn")];
    const cards = [...document.querySelectorAll(".rq-decision-card")];
    if (!pills.length || !cards.length) return;

    pills.forEach((pill) => {
      pill.addEventListener("click", () => {
        pills.forEach((p) => p.classList.remove("active"));
        pill.classList.add("active");

        const targetEngine = pill.getAttribute("data-engine");
        cards.forEach((card) => {
          const cardEngine = card.getAttribute("data-engine-id");
          if (targetEngine === "all") {
            card.classList.remove("card-dimmed", "card-highlighted");
          } else if (cardEngine === targetEngine) {
            card.classList.remove("card-dimmed");
            card.classList.add("card-highlighted");
          } else {
            card.classList.remove("card-highlighted");
            card.classList.add("card-dimmed");
          }
        });
      });
    });
  };

  initRangeDecisionHub();


  window.addEventListener("hashchange", handleHash);
  handleHash();
})();
