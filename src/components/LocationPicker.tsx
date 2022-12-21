import React, { useCallback, useMemo } from 'react';
import { addModifierToClass } from '../utils/classNameHelpers';
import './LocationPicker.css';

interface Props {
  label: string;
  defaultOption: string;
  options?: string[];
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const LocationPicker: React.FC<Props> = ({
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
    () => addModifierToClass('filter', 'disabled', !options),
    [options]
  );

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
        data-testid={`select-${label}`}
        className="filter__select"
        defaultValue=""
        onChange={handleChange}
      >
        <option data-testid="select-option" value="">
          {defaultOption}
        </option>
        {mapOptionsToOptionList()}
      </select>
    </div>
  );
};

export default LocationPicker;
