import React, { useEffect, useMemo, useState } from 'react';
import Filter from './Filter';
import DatePicker from './DatePicker';
import Products from './Products';
import { ReactComponent as Spinner } from '../assets/spinner.svg';
import './tripPlanner.css';
import { useLocations } from '../hooks/useLocations';
import { useDates } from '../hooks/useDates';
import { useProducts } from '../hooks/useProducts';
import { Cities } from '../types';
import { mapCityResponseToCitiesObj } from '../utils/dataHelpers';

const TripPlanner: React.FC = () => {
  const {
    locations,
    error: locationsError,
    isLoading: isLocationsLoading,
  } = useLocations();
  const { dates, error: datesError, isLoading: isDatesLoading } = useDates();

  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');

  const cities = useMemo<Cities | undefined>(() => {
    if (!locations || !selectedCountry) return;

    return mapCityResponseToCitiesObj(locations[selectedCountry]);
  }, [[locations, selectedCountry]]);

  const {
    products,
    error: productsError,
    isLoading: isProductsLoading,
  } = useProducts(cities, selectedCity, selectedDate);

  useEffect(() => {
    if (selectedCity !== '') {
      setSelectedCity('');
    }
  }, [selectedCountry]);

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
    <>
      <div className="filters-wrapper">
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
      <div className="page-separator" />
      {isProductsLoading ? (
        <Spinner className="spinner" />
      ) : (
        <>
          {products && <Products products={products} />}
          {productsError && <p className="error-message">{productsError}</p>}
        </>
      )}
    </>
  );
};

export default TripPlanner;
