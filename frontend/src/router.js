import { writable } from 'svelte/store'

function getPath() {
  const hash = window.location.hash.slice(1)
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
