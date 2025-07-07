module.exports = function menuHandler(bot, msg) {
  bot.sendMessage(msg.chat.id, 'Привет! Что хочешь сделать?', {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: '🌟 Купить звёзды',
            web_app: { url: 'https://skyfet.github.io/cryptonewton/#/buy' }
          }
        ],
        [
          {
            text: '🎁 Подарить звёзды другу',
            web_app: { url: 'https://skyfet.github.io/cryptonewton/?mode=gift' }
          }
        ]
      ]
    }
  });
};
