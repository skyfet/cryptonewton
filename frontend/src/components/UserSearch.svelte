<script>
  import { searchUser } from '../api.js'
  let query = ''
  async function search() {
    const result = await searchUser(query.trim())
    if (result) {
      const params = new URLSearchParams(window.location.search)
      params.set('user_id', result.id)
      params.set('username', result.username)
      window.location.search = params.toString()
    } else {
      alert('Пользователь не найден')
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
