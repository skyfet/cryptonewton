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
        {a}  {selected != a ? '⭐' : '🌟'}
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
      <input
        bind:this={amountInput}
        class="amount {selected === 'custom' ? 'selected' : ''}"
        type="number"
        bind:value={custom}
        on:input={() => onSelect(parseInt(custom) || 0)}
        min="1"
        max="250000"
      /> 
      <span style="margin-left: -38px; margin-top: 8px;">⭐</span>
    {/if}
  </div>
</div>
