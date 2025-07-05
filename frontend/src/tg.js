
export function initTelegram() {
  const tg = window.Telegram.WebApp;
  if (!tg) return;
  tg.expand();
  tg.ready();
}
