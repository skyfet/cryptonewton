module.exports = function menuHandler(bot, msg) {
  const name = msg.from.first_name || 'друг';

  bot.sendMessage(msg.chat.id, `👋 Привет, ${name}!\n\n✨ Я помогу тебе купить или подарить звёзды в Telegram. Что хочешь сделать? Выбери в меню снизу ⬇️`, {
    reply_markup: {
      keyboard: [
        [
          {
            text: '🌟 Купить звёзды',
            web_app: { url: 'https://skyfet.github.io/cryptonewton/#/buy' }
          }
        ],
        [
          {
            text: '🎁 Подарить другу'
          }
        ],
        [
          {
            text: '🛟 Поддержка'
          }
        ]
      ],
      resize_keyboard: true
    }
  });
};