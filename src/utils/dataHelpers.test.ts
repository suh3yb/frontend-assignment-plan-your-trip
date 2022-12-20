import {
  getErrorMessage,
  mapCityResponseToCitiesObj,
  getDiscountedPrice,
  getImgAltTextFromTitle,
  DEFAULT_ERROR_MESSAGE,
} from './dataHelpers';

// prettier-ignore
describe.each([
  ['error occurred',       'error occurred',       undefined],
  [new Error('new error'), 'new error',            undefined],
  [{ a: 1 },                DEFAULT_ERROR_MESSAGE, undefined],
  [123,                     'custom message',      'custom message'],
])('getErrorMessage', (error, returnedMessage, customMessage) => {
  test(`should return ${returnedMessage}`, ()=>{
    const errorMessage = getErrorMessage(error, customMessage);
    expect(errorMessage).toBe(returnedMessage);
  })
});

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
