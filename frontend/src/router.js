import { writable } from 'svelte/store'

function getPath() {
  let hash = window.location.hash.slice(1)

  // move query params from hash to search
  const idx = hash.indexOf('?')
  if (idx !== -1) {
    const query = hash.slice(idx + 1)
    hash = hash.slice(0, idx)
    const params = new URLSearchParams(window.location.search)
    for (const [k, v] of new URLSearchParams(query)) {
      params.set(k, v)
    }
    const search = params.toString()
    window.history.replaceState(
      null,
      '',
      `${window.location.pathname}${search ? `?${search}` : ''}#${hash}`
    )
  }

  if (hash.endsWith('/')) hash = hash.slice(0, -1)

  if (hash) return hash
  const params = new URLSearchParams(window.location.search)
  if (params.get('mode') === 'gift' || params.has('user_id')) {
    return '/gift'
  }
  if (params.get('mode') === 'buy') return '/buy'
  return '/'
}

export const route = writable(getPath())

export function navigate(path) {
  window.location.hash = path
  route.set(path)
}

window.addEventListener('hashchange', () => {
  route.set(getPath())
})
