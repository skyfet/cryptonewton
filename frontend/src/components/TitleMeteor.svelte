<script>
  import Meteors from "./Meteors.svelte";
</script>

<div
  class="relative flex w-full max-w-lg items-center justify-center overflow-hidden rounded-lg border bg-background p-20"
>
  <Meteors number={30} />
  <p
    class="whitespace-pre-wrap text-center text-5xl tracking-tight font-semibold bg-gradient-to-br from-white to-blue-900/40 text-transparent bg-clip-text"
  >
    Star ⭐ Pay Terminal
  </p>
</div>