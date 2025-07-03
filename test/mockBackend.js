const balances = {};

exports.purchase = (user_id, amount) => {
  if (!user_id || !amount || amount < 1 || amount > 250000) {
    return { ok: false };
  }
  balances[user_id] = (balances[user_id] || 0) + amount;
  return { ok: true, balance: balances[user_id] };
};

exports.gift = (from_id, to_id, amount) => {
  if (!from_id || !to_id || !amount || amount < 1 || amount > 250000) {
    return { ok: false };
  }
  balances[from_id] = (balances[from_id] || 0) - amount;
  balances[to_id] = (balances[to_id] || 0) + amount;
  return { ok: true, balance: balances[from_id] };
};

exports.reset = () => {
  Object.keys(balances).forEach(k => delete balances[k]);
};
