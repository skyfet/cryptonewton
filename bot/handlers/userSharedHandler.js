module.exports = function userSharedHandler(bot, msg) {
  const { user_id } = msg.user_shared;
  bot.sendMessage(msg.chat.id, 'Star Pay Terminal', {
    reply_markup: {
      inline_keyboard: [[{
        text: 'Open WebApp',
        web_app: { url: `https://skyfet.github.io/cryptonewton/#/gift?user_id=${user_id}` }
      }]]
    }
  });
};
