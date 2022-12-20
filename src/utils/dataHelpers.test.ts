import { mapCityResponseToCitiesObj, getDiscountedPrice } from './dataHelpers';

describe('mapCityResponseToCitiesObj', () => {
  it('returns expected object', () => {
    const cities = mapCityResponseToCitiesObj([
      [1, 'Amsterdam'],
      [2, 'New York'],
    ]);
    expect(cities).toEqual({ Amsterdam: '1', 'New York': '2' });
  });
});

describe('getDiscountedPrice', () => {
  it('returns correct price', () => {
    const price = getDiscountedPrice(100, 25);
    expect(price).toBe('75.00');
  });
});
