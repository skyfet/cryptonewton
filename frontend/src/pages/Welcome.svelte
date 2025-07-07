<script>
  import { navigate } from "../router.js";
  import History from "./History.svelte";
  import RippleButton from "../components/RippleButton.svelte";
  import "@lottiefiles/lottie-player";
</script>

<div class="cosmo-bg">
  <lottie-player id="cosmo" src="./1751881123755.json" autoplay loop>
  </lottie-player>
</div>
<h2 class="cosmo-header">Star ⭐ Pay Terminal</h2>
<div class="container">
  <div class="button-group">
    <RippleButton kind="buy" onClick={() => navigate("/buy")}
      >🌟 Купить звёзды</RippleButton
    >
    <RippleButton kind="gift" onClick={() => navigate("/gift")}
      >🎁 Подарить звёзды</RippleButton
    >
  </div>
  <History></History>
</div>

<style>
  .container {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .button-group {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  #cosmo {
    position: absolute;
    width: 100vw;
    height: auto;
    pointer-events: none; /* важно для кликов */
  }

  .cosmo-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    z-index: -1;
  }

  .cosmo-header {
    margin-top: 46px;
    margin-bottom: 64px;
  }
  @media screen and (orientation: portrait) {
    #cosmo {
      transform: translate(-50%, -50%);
      top: 50%;
      min-width: 200vh;
      left: 10%;
      animation: gift-gradient 24s ease-in-out infinite;
    }
    @keyframes gift-gradient {
      0% {
        left: 100%;
      }
      50% {
        left: 1%;
      }
      100% {
        left: 100%;
      }
    }
  }

  @media screen and (min-width: 444px) and (max-width: 749px) {
    .cosmo-header {
      margin-top: 80px;
      margin-bottom: 120px;
    }
  }
  @media screen and (min-width: 750px) {
    .cosmo-header {
      margin-top: 0px;
      margin-bottom: 20px;
    }
  }
</style>
