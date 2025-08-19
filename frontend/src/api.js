const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000'

// Fallback для локального тестирования без backend
const mockTransactions = [];

export async function purchase(user_id, amount) {
  try {
    const res = await fetch(`${API_BASE}/purchase`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id, amount })
    });
    return res.json();
  } catch (error) {
    // Fallback для локального тестирования
    console.log('Using mock purchase API');
    if (!user_id || !amount || amount < 1 || amount > 10000) {
      return { ok: false, error: 'Invalid parameters' };
    }
    
    const tx = { 
      type: 'purchase', 
      amount, 
      fiat: amount * 0.05, 
      time: Date.now(),
      user_id 
    };
    mockTransactions.push(tx);
    
    return { ok: true, balance: amount, transaction: tx };
  }
}

export async function gift(from_id, to_id, amount) {
  try {
    const res = await fetch(`${API_BASE}/gift`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ from_id, to_id, amount })
    });
    return res.json();
  } catch (error) {
    // Fallback для локального тестирования
    console.log('Using mock gift API');
    if (!from_id || !to_id || !amount || amount < 1 || amount > 1000) {
      return { ok: false, error: 'Invalid parameters' };
    }
    
    const tx = { 
      type: 'gift', 
      from_id, 
      to_id, 
      amount, 
      time: Date.now() 
    };
    mockTransactions.push(tx);
    
    return { ok: true, balance: amount, transaction: tx };
  }
}

export async function getHistory(user_id) {
  try {
    const res = await fetch(`${API_BASE}/history?user_id=${user_id}`)
    return res.json();
  } catch (error) {
    // Fallback для локального тестирования
    console.log('Using mock history API');
    return mockTransactions.filter(tx => 
      tx.user_id === user_id || tx.from_id === user_id || tx.to_id === user_id
    );
  }
}

export async function getProfile(username) {
  try {
    const url = `${API_BASE}/get-profile?username=${encodeURIComponent(username)}`
    const res = await fetch(url)
    if (!res.ok) return null
    return res.json()
  } catch (error) {
    // Fallback для локального тестирования
    console.log('Using mock profile API');
    return {
      id: Math.floor(Math.random() * 1000000),
      username: username,
      fullName: `User ${username}`,
      avatar: null
    };
  }
}

export async function searchUser(query) {
  return getProfile(query)
}
