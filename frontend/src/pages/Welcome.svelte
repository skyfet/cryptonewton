<script>
  import { navigate } from "../router.js";
  import History from "./History.svelte";
  import RippleButton from "../components/RippleButton.svelte";
</script>

<div class="container">
  <h1 class="header fancy-text">Star ⭐ Pay Terminal</h1>
  <div class="button-group">
    <RippleButton onClick={() => navigate("/buy")}>🌟 Купить звёзды</RippleButton>
    <RippleButton onClick={() => navigate("/buy")}>🎁 Подарить звёзды</RippleButton>
  </div>
  <History></History>
</div>
