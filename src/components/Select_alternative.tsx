import React, { useCallback, useState, useRef } from 'react';

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
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const selectElemRef = useRef<HTMLSelectElement>(null);
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setValue(event.target.value);
    },
    [setValue]
  );

  const handleOpenDropdown = useCallback(() => {
    setIsDropdownOpen(prevValue => !prevValue);
  }, [setIsDropdownOpen]);

  const handleOptionClick = useCallback(
    (value: string) => {
      if (selectElemRef.current) {
        selectElemRef.current.value = value;
      }
      setValue(value);
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

  const mapOptionsToDataList = useCallback(
    () =>
      options?.map((optionValue, index) => (
        <div
          key={`data-${optionValue}-${index}`}
          onClick={() => handleOptionClick(optionValue)}
        >
          {optionValue}
        </div>
      )),
    [options]
  );

  return (
    <fieldset className="fieldset" disabled={!options}>
      <legend className="fieldset__label">{label}</legend>
      <div>
        <div className="fieldset__header" onClick={handleOpenDropdown}>
          {defaultOption}
        </div>
        {options && (
          <>
            <select
              ref={selectElemRef}
              className="fieldset__select--hidden"
              defaultValue=""
              onChange={handleChange}
            >
              <option value="">{defaultOption}</option>
              {mapOptionsToOptionList()}
            </select>
            <datalist
              className="fieldset__options"
              style={isDropdownOpen ? { display: 'initial' } : {}}
            >
              {mapOptionsToDataList()}
            </datalist>
          </>
        )}
      </div>
    </fieldset>
  );
};

export default Select;
