import React, { useMemo } from 'react';
import { addAnimateClass, addDisabledClass } from '../utils/classNameHelpers';
import { getShortenedDayName } from '../utils/dateHelper';
import { Dates } from '../types';
import './datePicker.css';

interface Props {
  options: Dates;
  disabled: boolean;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const DatePicker: React.FC<Props> = ({ options, disabled }) => {
  const fieldsetElemClass = useMemo(
    () => addDisabledClass('date-picker__fieldset', disabled),
    [disabled]
  );

  const datesWrapperElemClass = useMemo(
    () => addAnimateClass('date-picker__fieldset__dates-wrapper', !disabled),
    [disabled]
  );

  return (
    <fieldset className={fieldsetElemClass}>
      <legend className="date-picker__fieldset__legend">Dates:</legend>
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
