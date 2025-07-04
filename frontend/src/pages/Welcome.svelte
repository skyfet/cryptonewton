<script>
  import { navigate } from "../router.js";
  import History from "./History.svelte";
  import RippleButton from "../components/RippleButton.svelte";
  import Meteors from "../components/Meteors.svelte";
    import TitleMeteor from "../components/TitleMeteor.svelte";
  // import Meteors from "svelte-animations";

</script>

<TitleMeteor></TitleMeteor>
<div class="container">
  <div class="button-group">
    <RippleButton onClick={() => navigate("/buy")}
      >🌟 Купить звёзды</RippleButton
    >
    <RippleButton onClick={() => navigate("/buy")}
      >🎁 Подарить звёзды</RippleButton
    >
  </div>
  <History></History>
</div>
