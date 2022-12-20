import React, { useCallback, useMemo } from 'react';
import { DatesResponse } from '../types';
import { addModifierToClass } from '../utils/classNameHelpers';
import { getShortenedDayName } from '../utils/dateHelpers';

import './datePicker.css';

interface Props {
  options: DatesResponse;
  disabled: boolean;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const DatePicker: React.FC<Props> = ({ options, disabled, setValue }) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    },
    [setValue]
  );

  const fieldsetElemClass = useMemo(
    () => addModifierToClass('date-picker__fieldset', 'disabled', disabled),
    [disabled]
  );

  const datesWrapperElemClass = useMemo(
    () =>
      addModifierToClass(
        'date-picker__fieldset__dates-wrapper',
        'animated',
        !disabled
      ),
    [disabled]
  );

  return (
    <fieldset className={fieldsetElemClass} disabled={disabled}>
      <legend className="date-picker__fieldset__legend">Dates</legend>
      <div className={datesWrapperElemClass}>
        {options.map((date, index) => {
          const convertedDate = new Date(date);
          const dayNumber = convertedDate.getDate();
          return (
            <React.Fragment key={`${date}-${index}`}>
              {dayNumber === 1 && (
                <span className="date-picker__fieldset__dates-wrapper__separator" />
              )}
              <input
                className="date-picker__fieldset__dates-wrapper__input"
                type="radio"
                id={`${date}-${index}`}
                name="date"
                value={date}
                onChange={handleChange}
              />
              <label
                className="date-picker__fieldset__dates-wrapper__label"
                htmlFor={`${date}-${index}`}
              >
                <span className="date-picker__fieldset__dates-wrapper__label__day-name">
                  {getShortenedDayName(convertedDate)}
                </span>
                <span className="date-picker__fieldset__dates-wrapper__label__day-number">
                  {dayNumber}
                </span>
              </label>
            </React.Fragment>
          );
        })}
      </div>
    </fieldset>
  );
};

export default DatePicker;
