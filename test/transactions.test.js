const { purchase, gift, reset } = require("./mockBackend");

beforeEach(() => {
  reset();
});

describe('Transaction logic', () => {
  describe('purchase', () => {
    it('processes a valid purchase', () => {
      const res = purchase(1, 10);
      expect(res.ok).toBe(true);
      expect(res.balance).toBe(10);
    });

    it('rejects invalid amount', () => {
      const res = purchase(1, 0);
      expect(res.ok).toBe(false);
    });
  });

  describe('gift', () => {
    it('processes a valid gift', () => {
      purchase(1, 20);
      const res = gift(1, 2, 5);
      expect(res.ok).toBe(true);
      expect(res.balance).toBe(15);
    });
  });
});
