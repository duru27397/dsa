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
    "kmp": "special-kmp-sub"
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
      showPage(href.slice(1), true);
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

  window.addEventListener("hashchange", handleHash);
  handleHash();
})();
