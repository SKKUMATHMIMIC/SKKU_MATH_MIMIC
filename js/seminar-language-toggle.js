document.querySelectorAll("[data-language-toggle]").forEach((toggleRoot) => {
  const buttons = toggleRoot.querySelectorAll("[data-language-button]");
  const panels = document.querySelectorAll("[data-language-panel]");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.languageButton;

      buttons.forEach((item) => {
        const isActive = item === button;
        item.classList.toggle("is-active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });

      panels.forEach((panel) => {
        const isTarget = panel.dataset.languagePanel === target;
        panel.hidden = !isTarget;
      });
    });
  });
});
