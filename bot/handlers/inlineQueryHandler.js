module.exports = function inlineQueryHandler(bot, query) {
  const results = [
    {
      type: 'article',
      id: `gift_${Date.now()}`,
      title: `Подарить звёзды ${query.query}`,
      input_message_content: { message_text: `🎁 Я собираюсь подарить звёзды ${query.query}!` },
      reply_markup: {
        inline_keyboard: [[{
          text: '🎉 Открыть WebApp',
          web_app: { url: `https://yourserver.com/?mode=gift&user_id=${query.from.id}` }
        }]]
      }
    }
  ];
  bot.answerInlineQuery(query.id, results);
};
