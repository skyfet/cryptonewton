<script>
  import AmountPicker from "../components/AmountPicker.svelte";
  import UsernameDisplay from "../components/UsernameDisplay.svelte";
  import LoadingOverlay from "../components/LoadingOverlay.svelte";

  import { navigate } from "../router.js";
  // import { gift } from "../api.js";
  import RippleButton from "../components/RippleButton.svelte";
  import { ArrowLeft } from "@lucide/svelte";
  const PRICE_RUB = 1.42;

  let amount = 0;
  const params = new URLSearchParams(window.location.search);
  let toId = params.get("user_id");
  let username = params.get("username") || "";
  let loading = false;

  async function confirm() {
    const fromId = window.Telegram.WebApp.initDataUnsafe?.user?.id || 0;
    loading = true;

    // if (!fromId || !toId || amount < 1) return;
    await new Promise((r) => setTimeout(r, 2000));

    // gift(fromId, parseInt(toId, 10), amount).then((res) => {
    // if (res.ok) {
    const tx = {
      type: "giftSent",
      toId: parseInt(toId, 10),
      amount,
      time: Date.now(),
    };
    const history = JSON.parse(localStorage.getItem("history") || "[]");
    history.push(tx);
    localStorage.setItem("history", JSON.stringify(history));
    navigate("/success");
    // } else {
    // alert(res.error);
    // }
    // });
  }
</script>

<div class="container">
  <div style="color: #222;">
    <RippleButton onClick={() => navigate("/")}><ArrowLeft /></RippleButton>
    <h2 style="display: inline;">Подарок Другу</h2>
  </div>
  <!-- <UserSearch /> -->
  {#if toId}
    <UsernameDisplay username={username || toId} />
  {/if}
  <AmountPicker onSelect={(val) => (amount = val)} />
  <RippleButton
    disabled={loading}
    kind="buy"
    onClick={confirm}
    style="margin-top: 8px;"
  >
    Подарить{parseInt(amount) || 0 ? " за " + amount * PRICE_RUB + "₽" : ""}
  </RippleButton>
</div>

{#if loading}
  <LoadingOverlay />
{/if}
