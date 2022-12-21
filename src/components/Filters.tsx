import React, { useEffect, useMemo, useState } from 'react';
import { Cities } from '../types';
import { mapCityResponseToCitiesObj } from '../utils/dataHelpers';
import { useDates } from '../hooks/useDates';
import { useLocations } from '../hooks/useLocations';
import DatePicker from './DatePicker';
import Filter from './Filter';
import { ReactComponent as Spinner } from '../assets/spinner.svg';
import './Filters.css';

interface Props {
  setSelectedCityId: React.Dispatch<React.SetStateAction<string>>;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
}

const Filters: React.FC<Props> = ({ setSelectedCityId, setSelectedDate }) => {
  const {
    locations,
    error: locationsError,
    isLoading: isLocationsLoading,
  } = useLocations();
  const { dates, error: datesError, isLoading: isDatesLoading } = useDates();

  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');

  const cities = useMemo<Cities | undefined>(() => {
    if (!locations || !selectedCountry) return;

    return mapCityResponseToCitiesObj(locations[selectedCountry]);
  }, [[locations, selectedCountry]]);

  useEffect(() => {
    if (selectedCity === '') return;
    setSelectedCity('');
  }, [selectedCountry]);

  useEffect(() => {
    if (!cities || selectedCity === '') {
      setSelectedCityId('');
    } else {
      setSelectedCityId(cities[selectedCity]);
    }
  }, [cities, selectedCity]);

  if (isLocationsLoading || isDatesLoading) {
    return <Spinner className="spinner" />;
  }

  if (locationsError || datesError) {
    return (
      <>
        {locationsError && <p className="error-message">{locationsError}</p>}
        {datesError && <p className="error-message">{datesError}</p>}
      </>
    );
  }

  return (
    <div className="filters-wrapper appear">
      <Filter
        label="Country"
        defaultOption="Choose the country"
        options={locations && Object.keys(locations)}
        setValue={setSelectedCountry}
      />
      <Filter
        label="City"
        defaultOption="Choose the city"
        options={cities && Object.keys(cities)}
        setValue={setSelectedCity}
      />
      <DatePicker
        disabled={!selectedCity}
        options={dates!}
        setValue={setSelectedDate}
      />
    </div>
  );
};

export default Filters;
