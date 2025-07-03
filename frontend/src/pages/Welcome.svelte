<script>
  import { navigate } from '../router.js';
</script>

<div class="container">
  <button class="btn" on:click={() => navigate('/buy')}>⭐ Купить звёзды</button>
  <button class="btn" on:click={() => navigate('/history')}>История покупок</button>
</div>
