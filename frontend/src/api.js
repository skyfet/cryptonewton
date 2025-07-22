const API_BASE = import.meta.env.VITE_API_BASE || 'localhost:3000'

export async function purchase(user_id, amount) {
  const res = await fetch(`${API_BASE}/purchase`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id, amount })
  });
  return res.json();
}

export async function gift(from_id, to_id, amount) {
  const res = await fetch(`${API_BASE}/gift`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ from_id, to_id, amount })
  });
  return res.json();
}

export async function getHistory(user_id) {
  const res = await fetch(`${API_BASE}/history?user_id=${user_id}`)
  return res.json();
}

export async function getProfile(username) {
  const url = `${API_BASE}/get-profile?username=${encodeURIComponent(username)}`
  const res = await fetch(url)
  if (!res.ok) return null
  return res.json()
}

export async function searchUser(query) {
  return getProfile(query)
}
