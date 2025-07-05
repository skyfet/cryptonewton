<script>
  export let record;
  let open = false;
  let avatar = '';
  $: {
    if (record.type === 'giftReceived') avatar = '🎁💫';
    else if (record.type === 'giftSent') avatar = '🎁☁️';
    else avatar = '💱⭐';
  }
  function toggle() {
    open = !open;
  }
</script>

<div class="card" on:click={toggle}>
  <div class="summary">
    <span class="avatar">{avatar}</span>
    <span class="date">{new Date(record.time).toLocaleDateString()}</span>
    <span>{record.amount} ⭐</span>
  </div>
  {#if open}
    <div class="details">
      {#if record.fiat}
        <p>${record.fiat.toFixed(2)}</p>
      {/if}
      {#if record.toId}
        <p>Кому: {record.toId}</p>
      {/if}
      {#if record.fromId}
        <p>От кого: {record.fromId}</p>
      {/if}
      <p>{new Date(record.time).toLocaleString()}</p>
    </div>
  {/if}
</div>

<style>
  .card {
    background: #163024;
    color: #ecfdf5;
    border: 1px solid #265e2f;
    border-radius: 8px;
    padding: 12px;
    margin-bottom: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
  .summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    font-weight: bold;
  }
  .avatar {
    font-size: 24px;
  }
  .date {
    flex: 1;
  }
  .details {
    margin-top: 8px;
    font-size: 14px;
    color: var(--tg-hint-color, #cbd5e1);
  }
</style>
