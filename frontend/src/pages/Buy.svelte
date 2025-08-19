<script>
  import AmountPicker from "../components/AmountPicker.svelte";
  import LoadingOverlay from "../components/LoadingOverlay.svelte";
  import { navigate } from "../router.js";
  import { purchase } from "../api.js";
  import RippleButton from "../components/RippleButton.svelte";
  import { ArrowLeft } from "@lucide/svelte";
  const PRICE_RUB = 1.42;
  let amount = 0;
  let loading = false;
  let error = "";
  let success = "";

  function validateAmount(val) {
    if (!val || val < 1) {
      return "Минимальная сумма покупки: 1 звезда";
    }
    if (val > 10000) {
      return "Максимальная сумма покупки: 10,000 звезд";
    }
    if (Number.isNaN(val)) {
      return "Введите число";
    }
    return null;
  }

  function validateUser() {
    const userId = window.Telegram.WebApp.initDataUnsafe?.user?.id;
    if (!userId) {
      return "Ошибка авторизации. Пожалуйста, перезапустите приложение.";
    }
    return null;
  }

  async function confirm() {
    // Очищаем предыдущие сообщения
    error = "";
    success = "";

    // Валидация пользователя
    const userError = validateUser();
    if (userError) {
      error = userError;
      return;
    }

    // Валидация суммы
    const amountError = validateAmount(amount);
    if (amountError) {
      error = amountError;
      return;
    }

    const userId = window.Telegram.WebApp.initDataUnsafe?.user?.id;
    loading = true;
    
    try {
      const result = await purchase(userId, amount);
      
      if (result.ok) {
        const tx = {
          type: "purchase",
          amount,
          fiat: amount * PRICE_RUB,
          time: Date.now(),
          userId,
        };
        const history = JSON.parse(localStorage.getItem("history") || "[]");
        history.push(tx);
        localStorage.setItem("history", JSON.stringify(history));
        localStorage.setItem("lastPurchase", JSON.stringify(tx));
        success = "Покупка успешно совершена!";
        
        // Переход на страницу успеха через небольшую задержку
        setTimeout(() => {
          navigate("/success");
        }, 500);
      } else {
        error = "Ошибка при совершении покупки. Попробуйте еще раз.";
      }
    } catch (err) {
      error = "Произошла ошибка при совершении покупки. Попробуйте еще раз.";
      console.error("Purchase error:", err);
    } finally {
      loading = false;
    }
  }

  function onPickAmount(val) {
    // Очищаем ошибки при изменении суммы
    error = "";
    success = "";
    
    if (val > 10000) {
      error = "Максимальная сумма покупки: 10,000 звезд";
      return;
    }
    if (val < 1) {
      error = "Минимальная сумма покупки: 1 звезда";
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

{#if error}
  <div style="color: #ff6b6b; background: rgba(255, 107, 107, 0.1); padding: 12px; border-radius: 8px; margin: 8px 0; border: 1px solid rgba(255, 107, 107, 0.3);">
    {error}
  </div>
{/if}

{#if success}
  <div style="color: #51cf66; background: rgba(81, 207, 102, 0.1); padding: 12px; border-radius: 8px; margin: 8px 0; border: 1px solid rgba(81, 207, 102, 0.3);">
    {success}
  </div>
{/if}

<RippleButton
  kind="buy"
  onClick={confirm}
  disabled={loading || !amount || amount < 1 || amount > 10000}
  style="margin-top: 8px;"
>
  Купить{parseInt(amount) || 0 ? " за " + amount * PRICE_RUB + "₽" : ""}
</RippleButton>

{#if loading}
  <LoadingOverlay />
{/if}
