<script>
  import { onMount } from "svelte";
  import { navigate } from "../router.js";
  import RippleButton from "../components/RippleButton.svelte";
  let purchase = null;
  let errors = [];

  onMount(() => {
    try {
      purchase = JSON.parse(localStorage.getItem("lastPurchase") || "null");
    } catch (error) {
      console.error("Error parsing purchase data:", error);
      errors.push("Ошибка загрузки данных покупки");
    }
  });

  function getSuccessText() {
    if (!purchase) return "💫 Ваши звёзды в пути!";

    if (purchase.type === "giftSent") {
      const texts = [
        "🎁 Подарок отправлен!",
        "🚀 Stars на подлёте к другу!",
        "💫 Чудесный подарок!",
      ];
      return texts[Math.floor(Math.random() * texts.length)];
    }

    const texts = [
      "Сияйте!✨ Stars уже летят к вам!",
      "Ура!✨ Stars летят к вам!",
      "🚀 Звёздный шатл отослан!",
    ];
    return texts[Math.floor(Math.random() * texts.length)];
  }

  function formatUserDisplay() {
    if (!purchase || purchase.type !== "giftSent") return "";

    if (purchase.toFullName) {
      return `${purchase.toFullName} (@${purchase.toUsername})`;
    } else {
      return `@${purchase.toUsername}`;
    }
  }
</script>

<div class="container">
  {#if errors.length > 0}
    <div class="error-container">
      {#each errors as error}
        <div class="error-message">
          ⚠️ {error}
        </div>
      {/each}
    </div>
  {/if}

  <div style="padding: 42px 8px;  overflow: hidden;">
    {#if purchase}
      <h2 class="success">{getSuccessText()}</h2>

      {#if purchase.type === "giftSent" && formatUserDisplay()}
        <div style="margin: 16px 0; text-align: center;">
          <p class="sparkle" style="font-size: 20px; font-weight: 500; color: #eee;">
            {formatUserDisplay()}
          </p>
        </div>
      {/if}

      <div>
        <h2 class="sparkle success amounts">
          {purchase.amount}
          <lottie-player id="stars-bg" src="./1751909760808.json" autoplay loop>
          </lottie-player>
        </h2>
      </div>
      <!-- <p>за ${purchase.fiat.toFixed(2)}₽</p>
      <p class="time">{new Date(purchase.time).toLocaleString()}</p> -->
    {/if}
  </div>

  <div class="button-group">
    <RippleButton kind="buy" onClick={() => navigate("/buy")}
      >🌟 Купить звёзды</RippleButton
    >
    <RippleButton kind="gift" onClick={() => navigate("/gift")}
      >🎁 Подарить другу</RippleButton
    >
    <RippleButton kind="home" onClick={() => navigate("/")}
      >На главную</RippleButton
    >
  </div>
</div>

<style>
  .error-container {
    background: #fee;
    border: 1px solid #fcc;
    border-radius: 8px;
    padding: 12px;
    margin: 16px 8px;
  }
  
  .error-message {
    color: #c33;
    font-size: 14px;
    margin-bottom: 8px;
  }
  
  .error-message:last-child {
    margin-bottom: 0;
  }

  #stars-bg {
    position: absolute;
    top: 0;
    right: 0;
    z-index: -1;
  }
  .success {
    color: #ff5e;
    font-weight: bold;
    font-size: 32px;
    text-shadow:
      #fa58 0px 0 10px,
      #fa58 0px 0 20px,
      #fa58 0px 0 30px,
      rgba(104, 129, 155, 155) 2px 0 20px,
      rgba(104, 129, 155, 155) 2px 0 40px;
    animation: glow 2s ease-in-out infinite alternate;
  }
  .amounts {
    font-size: 88px;
    display: block;
    position: relative;
    text-shadow:
      #fa58 0px 0 15px,
      #fa58 0px 0 30px,
      #fa58 0px 0 45px,
      #fa58 0px 0 60px,
      rgba(104, 129, 155, 155) 2px 0 30px,
      rgba(104, 129, 155, 155) 2px 0 60px;
    animation: glow 2s ease-in-out infinite alternate;
  }
  @keyframes glow {
    from {
      text-shadow:
        #fa58 0px 0 10px,
        #fa58 0px 0 20px,
        #fa58 0px 0 30px,
        rgba(104, 129, 155, 155) 2px 0 20px,
        rgba(104, 129, 155, 155) 2px 0 40px;
    }
    to {
      text-shadow:
        #fa58 0px 0 20px,
        #fa58 0px 0 30px,
        #fa58 0px 0 40px,
        #fa58 0px 0 50px,
        rgba(104, 129, 155, 155) 2px 0 30px,
        rgba(104, 129, 155, 155) 2px 0 60px;
    }
  }
</style>
