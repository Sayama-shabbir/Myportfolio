/**
 * SAYAMA SHABBIR — EDITORIAL PERSONAL PORTFOLIO
 * Vanilla JavaScript Choreography, Interactive Overlays & ?rec=1 Recorder Engine
 * Zero Frameworks · Zero External Libraries
 */

(function () {
  'use strict';

  const urlParams = new URLSearchParams(window.location.search);
  const isRecorderMode = urlParams.get('rec') === '1';
  const prefersReducedMotion =
    !isRecorderMode &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const rootHtml = document.documentElement;
  if (isRecorderMode) {
    rootHtml.classList.add('is-recorder');
  }

  // DOM References
  const pageStage = document.getElementById('page-stage');
  const siteNav = document.getElementById('site-nav');
  const heroSection = document.getElementById('section-hero');
  const statementSection = document.getElementById('section-about');
  const profileSection = document.getElementById('section-profile');

  const heroStage = document.getElementById('hero-stage');
  const heroMediaWrap = document.getElementById('hero-media-wrap');
  const heroBgImg = document.getElementById('hero-bg-img');
  const heroEyebrow = document.getElementById('hero-eyebrow');
  const heroTitle = document.getElementById('hero-title');
  const explorePillWrap = document.getElementById('explore-pill-wrap');
  const explorePillBtn = document.getElementById('explore-pill-btn');
  const heroPaperGradient = document.getElementById('hero-paper-gradient');
  const heroPaperSolid = document.getElementById('hero-paper-solid');

  const portraitFrame = document.getElementById('portrait-frame');
  const portraitScaleWrap = document.getElementById('portrait-scale-wrap');
  const portraitParallaxWrap = document.getElementById('portrait-parallax-wrap');

  const playBadgeBtn = document.getElementById('play-badge-btn');
  const playBadgeTicksGroup = document.getElementById('play-badge-ticks');
  const playBadgeCaption = document.getElementById('play-badge-caption');

  const menuTrigger = document.getElementById('menu-trigger');
  const searchTrigger = document.getElementById('search-trigger');
  const overlayBackdrop = document.getElementById('overlay-backdrop');
  const menuSheet = document.getElementById('editorial-menu');
  const searchSheet = document.getElementById('editorial-search');
  const menuCloseBtn = document.getElementById('menu-close-btn');
  const searchCloseBtn = document.getElementById('search-close-btn');
  const searchInput = /** @type {HTMLInputElement | null} */ (
    document.getElementById('search-input')
  );
  const searchResultsList = document.getElementById('search-results');

  const EASE_EDITORIAL = 'cubic-bezier(0.22, 1, 0.36, 1)';
  const EASE_SPRING = 'cubic-bezier(0.34, 1.56, 0.64, 1)';
  const EASE_GLIDE = 'cubic-bezier(0.65, 0, 0.35, 1)';

  /**
   * Clamp numeric value between min and max.
   * @param {number} val
   * @param {number} min
   * @param {number} max
   */
  function clamp(val, min, max) {
    return Math.min(max, Math.max(min, val));
  }

  /**
   * Populate the 48 radial ticks around the 84x84 circular play badge.
   */
  function buildPlayBadgeTicks() {
    if (!playBadgeTicksGroup) return;
    const svgNS = 'http://www.w3.org/2000/svg';
    const cx = 42;
    const cy = 42;
    const outerR = 40;
    const totalTicks = 48;

    for (let i = 0; i < totalTicks; i++) {
      const angleDeg = i * (360 / totalTicks);
      const rad = (angleDeg * Math.PI) / 180;
      const isMajor = i % 4 === 0;
      const innerR = isMajor ? 33.4 : 35.2;

      const x1 = cx + innerR * Math.cos(rad);
      const y1 = cy + innerR * Math.sin(rad);
      const x2 = cx + outerR * Math.cos(rad);
      const y2 = cy + outerR * Math.sin(rad);

      const line = document.createElementNS(svgNS, 'line');
      line.setAttribute('x1', x1.toFixed(2));
      line.setAttribute('y1', y1.toFixed(2));
      line.setAttribute('x2', x2.toFixed(2));
      line.setAttribute('y2', y2.toFixed(2));
      line.setAttribute('stroke', 'currentColor');
      line.setAttribute('stroke-width', isMajor ? '1.15' : '0.85');
      line.setAttribute('stroke-opacity', isMajor ? '0.82' : '0.46');
      line.setAttribute('stroke-linecap', 'round');
      playBadgeTicksGroup.appendChild(line);
    }
  }

  /**
   * Split text inside an element into accessible word & character spans.
   * Preserves screen-reader legibility on the parent container.
   * @param {HTMLElement} container
   * @param {{ includeWordGapClass?: string }} [options]
   * @returns {HTMLElement[]}
   */
  function splitTextIntoChars(container, options) {
    const rawText = (container.textContent || '').trim();
    if (!rawText) return [];

    if (!container.getAttribute('aria-label')) {
      container.setAttribute('aria-label', rawText);
    }

    container.textContent = '';
    const words = rawText.split(/\s+/);
    /** @type {HTMLElement[]} */
    const chars = [];

    words.forEach((word, wordIdx) => {
      const wordSpan = document.createElement('span');
      wordSpan.className = 'split-word';
      wordSpan.setAttribute('aria-hidden', 'true');

      Array.from(word).forEach((ch) => {
        const charSpan = document.createElement('span');
        charSpan.className = 'split-char';
        charSpan.textContent = ch;
        wordSpan.appendChild(charSpan);
        chars.push(charSpan);
      });

      container.appendChild(wordSpan);

      if (wordIdx < words.length - 1) {
        const gap = document.createElement('span');
        gap.setAttribute('aria-hidden', 'true');
        if (options && options.includeWordGapClass) {
          gap.className = options.includeWordGapClass;
          gap.textContent = ' ';
        } else {
          gap.innerHTML = '&nbsp;';
        }
        container.appendChild(gap);
      }
    });

    return chars;
  }

  // Split all animated typography upfront
  const heroChars = heroTitle
    ? splitTextIntoChars(heroTitle, { includeWordGapClass: 'hero-word-gap' })
    : [];

  /** @type {Array<{ type: 'char', el: HTMLElement } | { type: 'pill', el: HTMLElement, img: HTMLImageElement | null }>} */
  const statementSequence = [];
  if (statementSection) {
    const lines = statementSection.querySelectorAll('.statement-line');
    lines.forEach((lineEl) => {
      const textSpan = /** @type {HTMLElement | null} */ (
        lineEl.querySelector('.statement-line-text')
      );
      if (textSpan) {
        const lineChars = splitTextIntoChars(textSpan);
        lineChars.forEach((el) => statementSequence.push({ type: 'char', el }));
      }
      const pillEl = /** @type {HTMLElement | null} */ (
        lineEl.querySelector('.inline-photo-pill')
      );
      if (pillEl) {
        const img = pillEl.querySelector('img');
        statementSequence.push({ type: 'pill', el: pillEl, img });
      }
    });
  }

  /** @type {HTMLElement[]} */
  const profileHeadingChars = [];
  if (profileSection) {
    const headingLines = profileSection.querySelectorAll('.profile-heading-line');
    headingLines.forEach((line) => {
      const chars = splitTextIntoChars(/** @type {HTMLElement} */ (line));
      chars.forEach((c) => profileHeadingChars.push(c));
    });
  }

  /**
   * Prepare initial hidden states when motion is enabled (and not in ?rec=1 where
   * fill:'both' animations establish t=0 state directly on document.timeline).
   */
  function primeInitialStates() {
    if (prefersReducedMotion) {
      if (heroBgImg) heroBgImg.style.transform = 'scale(1)';
      if (portraitFrame) portraitFrame.style.clipPath = 'inset(0% 0% 0% 0%)';
      if (portraitScaleWrap) portraitScaleWrap.style.transform = 'scale(1)';
      return;
    }

    if (!isRecorderMode) {
      // Section 2 initial pre-reveal state
      const s2Kicker = statementSection?.querySelector('.statement-kicker');
      const s2Emblem = statementSection?.querySelector('.statement-emblem');
      const s2Intro = statementSection?.querySelector('.statement-intro');

      if (s2Kicker) /** @type {HTMLElement} */ (s2Kicker).style.opacity = '0';
      if (s2Emblem) /** @type {HTMLElement} */ (s2Emblem).style.opacity = '0';
      if (s2Intro) /** @type {HTMLElement} */ (s2Intro).style.opacity = '0';

      statementSequence.forEach((item) => {
        item.el.style.opacity = '0';
      });

      // Section 3 initial pre-reveal state
      const s3Kicker = profileSection?.querySelector('.profile-kicker');
      const s3Badge = profileSection?.querySelector('.play-badge-block');
      if (s3Kicker) /** @type {HTMLElement} */ (s3Kicker).style.opacity = '0';
      if (s3Badge) /** @type {HTMLElement} */ (s3Badge).style.opacity = '0';

      profileHeadingChars.forEach((ch) => {
        ch.style.opacity = '0';
      });

      const staggerItems = profileSection?.querySelectorAll('[data-profile-reveal]');
      staggerItems?.forEach((el) => {
        /** @type {HTMLElement} */ (el).style.opacity = '0';
      });
    }
  }

  /** @type {Set<string>} */
  const revealedSections = new Set();

  /**
   * Schedule Hero entrance choreography via Web Animations API.
   * @param {number} baseDelayMs
   */
  function revealHero(baseDelayMs) {
    if (revealedSections.has('hero') || prefersReducedMotion) return;
    revealedSections.add('hero');

    // 1. Background image settles from scale 1.06 to 1 over 2.2 seconds
    if (heroBgImg) {
      heroBgImg.animate(
        [{ transform: 'scale(1.06)' }, { transform: 'scale(1)' }],
        {
          duration: 2200,
          delay: baseDelayMs,
          easing: EASE_EDITORIAL,
          fill: 'both',
        }
      );
    }

    // 2. Navigation and eyebrow fade down into position
    if (siteNav) {
      siteNav.animate(
        [
          { opacity: 0, transform: 'translate3d(0, -14px, 0)' },
          { opacity: 1, transform: 'translate3d(0, 0, 0)' },
        ],
        {
          duration: 850,
          delay: baseDelayMs + 100,
          easing: EASE_EDITORIAL,
          fill: 'both',
        }
      );
    }

    if (heroEyebrow) {
      heroEyebrow.animate(
        [
          { opacity: 0, transform: 'translate3d(0, -12px, 0)' },
          { opacity: 1, transform: 'translate3d(0, 0, 0)' },
        ],
        {
          duration: 850,
          delay: baseDelayMs + 200,
          easing: EASE_EDITORIAL,
          fill: 'both',
        }
      );
    }

    // 3. Each letter of SAYAMA SHABBIR rises from 10px blur, .18em offset, 95ms apart
    heroChars.forEach((charEl, idx) => {
      charEl.animate(
        [
          {
            opacity: 0,
            filter: 'blur(10px)',
            transform: 'translate3d(0, 0.18em, 0)',
          },
          {
            opacity: 1,
            filter: 'blur(0px)',
            transform: 'translate3d(0, 0, 0)',
          },
        ],
        {
          duration: 940,
          delay: baseDelayMs + 180 + idx * 95,
          easing: EASE_EDITORIAL,
          fill: 'both',
        }
      );
    });

    // 4. Bottom pill rises into view at ~1.05 seconds
    if (explorePillBtn) {
      explorePillBtn.animate(
        [
          { opacity: 0, transform: 'translate3d(0, 20px, 0)' },
          { opacity: 1, transform: 'translate3d(0, 0, 0)' },
        ],
        {
          duration: 900,
          delay: baseDelayMs + 1050,
          easing: EASE_EDITORIAL,
          fill: 'both',
        }
      );
    }
  }

  /**
   * Schedule Section 2 (Personal Statement — About Me) entrance choreography.
   * @param {number} baseDelayMs
   */
  function revealStatement(baseDelayMs) {
    if (revealedSections.has('statement') || prefersReducedMotion || !statementSection) {
      return;
    }
    revealedSections.add('statement');

    const kicker = /** @type {HTMLElement | null} */ (
      statementSection.querySelector('.statement-kicker')
    );
    const emblem = /** @type {HTMLElement | null} */ (
      statementSection.querySelector('.statement-emblem')
    );
    const intro = /** @type {HTMLElement | null} */ (
      statementSection.querySelector('.statement-intro')
    );

    if (kicker) {
      kicker.animate(
        [
          { opacity: 0, transform: 'translate3d(0, 12px, 0)' },
          { opacity: 1, transform: 'translate3d(0, 0, 0)' },
        ],
        {
          duration: 760,
          delay: baseDelayMs,
          easing: EASE_EDITORIAL,
          fill: 'both',
        }
      );
    }

    // Letters rise from .55em below with 4° tilt, 26ms apart; circular pills spring in & zoom 1.5 -> 1
    let stepIndex = 0;
    statementSequence.forEach((item) => {
      const itemDelay = baseDelayMs + 90 + stepIndex * 26;
      if (item.type === 'char') {
        item.el.animate(
          [
            {
              opacity: 0,
              transform: 'translate3d(0, 0.55em, 0) rotate(4deg)',
            },
            {
              opacity: 1,
              transform: 'translate3d(0, 0, 0) rotate(0deg)',
            },
          ],
          {
            duration: 860,
            delay: itemDelay,
            easing: EASE_EDITORIAL,
            fill: 'both',
          }
        );
        stepIndex += 1;
      } else if (item.type === 'pill') {
        item.el.animate(
          [
            { opacity: 0, transform: 'translateY(-0.04em) scale(0)' },
            { opacity: 1, transform: 'translateY(-0.04em) scale(1)' },
          ],
          {
            duration: 820,
            delay: itemDelay + 40,
            easing: EASE_SPRING,
            fill: 'both',
          }
        );
        if (item.img) {
          item.img.animate(
            [{ transform: 'scale(1.5)' }, { transform: 'scale(1)' }],
            {
              duration: 1200,
              delay: itemDelay + 40,
              easing: EASE_EDITORIAL,
              fill: 'both',
            }
          );
        }
        stepIndex += 2;
      }
    });

    const totalLettersFinishOffset = 90 + stepIndex * 26;

    // Emblem rotates from -90° to 0° while scaling from .6 to 1
    if (emblem) {
      emblem.animate(
        [
          { opacity: 0, transform: 'rotate(-90deg) scale(0.6)' },
          { opacity: 1, transform: 'rotate(0deg) scale(1)' },
        ],
        {
          duration: 1080,
          delay: baseDelayMs + Math.min(620, totalLettersFinishOffset * 0.65),
          easing: EASE_EDITORIAL,
          fill: 'both',
        }
      );
    }

    if (intro) {
      intro.animate(
        [
          { opacity: 0, transform: 'translate3d(0, 18px, 0)' },
          { opacity: 1, transform: 'translate3d(0, 0, 0)' },
        ],
        {
          duration: 920,
          delay: baseDelayMs + Math.min(780, totalLettersFinishOffset * 0.8),
          easing: EASE_EDITORIAL,
          fill: 'both',
        }
      );
    }
  }

  /**
   * Schedule Section 3 (Quick Facts — My Profile) entrance choreography.
   * @param {number} baseDelayMs
   */
  function revealProfile(baseDelayMs) {
    if (revealedSections.has('profile') || prefersReducedMotion || !profileSection) {
      return;
    }
    revealedSections.add('profile');

    const kicker = /** @type {HTMLElement | null} */ (
      profileSection.querySelector('.profile-kicker')
    );
    const badge = /** @type {HTMLElement | null} */ (
      profileSection.querySelector('.play-badge-block')
    );

    if (kicker) {
      kicker.animate(
        [
          { opacity: 0, transform: 'translate3d(0, 10px, 0)' },
          { opacity: 1, transform: 'translate3d(0, 0, 0)' },
        ],
        {
          duration: 720,
          delay: baseDelayMs,
          easing: EASE_EDITORIAL,
          fill: 'both',
        }
      );
    }

    // Individual title letter animation (QUICK / FACTS / ABOUT / ME)
    profileHeadingChars.forEach((charEl, idx) => {
      charEl.animate(
        [
          {
            opacity: 0,
            transform: 'translate3d(0, 0.48em, 0) rotate(3deg)',
          },
          {
            opacity: 1,
            transform: 'translate3d(0, 0, 0) rotate(0deg)',
          },
        ],
        {
          duration: 820,
          delay: baseDelayMs + 70 + idx * 24,
          easing: EASE_EDITORIAL,
          fill: 'both',
        }
      );
    });

    if (badge) {
      badge.animate(
        [
          { opacity: 0, transform: 'scale(0.84)' },
          { opacity: 1, transform: 'scale(1)' },
        ],
        {
          duration: 860,
          delay: baseDelayMs + 340,
          easing: EASE_EDITORIAL,
          fill: 'both',
        }
      );
    }

    // Staggered rows, skills, education tables, experience, declaration & connect
    const staggerElements = profileSection.querySelectorAll('[data-profile-reveal]');
    staggerElements.forEach((el, idx) => {
      /** @type {HTMLElement} */ (el).animate(
        [
          { opacity: 0, transform: 'translate3d(0, 14px, 0)' },
          { opacity: 1, transform: 'translate3d(0, 0, 0)' },
        ],
        {
          duration: 760,
          delay: baseDelayMs + 220 + idx * 42,
          easing: EASE_EDITORIAL,
          fill: 'both',
        }
      );
    });

    // Portrait clip-path reveal over 1.2s + inner scale 1.25 -> 1
    if (portraitFrame) {
      portraitFrame.animate(
        [
          { clipPath: 'inset(100% 0% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)' },
        ],
        {
          duration: 1200,
          delay: baseDelayMs + 180,
          easing: EASE_EDITORIAL,
          fill: 'both',
        }
      );
    }

    if (portraitScaleWrap) {
      portraitScaleWrap.animate(
        [{ transform: 'scale(1.25)' }, { transform: 'scale(1)' }],
        {
          duration: 1380,
          delay: baseDelayMs + 180,
          easing: EASE_EDITORIAL,
          fill: 'both',
        }
      );
    }
  }

  /**
   * Read effective scroll offset (native window.scrollY or ?rec=1 matrix translation).
   */
  function getEffectiveScrollY() {
    if (isRecorderMode && pageStage) {
      const transformStr = window.getComputedStyle(pageStage).transform;
      if (transformStr && transformStr !== 'none') {
        const matrix = new DOMMatrixReadOnly(transformStr);
        return Math.max(0, -matrix.m42);
      }
      return 0;
    }
    return window.scrollY || window.pageYOffset || 0;
  }

  /**
   * Apply scroll-linked effects (Hero drift, paper gradient melt, blur, navbar state, portrait parallax).
   * @param {number} scrollY
   */
  function applyScrollLinkedEffects(scrollY) {
    const vh = Math.max(1, window.innerHeight || 960);

    // 1. Hero transition:
    // - Hero stage drifts down at .32x scroll speed
    // - Paper gradient grows from 34% to 100% of hero height
    // - Reaches full opacity at ~60% of one viewport of scrolling
    // - Background blurs up to 6px
    // - Bottom pill disappears underneath gradient
    const meltProgress = clamp(scrollY / (vh * 0.6), 0, 1);

    if (heroStage && !prefersReducedMotion) {
      const driftPx = scrollY * 0.32;
      heroStage.style.transform = `translate3d(0, ${driftPx.toFixed(2)}px, 0)`;
    }

    if (heroPaperGradient) {
      const scaleY = 0.34 + 0.66 * meltProgress;
      heroPaperGradient.style.transform = `scaleY(${scaleY.toFixed(4)})`;
    }

    if (heroPaperSolid) {
      const solidAlpha = Math.pow(meltProgress, 1.3);
      heroPaperSolid.style.opacity = solidAlpha.toFixed(4);
    }

    if (heroMediaWrap && !prefersReducedMotion) {
      const blurPx = meltProgress * 6;
      const zoom = 1 + meltProgress * 0.035;
      heroMediaWrap.style.filter = blurPx > 0.04 ? `blur(${blurPx.toFixed(2)}px)` : 'none';
      heroMediaWrap.style.transform = `scale(${zoom.toFixed(4)})`;
    }

    if (explorePillWrap) {
      const pillFade = clamp(1 - meltProgress * 1.9, 0, 1);
      const pillDrift = prefersReducedMotion ? 0 : scrollY * 0.24;
      explorePillWrap.style.opacity = pillFade.toFixed(3);
      explorePillWrap.style.transform = `translate3d(-50%, ${pillDrift.toFixed(2)}px, 0)`;
      explorePillWrap.style.pointerEvents = pillFade < 0.1 ? 'none' : 'auto';
    }

    if (siteNav && !isRecorderMode) {
      siteNav.classList.toggle('is-paper', scrollY > vh * 0.45);
    }

    // 2. Quick Facts right-column portrait parallax (±7%)
    if (portraitFrame && portraitParallaxWrap && !prefersReducedMotion) {
      const rect = portraitFrame.getBoundingClientRect();
      if (rect.bottom > -vh * 0.5 && rect.top < vh * 1.5) {
        const frameCenter = rect.top + rect.height * 0.5;
        const viewportCenter = vh * 0.5;
        const normalized = clamp((frameCenter - viewportCenter) / (vh * 0.85), -1, 1);
        const parallaxPct = normalized * 7;
        portraitParallaxWrap.style.transform = `translate3d(0, ${parallaxPct.toFixed(2)}%, 0)`;
      }
    }
  }

  /**
   * Setup IntersectionObservers for normal interactive browsing mode (~35% visibility).
   */
  function setupIntersectionReveals() {
    revealHero(0);

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealStatement(0);
      revealProfile(0);
      return;
    }

    if (statementSection) {
      const vh = window.innerHeight || 960;
      const s2Ratio = clamp((vh * 0.35) / Math.max(1, statementSection.offsetHeight), 0.1, 0.35);
      const s2Observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              revealStatement(0);
              s2Observer.disconnect();
            }
          });
        },
        { threshold: s2Ratio }
      );
      s2Observer.observe(statementSection);
    }

    if (profileSection) {
      const vh = window.innerHeight || 960;
      const s3Ratio = clamp((vh * 0.35) / Math.max(1, profileSection.offsetHeight), 0.08, 0.35);
      const s3Observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              revealProfile(0);
              s3Observer.disconnect();
            }
          });
        },
        { threshold: s3Ratio }
      );
      s3Observer.observe(profileSection);
    }
  }

  /**
   * Setup deterministic ?rec=1 recorder mode:
   * - 6.5s Web Animation translating #page-stage
   *   - Hold Hero until 1.95s
   *   - Glide to Section 2 by 3.35s
   *   - Hold until 4.25s
   *   - Glide to Section 3 by 5.55s
   *   - Hold remainder until 6.5s
   * - Create all three section reveals upfront at 0s, 2.65s, and 4.85s
   */
  function setupRecorderMode() {
    if (!pageStage || !statementSection || !profileSection) return;

    window.scrollTo(0, 0);

    const ySection2 = statementSection.offsetTop;
    const ySection3 = profileSection.offsetTop;

    // Schedule all 3 section reveals upfront on document.timeline
    revealHero(0);
    revealStatement(2650);
    revealProfile(4850);

    pageStage.animate(
      [
        {
          offset: 0,
          transform: 'translate3d(0, 0px, 0)',
          easing: 'linear',
        },
        {
          offset: 1.95 / 6.5,
          transform: 'translate3d(0, 0px, 0)',
          easing: EASE_GLIDE,
        },
        {
          offset: 3.35 / 6.5,
          transform: `translate3d(0, -${ySection2}px, 0)`,
          easing: 'linear',
        },
        {
          offset: 4.25 / 6.5,
          transform: `translate3d(0, -${ySection2}px, 0)`,
          easing: EASE_GLIDE,
        },
        {
          offset: 5.55 / 6.5,
          transform: `translate3d(0, -${ySection3}px, 0)`,
          easing: 'linear',
        },
        {
          offset: 1,
          transform: `translate3d(0, -${ySection3}px, 0)`,
        },
      ],
      {
        duration: 6500,
        fill: 'both',
      }
    );

    function recorderTick() {
      const currentY = getEffectiveScrollY();
      applyScrollLinkedEffects(currentY);
      window.requestAnimationFrame(recorderTick);
    }

    window.requestAnimationFrame(recorderTick);
  }

  /**
   * Setup standard scroll-linked RAF loop.
   */
  function setupInteractiveScrollLoop() {
    let ticking = false;

    function update() {
      ticking = false;
      applyScrollLinkedEffects(getEffectiveScrollY());
    }

    function requestTick() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }

    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', requestTick, { passive: true });
    update();
  }

  // =========================================================================
  // INTERACTIVE CONTROLS: GUIDED TOUR, MENU DRAWER & LIVE CV SEARCH
  // =========================================================================

  let isTourActive = false;
  /** @type {number | null} */
  let tourRafId = null;
  let lastTourTimestamp = 0;

  function stopGuidedTour() {
    if (!isTourActive) return;
    isTourActive = false;
    if (tourRafId !== null) {
      window.cancelAnimationFrame(tourRafId);
      tourRafId = null;
    }
    if (playBadgeBtn) {
      playBadgeBtn.setAttribute('aria-pressed', 'false');
    }
    if (playBadgeCaption) {
      playBadgeCaption.textContent = '7 MINUTES';
    }
  }

  /**
   * @param {number} timestamp
   */
  function stepGuidedTour(timestamp) {
    if (!isTourActive) return;
    if (!lastTourTimestamp) lastTourTimestamp = timestamp;
    const dtSeconds = Math.min(0.06, (timestamp - lastTourTimestamp) / 1000);
    lastTourTimestamp = timestamp;

    const maxScroll =
      Math.max(document.documentElement.scrollHeight, document.body.scrollHeight) -
      window.innerHeight;
    const current = window.scrollY || window.pageYOffset || 0;

    if (current >= maxScroll - 2) {
      stopGuidedTour();
      return;
    }

    // Calm editorial reading pace (~68px/sec)
    const nextY = Math.min(maxScroll, current + dtSeconds * 68);
    window.scrollTo(0, nextY);
    tourRafId = window.requestAnimationFrame(stepGuidedTour);
  }

  function toggleGuidedTour() {
    if (isRecorderMode) return;
    if (isTourActive) {
      stopGuidedTour();
      return;
    }

    const maxScroll =
      Math.max(document.documentElement.scrollHeight, document.body.scrollHeight) -
      window.innerHeight;
    const current = window.scrollY || window.pageYOffset || 0;

    if (current >= maxScroll - 24) {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }

    isTourActive = true;
    lastTourTimestamp = 0;
    if (playBadgeBtn) {
      playBadgeBtn.setAttribute('aria-pressed', 'true');
    }
    if (playBadgeCaption) {
      playBadgeCaption.textContent = 'PAUSE TOUR';
    }
    tourRafId = window.requestAnimationFrame(stepGuidedTour);
  }

  // Stop guided tour automatically on manual user wheel/touch/keydown scroll
  window.addEventListener('wheel', stopGuidedTour, { passive: true });
  window.addEventListener('touchmove', stopGuidedTour, { passive: true });
  window.addEventListener('keydown', (e) => {
    if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(e.key)) {
      stopGuidedTour();
    }
  });

  if (playBadgeBtn) {
    playBadgeBtn.addEventListener('click', toggleGuidedTour);
  }

  // Hero "Explore My Journey" bottom pill smooth scroll
  if (explorePillBtn && statementSection) {
    explorePillBtn.addEventListener('click', () => {
      stopGuidedTour();
      statementSection.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    });
  }

  // Menu & Search Overlay Management
  /** @type {'none' | 'menu' | 'search'} */
  let activeOverlay = 'none';

  /**
   * @param {'none' | 'menu' | 'search'} target
   */
  function setOverlay(target) {
    if (isRecorderMode) return;
    stopGuidedTour();
    activeOverlay = target;

    const isMenu = target === 'menu';
    const isSearch = target === 'search';
    const anyOpen = isMenu || isSearch;

    rootHtml.classList.toggle('has-overlay-open', anyOpen);

    if (overlayBackdrop) {
      overlayBackdrop.classList.toggle('is-open', anyOpen);
      overlayBackdrop.setAttribute('aria-hidden', String(!anyOpen));
    }

    if (menuSheet) {
      menuSheet.classList.toggle('is-open', isMenu);
      menuSheet.setAttribute('aria-hidden', String(!isMenu));
    }
    if (menuTrigger) {
      menuTrigger.setAttribute('aria-expanded', String(isMenu));
    }

    if (searchSheet) {
      searchSheet.classList.toggle('is-open', isSearch);
      searchSheet.setAttribute('aria-hidden', String(!isSearch));
    }
    if (searchTrigger) {
      searchTrigger.setAttribute('aria-expanded', String(isSearch));
    }

    if (isSearch && searchInput) {
      renderSearchResults(searchInput.value);
      window.setTimeout(() => searchInput.focus(), 60);
    } else if (isMenu) {
      const firstLink = menuSheet?.querySelector('a, button');
      if (firstLink) {
        window.setTimeout(() => /** @type {HTMLElement} */ (firstLink).focus(), 60);
      }
    }
  }

  if (menuTrigger) {
    menuTrigger.addEventListener('click', () => {
      setOverlay(activeOverlay === 'menu' ? 'none' : 'menu');
    });
  }

  if (searchTrigger) {
    searchTrigger.addEventListener('click', () => {
      setOverlay(activeOverlay === 'search' ? 'none' : 'search');
    });
  }

  if (menuCloseBtn) {
    menuCloseBtn.addEventListener('click', () => setOverlay('none'));
  }

  if (searchCloseBtn) {
    searchCloseBtn.addEventListener('click', () => setOverlay('none'));
  }

  if (overlayBackdrop) {
    overlayBackdrop.addEventListener('click', () => setOverlay('none'));
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && activeOverlay !== 'none') {
      const previous = activeOverlay;
      setOverlay('none');
      if (previous === 'menu' && menuTrigger) menuTrigger.focus();
      if (previous === 'search' && searchTrigger) searchTrigger.focus();
    }
  });

  // Wire Menu Chapter Links
  const menuLinks = document.querySelectorAll('[data-menu-jump]');
  menuLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      setOverlay('none');
      if (!targetId) return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        if (targetId === '#section-about') revealStatement(0);
        if (targetId === '#section-profile' || targetId === '#section-connect') {
          revealStatement(0);
          revealProfile(0);
        }
        targetEl.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'start',
        });
      }
    });
  });

  // Build CV Search Index from semantic DOM nodes
  /**
   * @typedef {Object} SearchEntry
   * @property {HTMLElement} element
   * @property {string} title
   * @property {string} category
   * @property {string} snippet
   * @property {string} haystack
   */

  /** @type {SearchEntry[]} */
  const cvSearchIndex = [];
  document.querySelectorAll('[data-cv-title]').forEach((node) => {
    const element = /** @type {HTMLElement} */ (node);
    const title = element.getAttribute('data-cv-title') || '';
    const category = element.getAttribute('data-cv-cat') || 'CV';
    const text = (element.textContent || '').replace(/\s+/g, ' ').trim();
    const snippet = text.length > 130 ? `${text.slice(0, 127)}...` : text;
    cvSearchIndex.push({
      element,
      title,
      category,
      snippet,
      haystack: `${title} ${category} ${text}`.toLowerCase(),
    });
  });

  /**
   * @param {HTMLElement} targetEl
   */
  function jumpToAndHighlight(targetEl) {
    setOverlay('none');
    revealStatement(0);
    revealProfile(0);

    targetEl.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'center',
    });

    targetEl.setAttribute('data-search-hit', 'true');
    window.setTimeout(() => {
      targetEl.removeAttribute('data-search-hit');
    }, 1800);
  }

  /**
   * @param {string} rawQuery
   */
  function renderSearchResults(rawQuery) {
    if (!searchResultsList) return;
    searchResultsList.textContent = '';

    const query = rawQuery.trim().toLowerCase();
    const matches = query
      ? cvSearchIndex.filter((item) => item.haystack.includes(query))
      : cvSearchIndex.slice(0, 6);

    if (matches.length === 0) {
      const emptyLi = document.createElement('li');
      emptyLi.className = 'search-empty';
      emptyLi.textContent = `No CV entries found matching "${rawQuery.trim()}". Try Python, C++, Data Analysis, B. Tech, or Deloitte.`;
      searchResultsList.appendChild(emptyLi);
      return;
    }

    matches.forEach((item) => {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'search-result-btn';

      const mainSpan = document.createElement('span');
      mainSpan.className = 'search-result-main';

      const titleSpan = document.createElement('span');
      titleSpan.className = 'search-result-title';
      titleSpan.textContent = item.title;

      const snippetSpan = document.createElement('span');
      snippetSpan.className = 'search-result-snippet';
      snippetSpan.textContent = item.snippet;

      const catSpan = document.createElement('span');
      catSpan.className = 'search-result-cat';
      catSpan.textContent = item.category;

      mainSpan.appendChild(titleSpan);
      mainSpan.appendChild(snippetSpan);
      btn.appendChild(mainSpan);
      btn.appendChild(catSpan);

      btn.addEventListener('click', () => jumpToAndHighlight(item.element));
      li.appendChild(btn);
      searchResultsList.appendChild(li);
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      renderSearchResults(searchInput.value);
    });
  }

  document.querySelectorAll('[data-search-suggest]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const term = btn.getAttribute('data-search-suggest') || '';
      if (searchInput) {
        searchInput.value = term;
        renderSearchResults(term);
        searchInput.focus();
      }
    });
  });

  // =========================================================================
  // INITIALIZE PORTFOLIO
  // =========================================================================

  buildPlayBadgeTicks();
  primeInitialStates();

  if (isRecorderMode) {
    setupRecorderMode();
  } else {
    setupIntersectionReveals();
    setupInteractiveScrollLoop();
  }
})();
