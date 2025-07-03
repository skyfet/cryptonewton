<script>
  import { onMount } from 'svelte'

  let records = []

  onMount(() => {
    records = JSON.parse(localStorage.getItem('history') || '[]')
  })
</script>

<div class="container">
  <h2>/history</h2>
  {#if records.length === 0}
    <p>Вы сами пишете свою историю</p>
  {:else}
    <ul>
      {#each records as r}
        <li>{new Date(r.time).toLocaleDateString()} - {r.amount} ⭐ - ${r.fiat.toFixed(2)}</li>
      {/each}
    </ul>
  {/if}
</div>
