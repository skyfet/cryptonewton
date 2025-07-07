<script>
  import { onMount } from "svelte";
  import HistoryCard from "../components/HistoryCard.svelte";

  let records = [];

  onMount(() => {
    records = JSON.parse(localStorage.getItem("history") || "[]").reverse();
  });
</script>

{#if records.length}
  <h2 class="fancy-text">История</h2>
  <div>
    {#each records as r}
      <HistoryCard record={r} />
    {/each}
  </div>
{/if}
