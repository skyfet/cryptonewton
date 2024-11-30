const cursor = document.getElementById("cursor");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px"; // Используем clientX
  cursor.style.top = e.clientY + "px"; // Используем clientY
});

document.addEventListener("mouseleave", () => {
  cursor.style.opacity = 0; // Скрыть курсор при выходе мыши
});

document.addEventListener("mouseenter", () => {
  cursor.style.opacity = 1; // Показать курсор при возвращении мыши
});