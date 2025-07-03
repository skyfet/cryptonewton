const express = require('express');
const path = require('path');

const transactionsRoutes = require('./routes/transactions');
const inlineRoutes = require('./routes/inline');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve static files from frontend
app.use(express.static(path.join(__dirname, '..', 'frontend', 'public')));

app.use('/', transactionsRoutes);
app.use('/', inlineRoutes);

if (require.main === module) {
  app.get('/:path(*)', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'public', 'index.html'));
  });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
