<script>
  import { onMount, onDestroy } from "svelte";

  // Detect device performance
  const isLowPerformance = () => {
    // Check for mobile devices or low-end hardware
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      );
    const isLowMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
    const isSlowCPU =
      navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;

    return isMobile || isLowMemory || isSlowCPU;
  };

  const lowPerformance = isLowPerformance();

  // Adaptive settings based on device performance
  const STAR_COUNT = lowPerformance ? 6 : 12; // Reduced for weak devices
  const STAR_SIZE = lowPerformance ? 32 : 48; // Smaller stars for weak devices
  const CYCLE_DURATION = lowPerformance ? 2.0 : 1.5; // Slower animation for weak devices
  const MIN_RADIUS = lowPerformance ? 80 : 100; // Smaller orbit for weak devices
  const FRAME_RATE_LIMIT = lowPerformance ? 30 : 60; // Lower FPS for weak devices

  // Pre-calculate constants for better performance
  const TWO_PI = 2 * Math.PI;
  const CYCLE_FREQUENCY = TWO_PI / CYCLE_DURATION;
  const FRAME_INTERVAL = 1000 / FRAME_RATE_LIMIT;

  // Simplified star generation for weak devices
  let stars = Array.from({ length: STAR_COUNT }, (_, i) => {
    const phi = (TWO_PI * i) / STAR_COUNT;
    const R = MIN_RADIUS + Math.random() * (lowPerformance ? 24 : 36);
    const ecc = lowPerformance ? 0 : (Math.random() - 0.5) * 0.6; // No eccentricity for weak devices
    const rotPeriod = lowPerformance
      ? 12 + Math.random() * 8
      : 8 + Math.random() * 8; // Slower rotation
    const omega = TWO_PI / rotPeriod;
    const size =
      STAR_SIZE *
      (lowPerformance ? 0.8 + Math.random() * 0.4 : 0.7 + Math.random() * 0.6);
    return {
      i,
      phi,
      R,
      ecc,
      omega,
      size,
      el: null,
    };
  });

  let rafId;
  let startTime = null;
  let lastFrameTime = 0;

  // Optimized radius calculation
  const radiusAt = (R, t) => R * (1 + Math.cos(CYCLE_FREQUENCY * t)) * 0.5;

  function animateFrame(now) {
    if (!startTime) startTime = now;

    // Frame rate limiting
    if (now - lastFrameTime < FRAME_INTERVAL) {
      rafId = requestAnimationFrame(animateFrame);
      return;
    }
    lastFrameTime = now;

    const t = (now - startTime) / 1000;

    // Batch DOM updates for better performance
    const updates = [];

    for (let s of stars) {
      const r = radiusAt(s.R, t);
      const theta = s.phi + s.omega * t;

      const cosTheta = Math.cos(theta);
      const sinTheta = Math.sin(theta);

      const x = r * cosTheta;
      const y = r * sinTheta * (1 + s.ecc);

      // Simplified scale calculation for weak devices
      const scale = lowPerformance ? 1 : 1 + 0.18 * (1 - r / s.R);

      if (s.el) {
        updates.push(() => {
          s.el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${scale})`;
        });
      }
    }

    // Apply all updates in a batch
    updates.forEach((update) => update());

    rafId = requestAnimationFrame(animateFrame);
  }

  onMount(() => {
    rafId = requestAnimationFrame(animateFrame);
  });

  onDestroy(() => {
    if (rafId) {
      cancelAnimationFrame(rafId);
    }
  });
</script>

<div class="overlay">
  <div class="stars-orbit">
    {#each stars as star (star.i)}
      <div
        class="orbit-star"
        bind:this={star.el}
        style="width: {star.size}px; height: {star.size}px;"
        title="star {star.i}"
      >
        <svg
          viewBox="0 0 24 24"
          class="star-svg"
          style="width:100%;height:100%;"
        >
          {#if !lowPerformance}
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2.2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          {/if}
          <polygon
            points="12,2 14.5,8.5 21,9.2 16,13.8 17.5,20 12,16.5 6.5,20 8,13.8 3,9.2 9.5,8.5"
            fill="rgba(255,255,102,0.95)"
            stroke="rgba(255,255,255,0.85)"
            stroke-width="0.9"
            filter={lowPerformance ? "none" : "url(#glow)"}
          />
        </svg>
      </div>
    {/each}
  </div>
</div>

<style>
  .overlay {
    position: fixed;
    inset: 0;
    background: var(--tg-bg-color, rgba(17, 24, 39, 0.4));
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    z-index: 1000;
  }

  .stars-orbit {
    position: relative;
    width: 320px;
    height: 320px;
    min-width: 320px;
    min-height: 320px;
  }

  .orbit-star {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    will-change: transform;
    opacity: 0.75;
    transform-style: preserve-3d;
    backface-visibility: hidden;
  }

  /* Conditional styling based on performance */
  .orbit-star:not(.low-performance) {
    filter: drop-shadow(0 0 4px #fff5) drop-shadow(0 0 8px #ffe08888);
  }

  .star-svg {
    display: block;
  }

  /* Simplified animations for weak devices */
  .star-svg:not(.low-performance) {
    animation: star-glow 2.8s ease-in-out infinite;
  }

  @keyframes star-glow {
    0%,
    100% {
      filter: drop-shadow(0 0 4px #fff5) drop-shadow(0 0 8px #ffe08888);
    }
    50% {
      filter: drop-shadow(0 0 8px #fff7) drop-shadow(0 0 16px #ffe088bb)
        drop-shadow(0 0 20px #ffe06633);
    }
  }

  /* Simplified breathing animation for weak devices */
  .stars-orbit:not(.low-performance) {
    animation: orbit-breathe 1s ease-in-out infinite;
    will-change: transform;
  }

  @keyframes orbit-breathe {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.02);
    }
  }
</style>
