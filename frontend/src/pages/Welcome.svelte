<script>
  import { navigate } from "../router.js";
  import History from "./History.svelte";
  import RippleButton from "../components/RippleButton.svelte";
  import Meteors from "../components/Meteors.svelte";
</script>

<div class="container">
  <div
    class="relative flex h-fit w-full max-w-lg items-center justify-center overflow-hidden rounded-lg border bg-background p-20 md:shadow-xl"
  >
    <Meteors number={30} />
    <p
      class="z-10 whitespace-pre-wrap text-center text-5xl tracking-tight font-semibold bg-gradient-to-br from-white to-blue-900/40 text-transparent bg-clip-text"
    >
      Star ⭐ Pay Terminal
    </p>
  </div>

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
