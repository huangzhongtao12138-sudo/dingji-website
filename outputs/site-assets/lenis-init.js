(() => {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let lenis = null;

  function markNativeScrollAreas() {
    document
      .querySelectorAll(
        '.nav-links, .partner-track, .case-gallery, .brand-rail, .logo-strip, .project-strip, .lightbox'
      )
      .forEach((element) => element.setAttribute('data-lenis-prevent', ''));
  }

  function createLenis() {
    if (reducedMotion.matches || typeof window.Lenis !== 'function' || lenis) return;

    markNativeScrollAreas();
    lenis = new window.Lenis({
      autoRaf: true,
      autoResize: true,
      anchors: true,
      lerp: 0.09,
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1,
      wheelMultiplier: 0.9,
      overscroll: true,
      stopInertiaOnNavigate: true
    });

    window.dingjiLenis = lenis;
    document.documentElement.classList.add('dingji-lenis-ready');
  }

  function destroyLenis() {
    lenis?.destroy();
    lenis = null;
    window.dingjiLenis = null;
    document.documentElement.classList.remove('dingji-lenis-ready');
  }

  function syncMotionPreference() {
    if (reducedMotion.matches) {
      destroyLenis();
    } else {
      createLenis();
    }
  }

  document.addEventListener('visibilitychange', () => {
    if (!lenis) return;
    if (document.hidden) {
      lenis.stop();
    } else {
      lenis.start();
      lenis.resize();
    }
  });

  window.addEventListener('load', () => lenis?.resize(), { once: true });
  window.addEventListener('pageshow', () => lenis?.resize());

  if (typeof reducedMotion.addEventListener === 'function') {
    reducedMotion.addEventListener('change', syncMotionPreference);
  } else {
    reducedMotion.addListener(syncMotionPreference);
  }

  createLenis();
})();
