const express = require('express');
const { purchase, gift } = require('../controllers/transactions');
const verifyTelegram = require('../middleware/verifyTelegram');

const router = express.Router();

router.post('/purchase', verifyTelegram, purchase);
router.post('/gift', verifyTelegram, gift);

module.exports = router;
