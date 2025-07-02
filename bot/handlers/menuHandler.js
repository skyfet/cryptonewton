module.exports = function menuHandler(bot, msg) {
  bot.sendMessage(msg.chat.id, 'Star Pay Terminal', {
    reply_markup: {
      inline_keyboard: [[
        { text: 'Open WebApp', web_app: { url: 'https://yourserver.com' } }
      ]]
    }
  });
};
