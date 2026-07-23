(() => {
  "use strict";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const desktop = window.matchMedia("(min-width: 961px)");

  const nav = document.querySelector(".nav-links");
  const navThumb = nav?.querySelector(".liquid-thumb");
  const navTrail = nav?.querySelector(".liquid-trail");
  const navLinks = nav ? [...nav.querySelectorAll("a")] : [];
  const currentNav = navLinks.find((link) => link.classList.contains("active"));
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const liquid = {
    x: 6, y: 6, w: 72, h: 42,
    tx: 6, ty: 6, tw: 72, th: 42,
    vx: 0, vy: 0, active: false
  };

  const renderNavLiquid = () => {
    if (!navThumb || !navTrail) return;
    const speed = Math.min(42, Math.hypot(liquid.vx, liquid.vy));
    const thumbValues = {
      "--liquid-x": `${liquid.x}px`,
      "--liquid-y": `${liquid.y}px`,
      "--liquid-w": `${liquid.w}px`,
      "--liquid-h": `${liquid.h}px`,
      "--liquid-sx": (1 + speed * 0.018).toFixed(3),
      "--liquid-sy": Math.max(0.86, 1 - speed * 0.007).toFixed(3)
    };
    Object.entries(thumbValues).forEach(([key, value]) => {
      navThumb.style.setProperty(key, value);
    });
    navTrail.style.setProperty("--liquid-x", `${liquid.x - liquid.vx * 2.3}px`);
    navTrail.style.setProperty("--liquid-y", `${liquid.y - liquid.vy * 1.5}px`);
    navTrail.style.setProperty("--liquid-w", `${liquid.w + speed * 4}px`);
    navTrail.style.setProperty("--liquid-h", `${liquid.h}px`);
    navTrail.style.setProperty("--liquid-sx", (1 + speed * 0.022).toFixed(3));
    navTrail.style.setProperty("--liquid-sy", Math.max(0.82, 1 - speed * 0.009).toFixed(3));
  };

  const positionNavLiquid = (link, immediate = false) => {
    if (!nav || !navThumb || !navTrail || !link || !desktop.matches) return;
    const navRect = nav.getBoundingClientRect();
    const rect = link.getBoundingClientRect();
    const padX = 14;
    const padY = 8;
    liquid.tx = rect.left - navRect.left - padX;
    liquid.ty = rect.top - navRect.top - padY;
    liquid.tw = rect.width + padX * 2;
    liquid.th = rect.height + padY * 2;
    liquid.active = true;
    const center = liquid.tx + liquid.tw / 2;
    nav.style.setProperty("--thumb-light-x", `${Math.max(18, Math.min(82, (center / navRect.width) * 100))}%`);
    if (immediate || reducedMotion.matches) {
      liquid.x = liquid.tx;
      liquid.y = liquid.ty;
      liquid.w = liquid.tw;
      liquid.h = liquid.th;
      liquid.vx = 0;
      liquid.vy = 0;
      renderNavLiquid();
    }
  };

  const resetNavLiquid = (immediate = false) => positionNavLiquid(currentNav, immediate);
  navLinks.forEach((link) => {
    link.addEventListener("pointerenter", () => positionNavLiquid(link));
    link.addEventListener("focus", () => positionNavLiquid(link));
  });
  nav?.addEventListener("pointerleave", () => resetNavLiquid());
  window.addEventListener("resize", () => resetNavLiquid(true), { passive: true });
  window.addEventListener("pointermove", (event) => {
    if (!finePointer.matches || !nav) return;
    const rect = nav.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    nav.style.setProperty("--nav-x", `${Math.max(0, Math.min(100, x))}%`);
  }, { passive: true });

  const animateNavLiquid = () => {
    if (liquid.active && !reducedMotion.matches) {
      const ax = (liquid.tx - liquid.x) * 0.2;
      const ay = (liquid.ty - liquid.y) * 0.2;
      liquid.vx = (liquid.vx + ax) * 0.6;
      liquid.vy = (liquid.vy + ay) * 0.6;
      liquid.x += liquid.vx;
      liquid.y += liquid.vy;
      liquid.w += (liquid.tw - liquid.w) * 0.26;
      liquid.h += (liquid.th - liquid.h) * 0.26;
      renderNavLiquid();
    }
    requestAnimationFrame(animateNavLiquid);
  };

  requestAnimationFrame(() => {
    resetNavLiquid(true);
    nav?.classList.add("is-ready");
    if (!reducedMotion.matches) animateNavLiquid();
  });

  const revealItems = document.querySelectorAll("[data-reveal]");
  const heroMetrics = document.querySelectorAll(".metric-band [data-reveal]");
  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -7% 0px"
    });
    revealItems.forEach((item) => revealObserver.observe(item));
    window.setTimeout(() => {
      heroMetrics.forEach((item) => item.classList.add("is-visible"));
    }, 240);
  }

  const words = [...document.querySelectorAll(".hero-word")];
  if (words.length > 1 && !reducedMotion.matches) {
    let activeWord = 0;
    window.setInterval(() => {
      const outgoing = words[activeWord];
      outgoing.classList.remove("is-active");
      outgoing.classList.add("was-active");

      activeWord = (activeWord + 1) % words.length;
      const incoming = words[activeWord];
      incoming.classList.remove("was-active");
      incoming.classList.add("is-active");

      window.setTimeout(() => outgoing.classList.remove("was-active"), 760);
    }, 2600);
  }

  const tabsRoot = document.querySelector("[data-tabs]");
  if (tabsRoot) {
    const tabs = [...tabsRoot.querySelectorAll('[role="tab"]')];
    const panels = [...tabsRoot.querySelectorAll('[role="tabpanel"]')];

    const activateTab = (tab, moveFocus = false) => {
      tabs.forEach((item) => {
        const selected = item === tab;
        item.setAttribute("aria-selected", String(selected));
        item.tabIndex = selected ? 0 : -1;
      });

      panels.forEach((panel) => {
        panel.hidden = panel.id !== tab.getAttribute("aria-controls");
      });

      if (moveFocus) tab.focus();
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => activateTab(tab));
      tab.addEventListener("keydown", (event) => {
        let nextIndex = index;
        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          nextIndex = (index + 1) % tabs.length;
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          nextIndex = (index - 1 + tabs.length) % tabs.length;
        } else if (event.key === "Home") {
          nextIndex = 0;
        } else if (event.key === "End") {
          nextIndex = tabs.length - 1;
        } else {
          return;
        }
        event.preventDefault();
        activateTab(tabs[nextIndex], true);
      });
    });
  }

  const sceneRoot = document.querySelector("[data-scene]");
  const sceneShell = sceneRoot?.querySelector(".scene-shell");
  const splineViewer = sceneRoot?.querySelector("spline-viewer");

  const canLoadSpline = () => {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    return desktop.matches && !reducedMotion.matches && !connection?.saveData;
  };

  let splineRequested = false;
  const loadSpline = () => {
    if (splineRequested || !splineViewer || !canLoadSpline()) return;
    splineRequested = true;

    splineViewer.addEventListener("load-complete", () => {
      sceneShell?.classList.add("is-loaded");
    }, { once: true });

    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://unpkg.com/@splinetool/viewer@1.12.98/build/spline-viewer.js";
    script.addEventListener("error", () => sceneShell?.classList.add("load-failed"), { once: true });
    document.head.appendChild(script);
  };

  if (sceneRoot && canLoadSpline()) {
    if ("IntersectionObserver" in window) {
      const sceneObserver = new IntersectionObserver((entries, observer) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        loadSpline();
        observer.disconnect();
      }, { rootMargin: "320px" });
      sceneObserver.observe(sceneRoot);
    } else {
      loadSpline();
    }
  }

})();
