import { mapCityResponseToCitiesObj } from './dataHelpers';

test('returns expected object', () => {
  const cities = mapCityResponseToCitiesObj([
    [1, 'Amsterdam'],
    [2, 'New York'],
  ]);
  expect(cities).toEqual({ Amsterdam: '1', 'New York': '2' });
});
