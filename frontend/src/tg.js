export const tg = window.Telegram.WebApp;

export function initTelegram() {
  if (!tg) return;
  tg.expand();
  tg.ready();
}
