import { writable } from 'svelte/store'

export const route = writable(window.location.pathname || '/')

export function navigate(path) {
  history.pushState({}, '', path + window.location.search)
  route.set(path)
}

window.addEventListener('popstate', () => {
  route.set(window.location.pathname || '/')
})
