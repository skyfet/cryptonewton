module.exports = async function inlineQueryHandler(bot, query) {
  const target = query.query.trim();
  if (!target) return;

  try {
    const chat = await bot.getChat(target.startsWith('@') ? target : `@${target}`);
    const username = chat.username || chat.title || target;
    const results = [
      {
        type: 'article',
        id: `gift_${chat.id}`,
        title: `Подарить звёзды ${username}`,
        input_message_content: { message_text: `🎁 Я собираюсь подарить звёзды ${username}!` },
        reply_markup: {
          inline_keyboard: [[{
            text: '🎉 Открыть WebApp',
            web_app: { url: `https://skyfet.github.io/cryptonewton/?mode=gift&user_id=${chat.id}&username=${username}` }
          }]]
        }
      }
    ];
    bot.answerInlineQuery(query.id, results);
  } catch (e) {
    const results = [{
      type: 'article',
      id: `not_found_${Date.now()}`,
      title: 'Пользователь не найден',
      input_message_content: { message_text: `Пользователь ${target} не найден` }
    }];
    bot.answerInlineQuery(query.id, results);
  }
};
