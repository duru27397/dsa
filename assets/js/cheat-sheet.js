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
    "uf-l2": "uf-advanced-sub"
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
        document.querySelectorAll(".technique-card.highlighted").forEach((c) => c.classList.remove("highlighted"));
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

  window.addEventListener("hashchange", handleHash);
  handleHash();
})();
