// Custom cursor logic
document.addEventListener('DOMContentLoaded', () => {
  const cursor = document.getElementById('cursor');

  // Update cursor position
  const updateCursorPosition = (x, y) => {
    cursor.style.left = `${x - 10}px`;
    cursor.style.top = `${y - 10}px`;
  };

  // Mouse move event
  document.addEventListener('mousemove', (e) => {
    updateCursorPosition(e.clientX, e.clientY);
    cursor.style.opacity = 1; // Ensure cursor is visible
  });

  // Hide cursor on mouse leave
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = 0;
  });

  // Show cursor on mouse enter
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = 1;
  });
});
