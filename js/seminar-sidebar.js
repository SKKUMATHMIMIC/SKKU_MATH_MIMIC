document.querySelectorAll(".seminar-sidebar .season").forEach((season) => {
  const toggle = season.querySelector(".season-toggle");
  const items = season.querySelector(".season-items");

  if (!toggle || !items) {
    return;
  }

  toggle.addEventListener("click", () => {
    const isExpanded = toggle.getAttribute("aria-expanded") === "true";

    toggle.setAttribute("aria-expanded", String(!isExpanded));
    season.setAttribute("data-expanded", String(!isExpanded));
    items.style.display = isExpanded ? "none" : "block";
  });
});

document.querySelectorAll(".seminar-sidebar").forEach((sidebar) => {
  const mobileToggle = sidebar.querySelector(".sidebar-mobile-toggle");

  if (!mobileToggle) {
    return;
  }

  const setMobileCollapsed = (collapsed) => {
    sidebar.setAttribute("data-mobile-collapsed", String(collapsed));
    mobileToggle.setAttribute("aria-expanded", String(!collapsed));
  };

  const isCollapsed = sidebar.getAttribute("data-mobile-collapsed") === "true";
  setMobileCollapsed(isCollapsed);

  mobileToggle.addEventListener("click", () => {
    const current = sidebar.getAttribute("data-mobile-collapsed") === "true";
    setMobileCollapsed(!current);
  });

  const mediaQuery = window.matchMedia("(max-width: 900px)");

  const handleViewport = (event) => {
    if (event.matches) {
      const shouldCollapse = sidebar.getAttribute("data-mobile-collapsed") === "true";
      setMobileCollapsed(shouldCollapse);
      return;
    }

    setMobileCollapsed(false);
  };

  handleViewport(mediaQuery);

  if (typeof mediaQuery.addEventListener === "function") {
    mediaQuery.addEventListener("change", handleViewport);
  } else if (typeof mediaQuery.addListener === "function") {
    mediaQuery.addListener(handleViewport);
  }
});
