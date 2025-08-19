<script>
  import AmountPicker from "../components/AmountPicker.svelte";
  import UsernameDisplay from "../components/UsernameDisplay.svelte";
  import LoadingOverlay from "../components/LoadingOverlay.svelte";
  import UserSearch from "../components/UserSearch.svelte";

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
  let errors = {};
  let usernameInput = "";

  function validateForm() {
    errors = {};

    // Validate username
    if (!usernameInput.trim()) {
      errors.username = "Введите имя пользователя";
    } else if (usernameInput.trim().length < 3) {
      errors.username = "Имя пользователя должно содержать минимум 3 символа";
    }

    // Validate amount
    if (!amount || amount < 1) {
      errors.amount = "Минимальная сумма подарка: 1 звезда";
    } else if (amount > 1000) {
      errors.amount = "Максимальная сумма подарка: 1000 звёзд";
    } else if (isNaN(amount)) {
      errors.amount = "Введите число";
    }

    return Object.keys(errors).length === 0;
  }

  async function confirm() {
    if (!validateForm()) {
      return;
    }

    // const fromId = window.Telegram.WebApp.initDataUnsafe?.user?.id || 0;
    loading = true;

    try {
      // if (!fromId || !toId || amount < 1) return;
      await new Promise((r) => setTimeout(r, 2000));

      // gift(fromId, parseInt(toId, 10), amount).then((res) => {
      // if (res.ok) {
      const tx = {
        type: "giftSent",
        toId: parseInt(toId, 10),
        toUsername: usernameInput.trim(),
        amount,
        time: Date.now(),
      };
      const history = JSON.parse(localStorage.getItem("history") || "[]");
      history.push(tx);
      localStorage.setItem("history", JSON.stringify(history));
      localStorage.setItem("lastPurchase", JSON.stringify(tx));

      navigate("/success");
      // } else {
      // alert(res.error);
      // }
      // });
    } catch (error) {
      errors.general =
        "Произошла ошибка при отправке подарка. Попробуйте еще раз.";
    } finally {
      loading = false;
    }
  }
</script>

<div style="color: #222;">
  <RippleButton onClick={() => navigate("/")}><ArrowLeft /></RippleButton>
  <h2 style="display: inline;">Подарок Другу</h2>
</div>

<div style="margin-bottom: 16px;">
  <input
    placeholder="Username"
    autocomplete="off"
    name="username"
    type="text"
    bind:value={usernameInput}
    class:error={errors.username}
    style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-size: 16px;"
  />
  {#if errors.username}
    <div style="color: #e74c3c; font-size: 14px; margin-top: 4px;">
      {errors.username}
    </div>
  {/if}
</div>

{#if toId}
  <UsernameDisplay username={username || `#${toId}`} />
{/if}

<AmountPicker onSelect={(val) => (amount = val)} />
{#if errors.amount}
  <div style="color: #e74c3c; font-size: 14px; margin-top: 4px;">
    {errors.amount}
  </div>
{/if}

{#if errors.general}
  <div
    style="color: #e74c3c; font-size: 14px; margin: 8px 0; padding: 8px; background: #fdf2f2; border-radius: 4px;"
  >
    {errors.general}
  </div>
{/if}

<RippleButton
  disabled={loading}
  kind="buy"
  onClick={confirm}
  style="margin-top: 8px;"
>
  Подарить{parseInt(amount) || 0 ? " за " + amount * PRICE_RUB + "₽" : ""}
</RippleButton>

{#if loading}
  <LoadingOverlay />
{/if}

<style>
  .error {
    border-color: #e74c3c !important;
  }
</style>
