module.exports = function userSharedHandler(bot, msg) {
  const { user_id } = msg.user_shared;

  bot.getChat(user_id)
    .then((user) => {
      console.log(user)
      const full_name = [user.first_name, user.last_name].filter(Boolean).join(' ');
      bot.sendMessage(msg.chat.id, 'Пользователь выбран!', {
        reply_markup: {
          inline_keyboard: [[{
            text: '🎁 Отправить подарок',
            web_app: { url: `https://skyfet.github.io/cryptonewton/#/gift?user_id=${user_id}&username=${full_name}` }
          }]]
        }
      });
    })
    .catch((_) => {
      bot.sendMessage(msg.chat.id, 'Этот пользователь не использует бота!');
    });


};
