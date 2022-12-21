import { addModifierToClass } from './classNameHelpers';

test('returns expected string', () => {
  let className = addModifierToClass('base-class', 'disabled', false);
  expect(className).toBe('base-class');

  className = addModifierToClass('base-class', 'disabled', true);
  expect(className).toBe('base-class base-class--disabled');
});
