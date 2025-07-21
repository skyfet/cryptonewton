<script>
  export let record;
  let avatar = "";
  $: {
    if (record.type === "giftReceived" || record.type === "giftSent")
      avatar = "🎁";
    // else if (record.type === 'giftSent') avatar = '🎁☁️';
    else avatar = "";
  }
</script>

<div class="card">
  <p>
    <span style="flex: 1;">{avatar}</span>
    {#if record.fiat}
      <span style="flex: 1;">{record.fiat.toFixed(2)}₽</span>
    {/if}
    <!-- {#if record.type === "giftSent"}
      <span>отправлено {record.toId}</span>
    {/if}
    {#if record.type === "giftReceived"}
      <span>получено от {record.fromId}</span>
    {/if} -->
  </p>
  <p class="avatar" style="flex: 1; text-align: right;">{record.amount} ⭐</p>
  <p style="flex: 0; text-align: right;">
    {new Date(record.time).toLocaleString().replace(", ", "\n")}
  </p>
</div>

<style>
  .card {
    background: #26224b;
    color: #fff;
    /* border: 1px solid #265e2f; */
    border-radius: 8px;
    padding: 12px;
    margin-bottom: 10px;
    box-shadow: 0px 0px 4px 1px rgba(53, 93, 126, 0.2);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    font-weight: bold;
    font-size: 12px;
  }
  .avatar {
    font-size: 18px;
  }
</style>
