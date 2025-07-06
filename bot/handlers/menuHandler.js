module.exports = function menuHandler(bot, msg) {
  bot.sendMessage(msg.chat.id, 'Нажмите кнопку, чтобы поделиться контактом.', {
    reply_markup: {
      keyboard: [
        [{ text: 'Выбрать пользователя', request_user: { request_id: 1, user_is_bot: false } }]
      ],
      resize_keyboard: true,
      one_time_keyboard: true
    }
  });
};
