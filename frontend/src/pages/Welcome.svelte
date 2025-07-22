<script>
  import { navigate } from "../router.js";
  import History from "./History.svelte";
  import RippleButton from "../components/RippleButton.svelte";
  import "@lottiefiles/lottie-player";
</script>

<h2 class="cosmo-header">Star ⭐ Pay Terminal</h2>
<div class="button-group">
  <RippleButton kind="buy" onClick={() => navigate("/buy")}
    >🌟 Купить звёзды</RippleButton
  >
  <!-- <RippleButton kind="gift" onClick={() => navigate("/gift")}
    >🎁 Подарить звёзды</RippleButton
  > -->
</div>
<History></History>

<style>
  .button-group {
    display: flex;
    justify-content: center;
    align-content: center;
    align-self: center;
    align-items: center;
  }

  .cosmo-header {
    font-family: "Bitcount Prop Single", system-ui;
    font-size: 2.42rem;
    margin-top: 20px;
    margin-bottom: 20px;
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
</style>
