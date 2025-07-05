<script>
  import AmountPicker from "../components/AmountPicker.svelte";
  import LoadingOverlay from "../components/LoadingOverlay.svelte";
  import { navigate } from "../router.js";
  import RippleButton from "../components/RippleButton.svelte";
  import { ArrowLeft } from "@lucide/svelte";
  const PRICE_USD = 0.05;
  let amount = 0;
  let loading = false;

  async function confirm() {
    const userId = window.Telegram.WebApp.initDataUnsafe?.user?.id;
    if (!userId || amount < 1) return;
    loading = true;
    await new Promise((r) => setTimeout(r, 2000));
    const tx = {
      type: "purchase",
      amount,
      fiat: amount * PRICE_USD,
      time: Date.now(),
    };
    const history = JSON.parse(localStorage.getItem("history") || "[]");
    history.push(tx);
    localStorage.setItem("history", JSON.stringify(history));
    localStorage.setItem("lastPurchase", JSON.stringify(tx));
    loading = false;
    navigate("/success");
  }
</script>

<div class="container">
  <RippleButton onClick={() => navigate("/")}><ArrowLeft /></RippleButton>
  <h2>Сколько желаете?</h2>
  <AmountPicker onSelect={(val) => (amount = val)} />

  <RippleButton
    kind="buy"
    onClick={confirm}
    disabled={loading}
    style="margin-top: 8px;">Купить</RippleButton
  >
</div>

{#if loading}
  <LoadingOverlay />
{/if}
