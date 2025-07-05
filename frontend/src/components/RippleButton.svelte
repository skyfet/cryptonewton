<script>
  export let onClick = () => {};
  export let disabled = false;
  let ripples = [];

  function createRipple(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    const ripple = { x, y, size, key: Date.now() };
    ripples = [...ripples, ripple];
    setTimeout(() => {
      ripples = ripples.filter(r => r.key !== ripple.key);
    }, 600);
    onClick(event);
  }
</script>

<button class="ripple-btn" on:click={createRipple} disabled={disabled}>
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
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    width: 100%;
    background: transparent;
    color: var(--tg-button-color, #00e5ff);
    border: 2px solid var(--tg-button-color, #00e5ff);
    border-radius: 8px;
    font-size: 16px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    box-shadow: 0 0 8px rgba(0, 229, 255, 0.4);
  }
  .ripple-box {
    pointer-events: none;
    position: absolute;
    inset: 0;
  }
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(0, 229, 255, 0.3);
    transform: scale(0);
    animation: ripple 0.6s linear;
  }
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
</style>
