module.exports = function contactHandler(bot, msg) {
  const { user_id } = msg.contact;
  bot.sendMessage(msg.chat.id, 'Star Pay Terminal', {
    reply_markup: {
      inline_keyboard: [[
        {
          text: 'Open WebApp',
          web_app: { url: `https://skyfet.github.io/cryptonewton/?user_id=${user_id}` }
        }
      ]]
    }
  });
};

