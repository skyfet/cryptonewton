module.exports = function contactHandler(bot, msg) {
  bot.sendMessage(msg.chat.id, 'Star Pay Terminal', {
    reply_markup: {
      inline_keyboard: [[
        {
          text: '🌟 Выбрать количество звёзд',
          web_app: { url: `https://skyfet.github.io/cryptonewton/#/buy` }
        }
      ]]
    }
  });
};

