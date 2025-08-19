<script>
  import AmountPicker from "../components/AmountPicker.svelte";
  import LoadingOverlay from "../components/LoadingOverlay.svelte";
  import { navigate } from "../router.js";
  import RippleButton from "../components/RippleButton.svelte";
  import { ArrowLeft } from "@lucide/svelte";
  const PRICE_RUB = 1.42;
  let amount = 0;
  let loading = false;

  async function confirm() {
    const userId = window.Telegram.WebApp.initDataUnsafe?.user?.id || 0;
    // if (!userId || amount < 1) return;
    loading = true;
    await new Promise((r) => setTimeout(r, 5000));
    const tx = {
      type: "purchase",
      amount,
      fiat: amount * PRICE_RUB,
      time: Date.now(),
    };
    const history = JSON.parse(localStorage.getItem("history") || "[]");
    history.push(tx);
    localStorage.setItem("history", JSON.stringify(history));
    localStorage.setItem("lastPurchase", JSON.stringify(tx));
    loading = false;
    navigate("/success");
  }

  function onPickAmount(val) {
    if (val > 10000) {
      return;
    }
    if (val < 1) {
      return;
    }
    amount = val;
  }
</script>

<div style="color: #fff;">
  <RippleButton onClick={() => navigate("/")}><ArrowLeft /></RippleButton>
  <h2 style="display: inline-block;">Пополнение Звёзд</h2>
</div>
<AmountPicker onSelect={onPickAmount} />
<RippleButton
  kind="buy"
  onClick={confirm}
  disabled={loading}
  style="margin-top: 8px;"
>
  Купить{parseInt(amount) || 0 ? " за " + amount * PRICE_RUB + "₽" : ""}
</RippleButton>

{#if loading}
  <LoadingOverlay />
{/if}
