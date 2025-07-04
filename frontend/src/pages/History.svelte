<script>
  import { onMount } from 'svelte'
  import HistoryCard from '../components/HistoryCard.svelte'

  let records = []

  onMount(() => {
    records = JSON.parse(localStorage.getItem('history') || '[]')
  })
</script>

<div class="container">
  <h2 class="fancy-text">История</h2>
  {#if records.length === 0}
    <p>Вы сами пишете свою историю</p>
  {:else}
    <div>
      {#each records as r}
        <HistoryCard record={r} />
      {/each}
    </div>
  {/if}
</div>
