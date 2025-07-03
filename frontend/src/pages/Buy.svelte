<script>
  import AmountPicker from '../components/AmountPicker.svelte';
  import { purchase } from '../api.js';
  import { navigate } from '../router.js';
  import { tg } from '../tg.js';
  let amount = 0;

  function confirm() {
    const userId = tg.initDataUnsafe?.user?.id;
    if (!userId || amount < 1) return;
    purchase(userId, amount).then(res => {
      if (res.ok) navigate('/success');
      else alert(res.error);
    });
  }
</script>

<div class="container">
  <AmountPicker onSelect={val => amount = val} />
  <button class="btn" on:click={confirm}>Купить</button>
</div>
