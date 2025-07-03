<script>
  import { navigate } from "../router.js";
  import History from "./History.svelte";
</script>

<div class="container">
  <h1 class="header">Star ⭐ Pay Terminal</h1>
  <div style="display: flex; justify-content: space-evenly; flex-direction: column;">
    <button class="btn" on:click={() => navigate("/buy")}
      >🌟 Купить звёзды</button
    >
    <button class="btn" on:click={() => navigate("/buy")}
      >🎁 Подарить звёзды</button
    >
  </div>
  <History></History>
</div>
