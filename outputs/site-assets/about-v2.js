(() => {
  "use strict";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const desktop = window.matchMedia("(min-width: 961px)");

  const nav = document.querySelector(".nav-links");
  const navThumb = nav?.querySelector(".liquid-thumb");
  const navTrail = nav?.querySelector(".liquid-trail");
  const navLinks = nav ? [...nav.querySelectorAll("a")] : [];
  const currentNav = navLinks.find((link) => link.classList.contains("active"));

  const positionNavLiquid = (link, immediate = false) => {
    if (!nav || !navThumb || !navTrail || !link || !desktop.matches) return;
    const navRect = nav.getBoundingClientRect();
    const rect = link.getBoundingClientRect();
    const x = rect.left - navRect.left;
    const y = rect.top - navRect.top;

    [navThumb, navTrail].forEach((element) => {
      element.style.setProperty("--x", `${x}px`);
      element.style.setProperty("--y", `${y}px`);
      element.style.setProperty("--w", `${rect.width}px`);
      element.style.setProperty("--h", `${rect.height}px`);
      if (immediate) {
        element.style.transitionDuration = "0ms";
        requestAnimationFrame(() => {
          element.style.transitionDuration = "";
        });
      }
    });
  };

  const resetNavLiquid = (immediate = false) => positionNavLiquid(currentNav, immediate);
  navLinks.forEach((link) => {
    link.addEventListener("pointerenter", () => positionNavLiquid(link));
    link.addEventListener("focus", () => positionNavLiquid(link));
  });
  nav?.addEventListener("pointerleave", () => resetNavLiquid());
  window.addEventListener("resize", () => resetNavLiquid(true), { passive: true });
  requestAnimationFrame(() => resetNavLiquid(true));

  const revealItems = document.querySelectorAll("[data-reveal]");
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
