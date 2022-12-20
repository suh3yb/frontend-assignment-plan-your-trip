export const addModifierToClass = (
  baseClassName: string,
  modifier: string,
  condition: boolean
): string => {
  let className = baseClassName;
  if (condition) {
    className += ` ${className}--${modifier}`;
  }
  return className;
};
