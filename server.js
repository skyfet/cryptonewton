const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname));

let balances = {};

app.post('/purchase', (req, res) => {
  const { user_id, amount } = req.body;
  if (!user_id || !amount) {
    return res.status(400).json({ ok: false, error: 'invalid_request' });
  }
  if (amount < 1 || amount > 250000) {
    return res.status(400).json({ ok: false, error: 'amount_out_of_range' });
  }
  balances[user_id] = (balances[user_id] || 0) + amount;
  res.json({ ok: true, balance: balances[user_id] });
});

app.post('/gift', (req, res) => {
  const { from_id, to_id, amount } = req.body;
  if (!from_id || !to_id || !amount) {
    return res.status(400).json({ ok: false, error: 'invalid_request' });
  }
  if (amount < 1 || amount > 250000) {
    return res.status(400).json({ ok: false, error: 'amount_out_of_range' });
  }
  balances[from_id] = (balances[from_id] || 0) - amount;
  balances[to_id] = (balances[to_id] || 0) + amount;
  res.json({ ok: true, balance: balances[from_id] });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
