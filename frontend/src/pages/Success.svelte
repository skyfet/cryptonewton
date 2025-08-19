<script>
  import { onMount } from "svelte";
  import { navigate } from "../router.js";
  import RippleButton from "../components/RippleButton.svelte";
  let purchase = null;

  onMount(() => {
    purchase = JSON.parse(localStorage.getItem("lastPurchase") || "null");
  });
</script>

<div class="container">
  <div style="padding: 42px;  overflow: hidden;">
    {#if purchase}
      <h2 class="success">💫 Ваши звёзды в пути!</h2>
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
      >🌟 Купить ещё</RippleButton
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