import React, { useCallback, useMemo } from 'react';
import { addDisabledClass } from '../utils/classNameHelpers';
import './filter.css';

interface Props {
  label: string;
  defaultOption: string;
  options?: string[];
  setValue: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
}

const Filter: React.FC<Props> = ({
  label,
  defaultOption,
  options,
  setValue,
  className,
}) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setValue(event.target.value);
    },
    [setValue]
  );

  const mapOptionsToOptionList = useCallback(
    () =>
      options?.map((optionValue, index) => (
        <option key={`option-${optionValue}-${index}`} value={optionValue}>
          {optionValue}
        </option>
      )),
    [options]
  );

  const selectionElemClass = useMemo(() => {
    let baseClass = addDisabledClass('filter', !options);
    if (className) {
      baseClass += ` ${className}`;
    }
    return baseClass;
  }, [options, className]);

  const selectElemId = useMemo(
    () => `${label}-${defaultOption}`,
    [label, defaultOption]
  );

  return (
    <div className={selectionElemClass}>
      <label className="filter__label" htmlFor={selectElemId}>
        {label}
      </label>
      <select
        id={selectElemId}
        className="filter__select"
        defaultValue=""
        onChange={handleChange}
      >
        <option value="">{defaultOption}</option>
        {mapOptionsToOptionList()}
      </select>
    </div>
  );
};

export default Filter;
