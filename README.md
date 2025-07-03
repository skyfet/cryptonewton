# Star Pay Terminal

This repository contains a simple proof-of-concept for a Telegram WebApp.
All transaction requests are handled by a mocked backend so the app works without a server.

## Project structure

```
star-pay-terminal/
- frontend/ (Telegram WebApp)
  - public/
    - index.html
  - src/
    - components/
      - AmountPicker.svelte
      - UsernameDisplay.svelte
    - pages/
      - Welcome.svelte
      - Buy.svelte
      - Gift.svelte
      - Success.svelte
    - App.svelte
    - main.js
    - tg.js
    - api.js
  - package.json
  - vite.config.js

- database/
  - schema.sql (optional)

- bot/
  - handlers/
    - inlineQueryHandler.js
    - menuHandler.js
  - bot.js
```

## Mock API

The original Express backend has been removed. Transactions are now simulated in-memory.
`purchase(user_id, amount)` and `gift(from_id, to_id, amount)` return objects mimicking the old responses.
`history(user_id)` returns an array of previous purchases with the fiat price.

## Inline queries

The bot can respond to inline queries with a WebApp URL so users can quickly send gifts. Example response:

```json
[
  {
    "type": "article",
    "id": "gift_123456789",
    "title": "\u041f\u043e\u0434\u0430\u0440\u0438\u0442\u044c \u0437\u0432\u0451\u0437\u0434\u044b \u0410\u0440\u0442\u0451\u043c\u0443",
    "input_message_content": {
      "message_text": "\uD83C\uDF81 \u042f \u0441\u043E\u0431\u0438\u0440\u0430\u044E\u0441\u044C \u043F\u043E\u0434\u0430\u0440\u0438\u0442\u044C \u0437\u0432\u0451\u0437\u0434\u044B \u0410\u0440\u0442\u0451\u043C\u0443!"
    },
    "reply_markup": {
      "inline_keyboard": [
        [
          {
            "text": "\uD83C\uDF89 \u041E\u0442\u043A\u0440\u044B\u0442\u044C WebApp",
            "web_app": {
              "url": "https://yourwebapp.com?mode=gift&user_id=123456789"
            }
          }
        ]
      ]
    }
  }
]
```

## Security

- HMAC validation of all WebApp requests
- User verification through Telegram API
- Limits on transaction amounts

## Success criteria

- Purchasing stars for yourself
- Gifting stars to another user via inline interface
- Data validation and error handling
- URL parameters `mode` and `user_id` control WebApp behaviour

