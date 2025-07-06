
const TelegramBot = require('node-telegram-bot-api');

module.exports = async function searchUser(username) {
  if (!username) return null;
  const token = process.env.BOT_TOKEN;
  if (!token) throw new Error('BOT_TOKEN missing');
  const bot = new TelegramBot(token);
  const query = username.startsWith('@') ? username : `@${username}`;
  try {
    const chat = await bot.getChat(query);
    return { id: chat.id, username: chat.username || chat.title || username };
  } catch {
    return null;
  }
};
