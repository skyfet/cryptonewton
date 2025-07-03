<script>
  export let onSelect = () => {};
  let custom = '';
  let selected = null;
  const PRESETS = [50, 150, 250, 500, 1000, 2500];

  function choose(a) {
    selected = a;
    custom = '';
    onSelect(a);
  }
</script>

<div>
  <div class="amounts">
    {#each PRESETS as a}
      <div class="amount {selected === a ? 'selected' : ''}" on:click={() => choose(a)}>{a}</div>
    {/each}
    <div class="amount {selected === 'custom' ? 'selected' : ''}" on:click={() => choose('custom')}>Ввести</div>
  </div>
  {#if selected === 'custom'}
    <input type="number" bind:value={custom} on:input={() => onSelect(parseInt(custom) || 0)} min="1" max="250000" />
  {/if}
</div>
