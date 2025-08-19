<script>
  import { onMount, onDestroy } from 'svelte';

  const STAR_COUNT = 12; // Reduced from 24 for better performance
  const STAR_SIZE = 48;

  // цикл схождения/расхождения (секунд)
  const CYCLE_DURATION = 1.5; // T

  const MIN_RADIUS = 100;

  // Pre-calculate constants for better performance
  const TWO_PI = 2 * Math.PI;
  const HALF_PI = Math.PI / 2;
  const CYCLE_FREQUENCY = TWO_PI / CYCLE_DURATION;

  // Центровые смещения (мы используем left:50% top:50% и смещаем относительно центра)
  // Генерация звёзд с параметрами (R, ecc, omega)
  let stars = Array.from({ length: STAR_COUNT }, (_, i) => {
    const phi = (TWO_PI * i) / STAR_COUNT; // начальный угол
    const R = MIN_RADIUS + Math.random() * 36; // px
    const ecc = (Math.random() - 0.5) * 0.6; // от -0.3 до +0.3 (модификатор Y)
    // задаём период вращения отдельно от цикла схождения:
    const rotPeriod = 8 + Math.random() * 8; // секунд на полный оборот
    const omega = TWO_PI / rotPeriod; // рад/с
    const size = STAR_SIZE * (0.7 + Math.random() * 0.6);
    return {
      i, phi, R, ecc, omega, size,
      el: null // сюда привяжем DOM элемент (bind:this)
    };
  });

  let rafId;
  let startTime = null;
  let lastFrameTime = 0;
  const FRAME_RATE_LIMIT = 60; // Limit to 60 FPS
  const FRAME_INTERVAL = 1000 / FRAME_RATE_LIMIT;

  // Optimized radius calculation with pre-calculated constants
  const radiusAt = (R, t) => R * (1 + Math.cos(CYCLE_FREQUENCY * t)) * 0.5;

  function animateFrame(now) {
    if (!startTime) startTime = now;
    
    // Frame rate limiting
    if (now - lastFrameTime < FRAME_INTERVAL) {
      rafId = requestAnimationFrame(animateFrame);
      return;
    }
    lastFrameTime = now;
    
    const t = (now - startTime) / 1000; // seconds elapsed

    // Batch DOM updates for better performance
    const updates = [];

    // Для каждой звезды вычисляем x,y и применяем transform напрямую (строго алгебраически)
    for (let s of stars) {
      const r = radiusAt(s.R, t); // px
      const theta = s.phi + s.omega * t; // rad
      
      // Use Math.cos and Math.sin once per star
      const cosTheta = Math.cos(theta);
      const sinTheta = Math.sin(theta);
      
      // координаты относительно центра (в px)
      const x = r * cosTheta;
      const y = r * sinTheta * (1 + s.ecc);

      // опциональный scale — чуть увеличиваем при схождении (r small -> scale up)
      const scale = 1 + 0.18 * (1 - r / s.R); // при r=0 scale=1.18, при r=R scale=1

      // Batch the transform update
      if (s.el) {
        updates.push(() => {
          s.el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${scale})`;
        });
      }
    }

    // Apply all updates in a batch
    updates.forEach(update => update());

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

  // --- Утилиты для смены режимов (если захочешь) ---
  // Примеры: можно экспортировать и менять CYCLE_DURATION, или задать общий сдвиг фазы.
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
        <svg viewBox="0 0 24 24" class="star-svg" style="width:100%;height:100%;">
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <polygon
            points="12,2 14.5,8.5 21,9.2 16,13.8 17.5,20 12,16.5 6.5,20 8,13.8 3,9.2 9.5,8.5"
            fill="rgba(255,255,102,0.95)"
            stroke="rgba(255,255,255,0.85)"
            stroke-width="0.9"
            filter="url(#glow)"
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
    background: var(--tg-bg-color, rgba(17,24,39,0.4));
    display:flex;
    align-items:center;
    justify-content:center;
    pointer-events: none;
    z-index:1000;
  }

  .stars-orbit {
    position: relative;
    width: 320px;
    height: 320px;
    min-width: 320px;
    min-height: 320px;
  }

  /* каждая звезда позиционируется относительно центра контейнера (.stars-orbit) */
  .orbit-star {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    will-change: transform;
    filter: drop-shadow(0 0 4px #fff5) drop-shadow(0 0 8px #ffe08888);
    opacity: 0.75;
    /* Use transform3d for hardware acceleration */
    transform-style: preserve-3d;
    backface-visibility: hidden;
  }

  .star-svg {
    display: block;
    animation: star-glow 2.8s ease-in-out infinite;
    /* если хочешь, можно добавить задержку twinkle через inline style (не нужно сейчас) */
  }

  @keyframes star-glow {
    0%,100% { filter: drop-shadow(0 0 4px #fff5) drop-shadow(0 0 8px #ffe08888); }
    50%    { filter: drop-shadow(0 0 8px #fff7) drop-shadow(0 0 16px #ffe088bb) drop-shadow(0 0 20px #ffe06633); }
  }

  /* лёгкое мерцание всей сцены */
  @keyframes orbit-breathe {
    0%,100% { transform: scale(1); }
    50%     { transform: scale(1.02); }
  }
  .stars-orbit { 
    animation: orbit-breathe 1s ease-in-out infinite;
    will-change: transform;
  }
</style>

