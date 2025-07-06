const nock = require('nock');
const app = require('../bot/server');
const request = require('supertest');
const searchUser = require('../bot/searchUser');

describe('Telegram user search', () => {
  afterEach(() => nock.cleanAll());
  beforeAll(() => {
    nock.disableNetConnect();
    nock.enableNetConnect('127.0.0.1');
  });

  test('finds user by username', async () => {
    process.env.BOT_TOKEN = 'TOKEN';
    nock('https://api.telegram.org')
      .post('/botTOKEN/getChat', { chat_id: '@alice' })
      .reply(200, { ok: true, result: { id: 1, username: 'alice' } });

    const res = await request(app).get('/search').query({ q: 'alice' });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true, result: { id: 1, username: 'alice' } });
  });

  test('returns 404 for unknown user', async () => {
    process.env.BOT_TOKEN = 'TOKEN';
    nock('https://api.telegram.org')
      .post('/botTOKEN/getChat', { chat_id: '@unknown' })
      .reply(404);

    const res = await request(app).get('/search').query({ q: 'unknown' });
    expect(res.status).toBe(404);
    expect(res.body.ok).toBe(false);
  });
});
