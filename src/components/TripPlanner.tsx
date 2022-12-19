import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Select from './Select';
import DatePicker from './DatePicker';
import { Locations, Dates } from '../types';
import './tripPlanner.css';

const TripPlanner: React.FC = () => {
  const [locations, setLocations] = useState<Locations | undefined>();
  const [dates, setDates] = useState<Dates | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');

  const fetchLocations = useCallback(async () => {
    try {
      const res = await fetch('http://localhost:3001/locations');
      if (!res.ok) {
        throw new Error('Error fetching locations');
      }
      const response = await res.json();
      setLocations(response);
    } catch (error) {
      if (typeof error === 'string') {
        setError(error);
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Error fetching location');
      }
    }
  }, []);

  const fetchDates = useCallback(async () => {
    try {
      const res = await fetch('http://localhost:3001/available_dates');
      if (!res.ok) {
        throw new Error('Error fetching available dates');
      }
      const response = await res.json();
      setDates(response);
    } catch (error) {
      if (typeof error === 'string') {
        setError(error);
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Error fetching available dates');
      }
    }
  }, []);

  useEffect(() => {
    fetchLocations();
    fetchDates();
  }, []);

  useEffect(() => {
    if (selectedCountry === '' && selectedCity !== '') {
      setSelectedCity('');
    }
  }, [selectedCountry, selectedCity, setSelectedCity]);

  const cityOptions = useMemo(() => {
    if (!locations || !selectedCountry) return;
    return locations[selectedCountry].map(city => city[1]);
  }, [locations, selectedCountry]);

  if (error) {
    return <h1>{error}</h1>;
  }

  if (!locations || !dates) {
    return <h1>Spinner</h1>;
  }

  return (
    <div className="selection-wrapper">
      <Select
        label="Country"
        defaultOption="Choose the country"
        options={Object.keys(locations)}
        setValue={setSelectedCountry}
      />
      <Select
        label="City"
        defaultOption="Choose the city"
        options={cityOptions}
        setValue={setSelectedCity}
      />
      <DatePicker
        disabled={!selectedCity}
        options={dates}
        setValue={setSelectedDate}
      />
    </div>
  );
};

export default TripPlanner;
