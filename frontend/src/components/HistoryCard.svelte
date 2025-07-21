<script>
  export let record;
  let avatar = "";
  $: {
    if (record.type === "giftReceived" || record.type === "giftSent")
      avatar = "🎁";
    // else if (record.type === 'giftSent') avatar = '🎁☁️';
    else avatar = "$";
  }
</script>

<div class="card">
  <p class="avatar">
    {avatar}
    {#if record.fiat}
      <span>{record.fiat.toFixed(2)}₽</span>
    {/if}
    {#if record.type === "giftSent"}
      <span>отправлено {record.toId}</span>
    {/if}
    {#if record.type === "giftReceived"}
      <span>получено от {record.fromId}</span>
    {/if}
  </p>
  <p class="avatar">{record.amount} ⭐</p>
  <p>{new Date(record.time).toLocaleString()}</p>
</div>

<style>
  .card {
    background: #26224b;
    color: #fff;
    border: 1px solid #265e2f;
    border-radius: 8px;
    padding: 12px;
    margin-bottom: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    font-weight: bold;
  }
  .avatar {
    font-size: 18px;
  }
</style>
