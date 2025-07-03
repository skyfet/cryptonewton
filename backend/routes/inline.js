const express = require('express');
const { searchUsers } = require('../controllers/inline');
const verifyTelegram = require('../middleware/verifyTelegram');

const router = express.Router();

router.get('/inline', verifyTelegram, searchUsers);

module.exports = router;
