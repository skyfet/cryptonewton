<script>
  import Typeahead from 'svelte-typeahead'
  import { getProfile } from '../api.js'

  let data = []
  let value = ''

  const extract = (item) => item.username

  async function handleInput(e) {
    value = e.detail.value
    if (!value) {
      data = []
      return
    }
    const profile = await getProfile(value.trim())
    data = profile && profile.exists ? [profile] : []
  }

  function selectUser(e) {
    const user = e.detail.original
    if (!user) return
    const params = new URLSearchParams(window.location.search)
    params.set('user_id', user.username)
    params.set('username', user.username)
    window.location.search = params.toString()
  }
</script>

<Typeahead
  {data}
  {value}
  {extract}
  label="Поиск получателя"
  hideLabel
  on:input={handleInput}
  on:select={selectUser}
/>

