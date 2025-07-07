module.exports = function menuHandler(bot, msg) {
  bot.sendMessage(msg.chat.id, 'Привет! Что хочешь сделать?.', {
    reply_markup: {
      keyboard: [
        [{ text: '🌟 Купить звёзды' },
        { text: '🎁 Подарить звёзды другу', request_user: { request_id: 1, user_is_bot: false } }]
      ],
      resize_keyboard: true,
      one_time_keyboard: true
    }
  });
};
