<script>
  import { navigate } from "../router.js";
  import History from "./History.svelte";
  import RippleButton from "../components/RippleButton.svelte";

</script>

<h2>Star ⭐ Pay Terminal</h2>
<p></p>
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
