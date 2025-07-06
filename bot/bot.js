const TelegramBot = require('node-telegram-bot-api');
const menuHandler = require('./handlers/menuHandler');
const inlineQueryHandler = require('./handlers/inlineQueryHandler');
const userSharedHandler = require('./handlers/userSharedHandler');
const app = require('./server');

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, msg => menuHandler(bot, msg));
bot.on('message', msg => {
  if (msg.user_shared) userSharedHandler(bot, msg);
});
bot.on('inline_query', query => inlineQueryHandler(bot, query));

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Server running on ${port}`));
}

module.exports = bot;
