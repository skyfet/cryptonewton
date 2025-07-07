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
  <div style="margin-top: 0px; margin-bottom: 70px;">
    {#if purchase}
      <h2 class="success">Успешно куплено!</h2>
      <div>
        <h2 class="success amounts">
          {purchase.amount}
          <lottie-player id="stars-bg" src="./1751909616946.json" autoplay loop>
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
  .amounts {
    font-size: 88px;
    display: block;
    position: relative;
  }
  .success {
    color: #ffa;
    font-weight: bold;
    font-size: 47px;
    text-shadow: #fa5 0px 0 10px, #5af 2px 0 20px;
  }

  @keyframes spin {
    0% {
      transform: scale(0) rotate(0deg);
    }
    70% {
      transform: scale(1.2) rotate(360deg);
    }
    100% {
      transform: scale(1) rotate(360deg);
    }
  }
</style>
