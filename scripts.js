// Логика кастомного курсора
document.addEventListener('DOMContentLoaded', () => {
  const cursor = document.getElementById('cursor');

  // Функция для проверки, является ли устройство сенсорным
  const isTouchDevice = () => {
    return ('ontouchstart' in window) || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
  };

  if (isTouchDevice()) {
    // Логика для сенсорных устройств

    // Показать курсор при начале касания
    document.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      if (touch) {
        updateCursorPosition(touch.clientX, touch.clientY);
        showCursor();
      }
    });

    // Обновление позиции курсора при перемещении касания
    document.addEventListener('touchmove', (e) => {
      const touch = e.touches[0];
      if (touch) {
        updateCursorPosition(touch.clientX, touch.clientY);
      }
    });

    // Скрыть курсор при окончании касания
    document.addEventListener('touchend', () => {
      hideCursor();
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
    // Логика для устройств с мышью

    // Показать курсор при входе мыши в окно приложения
    // Предполагается, что основное приложение находится в элементе <main>
    const appContainer = document.body;

    appContainer.addEventListener('mouseenter', () => {
      showCursor();
    });

    appContainer.addEventListener('mouseleave', () => {
      hideCursor();
    });

    // Обновление позиции курсора при движении мыши
    appContainer.addEventListener('mousemove', (e) => {
      updateCursorPosition(e.clientX, e.clientY);
      showCursor();
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
});
