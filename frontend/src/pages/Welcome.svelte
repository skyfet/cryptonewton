<script>
  import { navigate } from "../router.js";
  import History from "./History.svelte";
  import RippleButton from "../components/RippleButton.svelte";
  import "@lottiefiles/lottie-player";
</script>

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

  .cosmo-header {
    margin-top: 46px;
    margin-bottom: 64px;
  }
  @media screen and (orientation: portrait) {
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
