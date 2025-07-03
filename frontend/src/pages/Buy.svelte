<script>
  import AmountPicker from "../components/AmountPicker.svelte";
  import LoadingOverlay from "../components/LoadingOverlay.svelte";
  import { purchase } from "../api.js";
  import { navigate } from "../router.js";
  import { tg } from "../tg.js";
  const PRICE_USD = 0.05;
  let amount = 0;
  let loading = false;

  async function confirm() {
    const userId = tg.initDataUnsafe?.user?.id;
    if (!userId || amount < 1) return;
    loading = true;
    await new Promise(r => setTimeout(r, 2000));
    const tx = {
      amount,
      fiat: amount * PRICE_USD,
      time: Date.now()
    };
    const history = JSON.parse(localStorage.getItem('history') || '[]');
    history.push(tx);
    localStorage.setItem('history', JSON.stringify(history));
    localStorage.setItem('lastPurchase', JSON.stringify(tx));
    loading = false;
    navigate('/success');
  }
</script>

<div class="container">
  <h2><button class="btn" on:click={() => navigate("/")}>🢀</button> Сколько желаете?</h2>
  <AmountPicker onSelect={(val) => (amount = val)} />

  <button style="margin-top: 8px;" class="btn" on:click={confirm} disabled={loading}>Купить</button>
</div>

{#if loading}
  <LoadingOverlay />
{/if}
