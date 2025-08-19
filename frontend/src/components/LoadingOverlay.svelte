<script>
  import { onMount, onDestroy } from 'svelte';

  const STAR_COUNT = 12;
  const STAR_SIZE = 32;

  // цикл схождения/расхождения (секунд)
  const CYCLE_DURATION = 1; // T

  const MIN_RADIUS = 100;

  // Центровые смещения (мы используем left:50% top:50% и смещаем относительно центра)
  // Генерация звёзд с параметрами (R, ecc, omega)
  let stars = Array.from({ length: STAR_COUNT }, (_, i) => {
    const phi = (2 * Math.PI * i) / STAR_COUNT; // начальный угол
    const R = MIN_RADIUS + Math.random() * 36; // px
    const ecc = (Math.random() - 0.5) * 0.6; // от -0.3 до +0.3 (модификатор Y)
    // задаём период вращения отдельно от цикла схождения:
    const rotPeriod = 8 + Math.random() * 8; // секунд на полный оборот
    const omega = (2 * Math.PI) / rotPeriod; // рад/с
    const size = STAR_SIZE * (0.7 + Math.random() * 0.6);
    const twinkleDelay = Math.random() * 2;
    const pulseDelay = Math.random() * 2;
    return {
      i, phi, R, ecc, omega, size, twinkleDelay, pulseDelay,
      el: null // сюда привяжем DOM элемент (bind:this)
    };
  });

  let rafId;
  let startTime = null;

  // r_i(t) = R * (1 + cos(2π t / T)) / 2
  const radiusAt = (R, t) => R * (1 + Math.cos((2 * Math.PI * t) / CYCLE_DURATION)) / 2;

  function animateFrame(now) {
    if (!startTime) startTime = now;
    const t = (now - startTime) / 1000; // seconds elapsed

    // Для каждой звезды вычисляем x,y и применяем transform напрямую (строго алгебраически)
    for (let s of stars) {
      const r = radiusAt(s.R, t); // px
      const theta = s.phi + s.omega * t; // rad
      // координаты относительно центра (в px)
      const x = r * Math.cos(theta);
      const y = r * Math.sin(theta) * (1 + s.ecc);

      // опциональный scale — чуть увеличиваем при схождении (r small -> scale up)
      const scale = 1 + 0.18 * (1 - r / s.R); // при r=0 scale=1.18, при r=R scale=1

      // устанавливаем transform: смещение + центрирование
      if (s.el) {
        // translate(-50%,-50%) чтобы центр SVG совпал с позицией (x,y)
        s.el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${scale})`;
      }
    }

    rafId = requestAnimationFrame(animateFrame);
  }

  onMount(() => {
    rafId = requestAnimationFrame(animateFrame);
  });

  onDestroy(() => {
    cancelAnimationFrame(rafId);
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
    will-change: transform, filter, opacity;
    filter: drop-shadow(0 0 6px #fff7) drop-shadow(0 0 12px #ffe06688);
    opacity: 0.95;
  }

  .star-svg {
    display: block;
    animation: star-glow 2.8s ease-in-out infinite;
    /* если хочешь, можно добавить задержку twinkle через inline style (не нужно сейчас) */
  }

  @keyframes star-glow {
    0%,100% { filter: drop-shadow(0 0 6px #fff7) drop-shadow(0 0 12px #ffe06688); }
    50%    { filter: drop-shadow(0 0 12px #fff9) drop-shadow(0 0 24px #ffe066cc) drop-shadow(0 0 30px #ffe06644); }
  }

  /* лёгкое мерцание всей сцены */
  @keyframes orbit-breathe {
    0%,100% { transform: scale(1); }
    50%     { transform: scale(1.02); }
  }
  .stars-orbit { animation: orbit-breathe 1s ease-in-out infinite; }
</style>
