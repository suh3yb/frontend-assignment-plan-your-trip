import { getShortenedDayName } from './dateHelpers';

test('returns expected day', () => {
  let day = getShortenedDayName(new Date('2022-12-19'));
  expect(day).toBe('Mon');

  day = getShortenedDayName(new Date('2022-12-20'));
  expect(day).toBe('Tue');

  day = getShortenedDayName(new Date('2022-12-18'));
  expect(day).toBe('Sun');
});
