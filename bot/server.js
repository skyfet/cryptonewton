const express = require('express');
const searchUser = require('./searchUser');

const app = express();

app.get('/search', async (req, res) => {
  const { q } = req.query;
  const result = await searchUser(q);
  if (result) {
    res.json({ ok: true, result });
  } else {
    res.status(404).json({ ok: false });
  }
});

module.exports = app;
