<script>
  import { onMount } from "svelte";
  import { route } from "./router.js";
  import { initTelegram } from "./tg.js";
  import Welcome from "./pages/Welcome.svelte";
  import Buy from "./pages/Buy.svelte";
  import Gift from "./pages/Gift.svelte";
  import Success from "./pages/Success.svelte";
  import History from "./pages/History.svelte";
  import "@lottiefiles/lottie-player";

  let current = window.location.hash.slice(1) || "/";

  const pages = {
    "/": Welcome,
    "/buy": Buy,
    "/gift": Gift,
    "/success": Success,
    "/history": History,
  };

  onMount(() => {
    initTelegram();
    return route.subscribe((v) => (current = v));
  });

  $: Component = pages[current] || Welcome;
</script>

<header class="header">
  <div
    style="display: flex; justify-content: space-evenly; padding: 24px; width: 100%; font-size: 12px; color: #eee8;"
  >
    <a target="policy" href="https://telegra.ph/POLITIKA-KONFIDENCIALNOSTI-PO-RABOTE-S-PERSONALNYMI-DANNYMI-POLZOVATELEJ-03-30">Политика конфиденциальности</a>
    <a target="agreement" href="https://telegra.ph/Polzovatelskoe-soglashenie-Publichnaya-oferta-08-05">Пользовательское соглашение</a>
  </div>
</header>
<div class="cosmo-bg">
  <lottie-player id="cosmo" src="./1751881123755.json" autoplay loop>
  </lottie-player>
</div>
<div style="padding: 24px; display: flex; justify-content: center; flex-direction: column">
  <svelte:component this={Component} />
</div>

<style>
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
</style>
