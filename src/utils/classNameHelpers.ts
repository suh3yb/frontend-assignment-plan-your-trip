export const addDisabledClass = (
  baseClassName: string,
  isDisabled: boolean
): string => {
  let className = baseClassName;
  if (isDisabled) {
    className += ` ${className}--disabled`;
  }

  return className;
};

export const addAnimateClass = (
  baseClassName: string,
  shouldAnimate: boolean
): string => {
  let className = baseClassName;
  if (shouldAnimate) {
    className += ` ${className}--animated`;
  }
  return className;
};
