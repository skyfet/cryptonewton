const TelegramBot = require('node-telegram-bot-api');
const http = require('http');
const menuHandler = require('./handlers/menuHandler');
const userSharedHandler = require('./handlers/userSharedHandler');
const app = require('./server');

require('dotenv').config();

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// Состояния пользователей для отслеживания ввода username
const userStates = new Map();

bot.onText(/\/start/, msg => {
  // Сбрасываем состояние пользователя при /start
  userStates.delete(msg.chat.id);
  menuHandler(bot, msg);
});

bot.on('message', msg => {
  if (msg.user_shared) userSharedHandler(bot, msg);
});

bot.on('message', msg => {
  if (msg.text === '🛟 Поддержка') {
    bot.sendMessage(msg.chat.id, 'Мы всегда на связи!\n\nЕсли у тебя возникли вопросы или нужна помощь, напиши лучшему админу @tipikls');
    return;
  }

  if (msg.text === '🎁 Подарить другу') {
    // Устанавливаем состояние ожидания username
    userStates.set(msg.chat.id, 'waiting_for_username');
    bot.sendMessage(msg.chat.id, '🎁 Отлично! Теперь введи username друга (без @):\n\nИспользуй /cancel для отмены');
    return;
  }

  if (msg.text === '/cancel') {
    // Сбрасываем состояние пользователя
    userStates.delete(msg.chat.id);
    bot.sendMessage(msg.chat.id, '❌ Операция отменена. Используй /start для возврата в меню.');
    return;
  }

  // Проверяем, ожидаем ли мы username от этого пользователя
  const userState = userStates.get(msg.chat.id);
  if (userState === 'waiting_for_username') {
    handleUsernameInput(bot, msg);
  }
});

// Функция для обработки ввода username
async function handleUsernameInput(bot, msg) {
  const username = msg.text.trim().replace('@', '');

  if (!username || username.length < 3) {
    bot.sendMessage(msg.chat.id, '❌ Неверный username. Должно быть минимум 3 символа. Попробуй еще раз или используй /cancel для отмены.');
    return;
  }

  try {
    // Сначала проверяем, существует ли пользователь через get-profile
    const userProfile = await getUserProfile(username);

    console.log(userProfile)
    if (!userProfile) {
      bot.sendMessage(msg.chat.id, `❌ Пользователь @${username} не найден. Проверь username и попробуй еще раз или используй /cancel для отмены.`);
      return;
    }

    // Сбрасываем состояние пользователя
    userStates.delete(msg.chat.id);

    // Открываем WebApp для подарка с найденным пользователем
    bot.sendMessage(msg.chat.id, `🎁 Отлично! Найден пользователь @${username} (${userProfile.displayName || 'Пользователь'}). Теперь открою приложение для подарка:`, {
      reply_markup: {
        inline_keyboard: [[{
          text: '🎁 Открыть приложение подарка',
          web_app: { url: `https://skyfet.github.io/cryptonewton/#/gift?username=${encodeURIComponent(username)}&fullName=${encodeURIComponent(userProfile.displayName)}&avatar=${encodeURIComponent(userProfile.image)}` }
        }]]
      }
    });

  } catch (error) {
    console.error('Error getting user profile:', error);
    bot.sendMessage(msg.chat.id, '❌ Произошла ошибка при поиске пользователя. Попробуй еще раз или используй /cancel для отмены.');
  }
}

// Функция для получения профиля пользователя (аналог get-profile из frontend)
function getUserProfile(username) {
  return new Promise((resolve, reject) => {
    try {
      // Если есть backend API, используем его
      if (process.env.API_BASE) {
        const url = new URL('/get-profile', process.env.API_BASE);
        url.searchParams.set('username', username);

        const req = http.get(url.toString(), (res) => {
          let data = '';

          res.on('data', (chunk) => {
            data += chunk;
          });

          res.on('end', () => {
            try {
              if (res.statusCode === 200) {
                const profile = JSON.parse(data);
                resolve(profile);
              } else {
                resolve(null);
              }
            } catch (error) {
              console.error('Error parsing response:', error);
              resolve(null);
            }
          });
        });

        req.on('error', (error) => {
          console.error('Request error:', error);
          resolve(null);
        });

        req.setTimeout(5000, () => {
          req.destroy();
          resolve(null);
        });
      } else {
        // Fallback: возвращаем mock профиль для тестирования
        resolve({
          id: Math.floor(Math.random() * 1000000),
          username: username,
          fullName: `User ${username}`,
          avatar: null
        });
      }
    } catch (error) {
      console.error('Error in getUserProfile:', error);
      resolve(null);
    }
  });
}

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Server running on ${port}`));
}

module.exports = { bot, getUserProfile };
