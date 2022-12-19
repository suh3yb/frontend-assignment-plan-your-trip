import React, { useCallback, useMemo } from 'react';
import { addDisabledClass } from '../utils/classNameHelpers';
import './select.css';

interface Props {
  label: string;
  defaultOption: string;
  options?: string[];
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const Select: React.FC<Props> = ({
  label,
  defaultOption,
  options,
  setValue,
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

  const selectionElemClass = useMemo(
    () => addDisabledClass('selection', !options),
    [options]
  );

  const selectElemId = useMemo(
    () => `${label}-${defaultOption}`,
    [label, defaultOption]
  );

  return (
    <div className={selectionElemClass}>
      <label className="selection__label" htmlFor={selectElemId}>
        {label}
      </label>
      <select
        id={selectElemId}
        className="selection__select"
        defaultValue=""
        onChange={handleChange}
      >
        <option value="">{defaultOption}</option>
        {mapOptionsToOptionList()}
      </select>
    </div>
  );
};

export default Select;
