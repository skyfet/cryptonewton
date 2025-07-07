<script>
  export let onSelect = () => {};
  let custom = "";
  let selected = null;
  const PRESETS = [50, 150, 250, 500, 1000, 2500];

  function choose(a) {
    selected = a;
    custom = "";
    onSelect(a);
  }

  let amountInput;

  function focusAmountInput() {
    amountInput.focus();
  }

  $: if (amountInput) focusAmountInput();
</script>

<div>
  <div class="amounts">
    {#each PRESETS as a}
      <div
        class="amount {selected === a ? 'selected' : ''}"
        on:click={() => choose(a)}
      >
        {a}
        <span class="star {selected === a ? 'sparkle' : ''}">
          {selected === a ? "🌟" : "⭐"}
        </span>
      </div>
    {/each}
    {#if selected != "custom"}
      <div
        class="amount {selected === 'custom' ? 'selected' : ''}"
        on:click={() => choose("custom")}
      >
        Своё
      </div>
    {/if}
    {#if selected === "custom"}
      <div
        class="amount custom-field {selected === 'custom' ? 'selected' : ''}"
      >
        <input
          bind:this={amountInput}
          type="number"
          bind:value={custom}
          on:input={() =>
            onSelect(
              parseInt(custom) || 0 <= 10000
                ? parseInt(custom)
                : parseInt(custom) >= 0
                  ? 10000
                  : 0
            )}
          min="1"
          max="10000"
          
        />
        <span class="star {selected === 'custom' ? 'sparkle' : ''}">⭐</span>
      </div>
    {/if}
  </div>
</div>
