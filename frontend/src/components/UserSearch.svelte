<script>
  let query = ''
  function search() {
    const tg = window.Telegram.WebApp
    if (tg?.switchInlineQuery) {
      tg.switchInlineQuery(query)
    }
  }
</script>

  <div class="search-box">
    <input
      placeholder="Поиск получателя"
      bind:value={query}
      on:keydown={(e) => e.key === 'Enter' && search()}
    />
    <button on:click={search}>Найти в Telegram</button>
  </div>

<style>
  .search-box input {
    width: 100%;
    padding: 8px;
    margin: 10px 0;
    border-radius: 4px;
    border: 1px solid #265e2f;
    background: var(--tg-secondary-bg-color, #0f172a);
    color: var(--tg-text-color, #fff);
  }
</style>
