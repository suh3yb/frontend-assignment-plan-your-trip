import {
  mapCityResponseToCitiesObj,
  getDiscountedPrice,
  getImgAltTextFromTitle,
} from './dataHelpers';

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

describe('getImgAltTextFromTitle', () => {
  it('returns expected alt text', () => {
    let alt = getImgAltTextFromTitle('One World Observatory: Skip All Lines');
    expect(alt).toBe('One World Observatory');

    alt = getImgAltTextFromTitle('9/11 Memorial & Museum');
    expect(alt).toBe('9/11 Memorial & Museum');
  });
});
