// scripts.js

function initApp() {
  // Проверяем, загружен ли Telegram Web App SDK
  if (window.Telegram && window.Telegram.WebApp) {
    const telegram = window.Telegram.WebApp;

    // Инициализируем Web App
    telegram.ready();
    console.log('Telegram Web App initialized.');

    // Получаем данные пользователя
    const user = telegram.initDataUnsafe.user;

    if (user) {
      console.log(`Hello, ${user.first_name}!`);

      // Находим элементы на странице
      const welcomeHeader = document.querySelector('.welcam');
      const usernameSpan = document.getElementById('username');

      if (welcomeHeader && usernameSpan) {
        welcomeHeader.classList.remove('hidden');
        usernameSpan.textContent = user.first_name;
        console.log('Welcome header updated.');
      } else {
        console.error('Элементы .welcam или #username не найдены в DOM.');
      }
    } else {
      console.warn('Данные пользователя недоступны.');
    }

    // Обработка события изменения темы (опционально)
    telegram.onEvent('themeChanged', () => {
      const theme = telegram.themeParams;
      console.log('Тема изменена:', theme);
      // Примените тему к вашему кастомному курсору или другим элементам, если необходимо
      if (theme.bg_color === 'dark') {
        document.getElementById('cursor').style.background = 'radial-gradient(circle, rgba(91, 171, 241, 0.888), rgba(95, 235, 167, 0.999))';
      } else {
        document.getElementById('cursor').style.background = 'radial-gradient(circle, rgba(255, 255, 255, 0.888), rgba(200, 200, 200, 0.999))';
      }
    });

  } else {
    console.error('Telegram Web App SDK не загружен.');
  }
}

function initCursor() {
  const cursor = document.getElementById('cursor');

  if (!cursor) {
    console.error('Элемент с ID "cursor" не найден в DOM.');
    return;
  }

  // Функция для проверки, является ли устройство сенсорным
  const isTouchDevice = () => {
    return ('ontouchstart' in window) || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
  };

  if (isTouchDevice()) {
    console.log('Сенсорное устройство обнаружено.');

    // Логика для сенсорных устройств

    // Показать курсор при начале касания
    document.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      if (touch) {
        updateCursorPosition(touch.clientX, touch.clientY);
        showCursor();
        // console.log('Касание начато.');
      }
    });

    // Обновление позиции курсора при перемещении касания
    document.addEventListener('touchmove', (e) => {
      const touch = e.touches[0];
      if (touch) {
        updateCursorPosition(touch.clientX, touch.clientY);
        // console.log('Касание перемещено.');
      }
    });

    // Скрыть курсор при окончании касания
    document.addEventListener('touchend', () => {
      hideCursor();
      // console.log('Касание завершено.');
    });

    // Функции для показа и скрытия курсора
    function showCursor() {
      cursor.style.opacity = '1';
      cursor.style.display = 'block';
    }

    function hideCursor() {
      cursor.style.opacity = '0';
      cursor.style.display = 'none';
    }

    // Обновление позиции курсора
    function updateCursorPosition(x, y) {
      cursor.style.left = `${x - 10}px`;
      cursor.style.top = `${y - 10}px`;
    }

  } else {
    console.log('Устройство с мышью обнаружено.');

    // Логика для устройств с мышью

    // Показать курсор при входе мыши в окно приложения
    const appContainer = document.body;

    appContainer.addEventListener('mouseenter', () => {
      showCursor();
      // console.log('Мышь вошла в приложение.');
    });

    appContainer.addEventListener('mouseleave', () => {
      hideCursor();
      // console.log('Мышь покинула приложение.');
    });

    // Обновление позиции курсора при движении мыши
    appContainer.addEventListener('mousemove', (e) => {
      updateCursorPosition(e.clientX, e.clientY);
      showCursor();
      // console.log('Мышь перемещается.');
    });

    // Функции для показа и скрытия курсора
    function showCursor() {
      cursor.style.opacity = '1';
      cursor.style.display = 'block';
    }

    function hideCursor() {
      cursor.style.opacity = '0';
      cursor.style.display = 'none';
    }

    // Обновление позиции курсора
    function updateCursorPosition(x, y) {
      cursor.style.left = `${x - 10}px`;
      cursor.style.top = `${y - 10}px`;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initApp();
});
