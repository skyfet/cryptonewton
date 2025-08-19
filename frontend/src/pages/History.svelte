<script>
  import { onMount } from "svelte";
  import HistoryCard from "../components/HistoryCard.svelte";

  let records = [];

  onMount(() => {
    records = JSON.parse(localStorage.getItem("history") || "[]").reverse();
  });
</script>

{#if records.length}
  <h2 class="fancy-text" style="margin-top: 40px; background: linear-gradient(90deg, #8c00ff, #f97400, #00e0ff, #8c00ff); background-size: 200% 200%; -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: gradient-move 3s linear infinite;">История</h2>
  <div class="history__container">
    {#each records as r}
      <HistoryCard record={r} />
    {/each}
  </div>
  <style>
    @keyframes gradient-move {
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
    .fancy-text {
      background: linear-gradient(90deg, #8c00ff, #f97400, #00e0ff, #8c00ff);
      background-size: 200% 200%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: gradient-move 3s linear infinite;
      font-weight: 500;
    }
  </style>
{/if}
