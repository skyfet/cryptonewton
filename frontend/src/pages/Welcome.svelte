<script>
  import { navigate } from "../router.js";
  import History from "./History.svelte";
  import RippleButton from "../components/RippleButton.svelte";
  import "@lottiefiles/lottie-player";
</script>

<div class="cosmo-bg">
  <lottie-player
    id="cosmo"
    src="/src/assets/1751881123755.json"
    autoplay
    loop
    on:load={handleLoad}
  >
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
  .button-group {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  #cosmo {
    width: 100%;
    height: auto;
    object-fit: cover;
    object-position: center;
    display: block;
  }

  .cosmo-bg {
    position: absolute;
    inset: 0;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
  }
  .cosmo-header {
    margin-top: 46px;
    margin-bottom: 64px;
  }

  @media screen and (min-width: 444px) and (max-width: 749px) {
    .cosmo-header {
      margin-top: 120px;
      margin-bottom: 180px;
    }
  }
  @media screen and (min-width: 750px) {
    .cosmo-header {
      margin-top: 0px;
      margin-bottom: 20px;
    }
  }
</style>
