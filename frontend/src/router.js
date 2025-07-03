import { writable } from 'svelte/store'

function getPath() {
  return window.location.hash.slice(1) || '/'
}

export const route = writable(getPath())

export function navigate(path) {
  window.location.hash = path
  route.set(path)
}

window.addEventListener('hashchange', () => {
  route.set(getPath())
})
