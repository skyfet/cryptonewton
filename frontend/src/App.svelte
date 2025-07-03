<script>
  import { onMount } from 'svelte';
  import { route } from './router.js';
  import { initTelegram } from './tg.js';
  import Welcome from './pages/Welcome.svelte';
  import Buy from './pages/Buy.svelte';
  import Gift from './pages/Gift.svelte';
  import Success from './pages/Success.svelte';

  let current = window.location.hash.slice(1) || '/';

  const pages = {
    '/': Welcome,
    '/buy': Buy,
    '/gift': Gift,
    '/success': Success
  };

  onMount(() => {
    initTelegram();
    return route.subscribe(v => current = v);
  });

  $: Component = pages[current] || Welcome;
</script>

<svelte:component this={Component} />
