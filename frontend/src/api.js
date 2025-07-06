export async function purchase(user_id, amount) {
  const res = await fetch('/purchase', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id, amount })
  });
  return res.json();
}

export async function gift(from_id, to_id, amount) {
  const res = await fetch('/gift', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ from_id, to_id, amount })
  });
  return res.json();
}

export async function getHistory(user_id) {
  const res = await fetch(`/history?user_id=${user_id}`);
  return res.json();
}

export async function searchUser(query) {
  const res = await fetch(`t.me/${encodeURIComponent(query)}`);
  if (!res.ok) return null;
  const data = await res.json();
  return data.ok ? data.result : null;
}
