<script>
  export let record;
  let open = false;
  function toggle() {
    open = !open;
  }
</script>

<div class="card" on:click={toggle}>
  <div class="summary">
    <span>{new Date(record.time).toLocaleDateString()}</span>
    <span>{record.amount} ⭐</span>
  </div>
  {#if open}
    <div class="details">
      <p>${record.fiat.toFixed(2)}</p>
      <p>{new Date(record.time).toLocaleString()}</p>
    </div>
  {/if}
</div>

<style>
  .card {
    background: #fff;
    color: #000;
    border-radius: 8px;
    padding: 12px;
    margin-bottom: 10px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    cursor: pointer;
  }
  .summary {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
  }
  .details {
    margin-top: 8px;
    font-size: 14px;
    color: #555;
  }
</style>
