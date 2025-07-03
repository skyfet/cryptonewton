<script>
  import AmountPicker from '../components/AmountPicker.svelte';
  import { purchase } from '../api.js';
  import { navigate } from '../router.js';
  import { tg } from '../tg.js';
  let amount = 0;
  let loading = false;
  let done = false;

  async function confirm() {
    const userId = tg.initDataUnsafe?.user?.id;
    if (!userId || amount < 1) return;
    loading = true;
    await new Promise(r => setTimeout(r, 5000));
    const res = await purchase(userId, amount);
    loading = false;
    if (res.ok) {
      done = true;
      await new Promise(r => setTimeout(r, 800));
      navigate('/success');
    } else {
      alert(res.error);
    }
  }
</script>

  <div class="container">
    <AmountPicker onSelect={val => amount = val} />
    <button class="btn" on:click={confirm} disabled={loading}>Купить</button>
  </div>

  {#if loading}
    <div class="overlay">
      <div class="spinner"></div>
      <p>Загрузка...</p>
    </div>
  {:else if done}
    <div class="overlay">
      <div class="check">✓</div>
      <p>Готово</p>
    </div>
  {/if}

  <style>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--tg-bg-color, rgba(255,255,255,0.9));
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid var(--tg-hint-color, #ccc);
    border-top-color: var(--tg-button-color, #0077ff);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 10px;
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .check {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 4px solid var(--tg-button-color, #0077ff);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px auto;
    font-size: 48px;
    color: var(--tg-button-color, #0077ff);
    animation: pop 0.5s ease;
  }
  @keyframes pop {
    0% { transform: scale(0); }
    100% { transform: scale(1); }
  }
  </style>
