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
    console.log(amountInput);
    setTimeout(()=> amountInput.focus(), 100);
  }

  $: if (amountInput) focusAmountInput();
</script>

<div class="amounts">
  {#each PRESETS as a}
    <button
      class="amount {selected === a ? 'selected' : ''}"
      on:click={() => choose(a)}
    >
      {a}
      <span class="star {selected === a ? 'sparkle' : ''}">
        {selected === a ? "🌟" : "⭐"}
      </span>
    </button>
  {/each}
</div>
<br />
{#if selected != "custom"}
  <button
    class="amount {selected === 'custom' ? 'selected' : ''}"
    on:click={() => choose("custom")}
  >
    Своё
  </button>
{/if}
<div style="position: relative;">
  {#if selected === "custom"}
    <input
      class="amount"
      name="amount"
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
      min="5"
      max="10000"
    />
    <span
      style="position: absolute; right: 12px; top: 25px; "
      class="star {selected === 'custom' ? 'sparkle' : ''}"
      >{selected === "custom" && custom ? "🌟" : "⭐"}</span
    >
  {/if}
</div>
