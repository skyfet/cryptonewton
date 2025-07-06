module.exports = function menuHandler(bot, msg) {
  bot.sendMessage(msg.chat.id, 'Нажмите кнопку, чтобы поделиться контактом.', {
    reply_markup: {
      keyboard: [
        [{ text: 'Поделиться контактом', request_contact: true }]
      ],
      resize_keyboard: true,
      one_time_keyboard: true
    }
  });
};
