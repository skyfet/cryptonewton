<script>
  import { onMount } from 'svelte';
  import { navigate } from '../router.js';
  let purchase = null;

  onMount(() => {
    purchase = JSON.parse(localStorage.getItem('lastPurchase') || 'null');
  });
</script>

<div class="container">
  <div class="star sparkle">⭐</div>
  {#if purchase}
    <p>Вы купили {purchase.amount} ⭐ за ${purchase.fiat.toFixed(2)}</p>
    <p class="time">{new Date(purchase.time).toLocaleString()}</p>
  {/if}
  <button class="btn" on:click={() => navigate('/')}>На главную</button>
</div>

<style>
.star {
  font-size: 64px;
  animation: spin 1.5s ease;
  margin: 20px auto;
}
@keyframes spin {
  0% { transform: scale(0) rotate(0deg); }
  70% { transform: scale(1.2) rotate(360deg); }
  100% { transform: scale(1) rotate(360deg); }
}
.time {
  font-size: 14px;
  color: var(--tg-hint-color, #888);
}
</style>
