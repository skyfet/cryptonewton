const cursor = document.getElementById("cursor");

// Функция для обновления позиции курсора
function updateCursorPosition(x, y) {
  cursor.style.left = x + "px";
  cursor.style.top = y + "px";
}

// Событие для мыши
document.addEventListener("mousemove", (e) => {
  updateCursorPosition(e.clientX, e.clientY);
});

// Событие для касания на мобильных устройствах
document.addEventListener("touchmove", (e) => {
  const touch = e.touches[0];
  updateCursorPosition(touch.clientX, touch.clientY);
});

// Скрытие курсора при выходе мыши
document.addEventListener("mouseleave", () => {
  cursor.style.opacity = 0; // Скрыть курсор
});

// Показ курсора при возврате мыши
document.addEventListener("mouseenter", () => {
  cursor.style.opacity = 1; // Показать курсор
});
