<script>
  import { navigate } from '../router.js';
  import History from './History.svelte';
</script>

<div class="container">
  <h2 class="header">
    Star ⭐ Pay Terminal
  </h2>
  <button class="btn" on:click={() => navigate('/buy')}>🌟 Купить звёзды</button>
  <button class="btn" on:click={() => navigate('/buy')}>🎁 Подарить звёзды</button>
  <History></History>
</div>
