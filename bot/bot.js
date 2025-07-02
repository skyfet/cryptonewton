const TelegramBot = require('node-telegram-bot-api');
const menuHandler = require('./handlers/menuHandler');
const inlineQueryHandler = require('./handlers/inlineQueryHandler');

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => menuHandler(bot, msg));
bot.on('inline_query', (query) => inlineQueryHandler(bot, query));

module.exports = bot;
