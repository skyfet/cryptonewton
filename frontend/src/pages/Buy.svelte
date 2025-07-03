<script>
  import AmountPicker from '../components/AmountPicker.svelte';
  import { purchase } from '../api.js';
  import { navigate } from '../router.js';
  import { tg } from '../tg.js';
  let amount = 0;
  let loading = false;

  async function confirm() {
    const userId = tg.initDataUnsafe?.user?.id;
    if (!userId || amount < 1) return;
    loading = true;
    const res = await purchase(userId, amount);
    loading = false;
    if (res.ok) navigate('/success');
    else alert(res.error);
  }
</script>

  <div class="container">
    {#if loading}
      <p>Загрузка...</p>
    {/if}
    <AmountPicker onSelect={val => amount = val} />
    <button class="btn" on:click={confirm} disabled={loading}>Купить</button>
  </div>
