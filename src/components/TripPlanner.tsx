import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  LocationsResponse,
  DatesResponse,
  ProductsResponse,
  Cities,
} from '../types';
import { mapCityResponseToCitiesObj } from '../utils/dataHelpers';
import Filter from './Filter';
import DatePicker from './DatePicker';
import Products from './Products';
import { ReactComponent as Spinner } from '../assets/spinner.svg';
import './tripPlanner.css';

const TripPlanner: React.FC = () => {
  const [locations, setLocations] = useState<LocationsResponse | undefined>();
  const [dates, setDates] = useState<DatesResponse | undefined>();
  const [products, setProducts] = useState<ProductsResponse | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');

  const cities = useMemo<Cities | undefined>(() => {
    if (!locations || !selectedCountry) return;

    return mapCityResponseToCitiesObj(locations[selectedCountry]);
  }, [[locations, selectedCountry]]);

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

  const fetchProducts = useCallback(async () => {
    try {
      if (!selectedDate || !cities?.[selectedCity]) return;

      const res = await fetch(
        `http://localhost:3001/products?date=${selectedDate}&city_id=${cities[selectedCity]}`
      );
      if (!res.ok) {
        throw new Error('Error fetching products');
      }
      const response = await res.json();
      setProducts(response);
    } catch (error) {
      if (typeof error === 'string') {
        setError(error);
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Error fetching product');
      }
    }
  }, [selectedDate, cities, selectedCity]);

  useEffect(() => {
    fetchLocations();
    fetchDates();
  }, []);

  useEffect(() => {
    if (selectedCity !== '') {
      setSelectedCity('');
    }
  }, [selectedCountry]);

  useEffect(() => {
    fetchProducts();
  }, [selectedCity, selectedDate]);

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!locations || !dates) {
    return <Spinner className="spinner" />;
  }

  return (
    <>
      <div className="filters-wrapper">
        <Filter
          label="Country"
          defaultOption="Choose the country"
          options={Object.keys(locations)}
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
          options={dates}
          setValue={setSelectedDate}
        />
      </div>
      <div className="page-separator" />
      <Products products={products} />
    </>
  );
};

export default TripPlanner;
