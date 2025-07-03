<script>
  import { onMount } from 'svelte'
  import { getHistory } from '../api.js'
  import { tg } from '../tg.js'

  let records = []

  onMount(async () => {
    const userId = tg.initDataUnsafe?.user?.id
    if (userId) {
      records = await getHistory(userId)
    }
  })
</script>

<div class="container">
  <h2>История покупок</h2>
  {#if records.length === 0}
    <p>Нет записей</p>
  {:else}
    <ul>
      {#each records as r}
        <li>{new Date(r.time).toLocaleDateString()} - {r.amount} ⭐ - ${r.fiat.toFixed(2)}</li>
      {/each}
    </ul>
  {/if}
</div>
