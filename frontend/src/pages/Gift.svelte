<script>
  import AmountPicker from '../components/AmountPicker.svelte';
  import UsernameDisplay from '../components/UsernameDisplay.svelte';
  import { navigate } from '../router.js';
  import { tg } from '../tg.js';
  import { gift } from '../api.js';

  let amount = 0;
  const params = new URLSearchParams(window.location.search);
  const toId = params.get('user_id');

  function confirm() {
    const fromId = tg.initDataUnsafe?.user?.id;
    if (!fromId || !toId || amount < 1) return;
    gift(fromId, parseInt(toId, 10), amount).then(res => {
      if (res.ok) navigate('/success');
      else alert(res.error);
    });
  }
</script>

<div class="container">
  <UsernameDisplay username={toId} />
  <AmountPicker onSelect={val => amount = val} />
  <button class="btn" on:click={confirm}>Подарить</button>
</div>
