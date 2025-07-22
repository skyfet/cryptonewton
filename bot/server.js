const express = require('express');
const parseTelegramProfile = require('./parseTelegramProfile');

const app = express();

app.get('/get-profile', async (req, res) => {
  const username = req.query.username;
  if (!username) {
    return res.status(400).json({ error: 'Missing username' });
  }

  const url = `https://t.me/${username}`;

  try {
    const response = await fetch(url);
    const html = await response.text();

    const data = parseTelegramProfile(html);

    return res.json({
      status: 'ok',
      username,
      ...data,
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});



module.exports = app;
