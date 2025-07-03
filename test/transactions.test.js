const request = require("supertest");
let app;

beforeEach(() => {
  jest.resetModules();
  app = require("../backend/index");
});

describe('Transaction routes', () => {
  describe('POST /purchase', () => {
    it('processes a valid purchase', async () => {
      const res = await request(app)
        .post('/purchase')
        .send({ user_id: 1, amount: 10 });
      expect(res.statusCode).toBe(200);
      expect(res.body.ok).toBe(true);
      expect(res.body.balance).toBe(10);
    });

    it('rejects invalid amount', async () => {
      const res = await request(app)
        .post('/purchase')
        .send({ user_id: 1, amount: 0 });
      expect(res.statusCode).toBe(400);
      expect(res.body.ok).toBe(false);
    });
  });

  describe('POST /gift', () => {
    it('processes a valid gift', async () => {
      await request(app).post('/purchase').send({ user_id: 1, amount: 20 });
      const res = await request(app)
        .post('/gift')
        .send({ from_id: 1, to_id: 2, amount: 5 });
      expect(res.statusCode).toBe(200);
      expect(res.body.ok).toBe(true);
      expect(res.body.balance).toBe(15);
    });
  });
});
