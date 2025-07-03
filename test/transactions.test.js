const { purchase, gift, reset, history } = require("./mockBackend");

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

  describe('history', () => {
    it('records purchases with fiat value', () => {
      purchase(1, 10);
      const list = history(1);
      expect(list.length).toBe(1);
      expect(list[0].fiat).toBe(0.5);
    });

    it('returns empty array for new users', () => {
      const list = history(99);
      expect(list).toEqual([]);
    });

    it('accumulates multiple purchases', () => {
      purchase(1, 5);
      purchase(1, 15);
      const list = history(1);
      expect(list.length).toBe(2);
      expect(list[0].amount).toBe(5);
      expect(list[1].fiat).toBe(0.75);
    });
  });
});
