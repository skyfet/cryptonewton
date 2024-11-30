// Логика кастомного курсора
document.addEventListener('DOMContentLoaded', () => {
  const cursor = document.getElementById('cursor');

  // Обновление позиции курсора
  const updateCursorPosition = (x, y) => {
    cursor.style.left = `${x - 10}px`;
    cursor.style.top = `${y - 10}px`;
  };

  // Событие движения мыши
  document.addEventListener('mousemove', (e) => {
    updateCursorPosition(e.clientX, e.clientY);
    cursor.style.opacity = 1; // Убедиться, что курсор видим
  });

  // Скрыть курсор при уходе мыши
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = 0;
  });

  // Показать курсор при входе мыши
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = 1;
  });
});
