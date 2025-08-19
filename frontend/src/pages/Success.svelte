<script>
  import { onMount } from "svelte";
  import { navigate } from "../router.js";
  import RippleButton from "../components/RippleButton.svelte";
  let purchase = null;

  onMount(() => {
    purchase = JSON.parse(localStorage.getItem("lastPurchase") || "null");
  });

  function formatUserDisplay() {
    if (!purchase) return '';
    
    if (purchase.type === 'giftSent' && purchase.toFullName) {
      return `${purchase.toFullName} (@${purchase.toUsername})`;
    } else if (purchase.type === 'giftSent') {
      return `@${purchase.toUsername}`;
    }
    return '';
  }
</script>

<div class="container">
  <div style="padding: 42px 8px;  overflow: hidden;">
    {#if purchase}
      {#if purchase.type === 'giftSent'}
        <h2 class="success">🎁 Подарок отправлен!</h2>
        <div style="margin: 16px 0; text-align: center;">
          <p style="font-size: 18px; color: #666; margin-bottom: 8px;">
            Получатель:
          </p>
          <p style="font-size: 20px; font-weight: 500; color: #333;">
            {formatUserDisplay()}
          </p>
        </div>
      {:else}
        <h2 class="success">💫 Ваши звёзды в пути!</h2>
      {/if}
      
      <div>
        <h2 class="sparkle success amounts">
          {purchase.amount}
          <lottie-player id="stars-bg" src="./1751909760808.json" autoplay loop>
          </lottie-player>
        </h2>
      </div>
      
      {#if purchase.type === 'giftSent'}
        <p style="text-align: center; color: #666; margin-top: 16px;">
          Подарок на сумму {purchase.amount * 1.42}₽
        </p>
      {:else if purchase.fiat}
        <p style="text-align: center; color: #666; margin-top: 16px;">
          за {purchase.fiat.toFixed(2)}₽
        </p>
      {/if}
      
      <p class="time">{new Date(purchase.time).toLocaleString()}</p>
    {/if}
  </div>

  <div class="button-group">
    <RippleButton kind="buy" onClick={() => navigate("/buy")}
      >🌟 Купить звёзды</RippleButton
    >
    <RippleButton kind="gift" onClick={() => navigate("/gift")}
      >🎁 Подарить другу</RippleButton
    >
    <RippleButton onClick={() => navigate("/")}>На главную</RippleButton>
  </div>
</div>

<style>
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
  .time {
    text-align: center;
    color: #666;
    font-size: 14px;
    margin-top: 16px;
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
        rgba(104, 129, 155, 155) 2px 0 50px;
    }
  }
</style>