(() => {
  "use strict";

  const nav = document.querySelector(".nav-links");
  if (!nav) return;
  if (document.body.classList.contains("home-page") || document.body.classList.contains("about-page")) {
    nav.classList.add("is-ready");
    return;
  }

  let trail = nav.querySelector(".liquid-trail");
  let thumb = nav.querySelector(".liquid-thumb");
  if (!trail || !thumb) {
    trail = document.createElement("span");
    trail.className = "liquid-trail";
    trail.setAttribute("aria-hidden", "true");
    thumb = document.createElement("span");
    thumb.className = "liquid-thumb";
    thumb.setAttribute("aria-hidden", "true");
    nav.prepend(thumb);
    nav.prepend(trail);
  }

  const links = [...nav.querySelectorAll("a")];
  const active = links.find((link) => link.classList.contains("active")) || links[0];
  const desktop = window.matchMedia("(min-width: 641px)");

  const move = (link, immediate = false) => {
    if (!link || !desktop.matches) return;
    const navRect = nav.getBoundingClientRect();
    const rect = link.getBoundingClientRect();
    const padX = 14;
    const padY = 8;
    const x = rect.left - navRect.left - padX;
    const y = rect.top - navRect.top - padY;
    const width = rect.width + padX * 2;
    const height = rect.height + padY * 2;
    const center = x + width / 2;
    const values = {
      "--liquid-x": `${x}px`,
      "--liquid-y": `${y}px`,
      "--liquid-w": `${width}px`,
      "--liquid-h": `${height}px`,
      "--thumb-light-x": `${Math.max(18, Math.min(82, center / navRect.width * 100))}%`
    };
    if (immediate) {
      thumb.style.transitionDuration = "0ms";
      trail.style.transitionDuration = "0ms";
    }
    Object.entries(values).forEach(([key, value]) => nav.style.setProperty(key, value));
    nav.classList.add("is-ready");
    if (immediate) {
      requestAnimationFrame(() => {
        thumb.style.transitionDuration = "";
        trail.style.transitionDuration = "";
      });
    }
  };

  links.forEach((link) => {
    link.addEventListener("pointerenter", () => move(link));
    link.addEventListener("focus", () => move(link));
  });
  nav.addEventListener("pointerleave", () => move(active));
  nav.addEventListener("pointermove", (event) => {
    const rect = nav.getBoundingClientRect();
    nav.style.setProperty("--nav-x", `${Math.max(0, Math.min(100, (event.clientX - rect.left) / rect.width * 100))}%`);
  }, { passive: true });
  window.addEventListener("resize", () => move(active, true), { passive: true });
  requestAnimationFrame(() => move(active, true));
})();
