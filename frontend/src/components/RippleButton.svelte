<script>
  export let onClick = () => {};
  export let disabled = false;
  export let kind = "";
  let ripples = [];

  function createRipple(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    const ripple = { x, y, size, key: Date.now() };
    ripples = [...ripples, ripple];
    setTimeout(() => {
      ripples = ripples.filter((r) => r.key !== ripple.key);
    }, 600);
    onClick(event);
  }
</script>

<button class="ripple-btn {kind}" on:click={createRipple} {disabled}>
  <slot></slot>
  <span class="ripple-box">
    {#each ripples as r (r.key)}
      <span
        class="ripple"
        style="width:{r.size}px;height:{r.size}px;top:{r.y}px;left:{r.x}px;"
      />
    {/each}
  </span>
</button>

<style>
  .ripple-btn {
    position: relative;
    overflow: hidden;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    background:
      radial-gradient(#ffffff22 1px, transparent 1px) 0 0/3px 3px,
      radial-gradient(#ffffff22 1px, transparent 1px) 1.5px 1.5px/3px 3px,
      linear-gradient(to right, #1e293b, #0f172a);
    color: var(--tg-button-text-color, #fff);
    border-radius: 8px;
    font-weight: 600;
    transition: background 0.3s;
  }
  .ripple-btn:hover {
    background:
      radial-gradient(#ffffff22 1px, transparent 1px) 0 0/3px 3px,
      radial-gradient(#ffffff22 1px, transparent 1px) 1.5px 1.5px/3px 3px,
      linear-gradient(to right, #28364a, #162033);
  }
  .ripple-btn.buy {
    width: 300px;
    background: linear-gradient(45deg, #00ffee88, #32046388, #eeaaffbb);
    background-size: 200% 200%;
    margin-top: 12px;
    animation: gift-gradient 8s linear infinite;
  }
  .ripple-btn.gift {
    width: 300px;
    background: linear-gradient(30deg, #e0990bcc, #c53a2dee, #ec7c32bb);
    background-size: 200% 200%;
    margin-top: 12px;
    animation: gift-gradient 4s linear infinite;
  }
  .ripple-box {
    pointer-events: none;
    position: absolute;
    inset: 0;
  }
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: #0077ff88;
    transform: scale(0);
    animation: ripple 0.6s linear;
  }
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  @keyframes gift-gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
</style>
