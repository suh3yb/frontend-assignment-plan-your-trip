import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Select from './Select';
import DatePicker from './DatePicker';
import ProductCard from './ProductCard';
import {
  LocationsResponse,
  DatesResponse,
  ProductsResponse,
  Cities,
} from '../types';
import {
  getDiscountedPrice,
  mapCityResponseToCitiesObj,
} from '../utils/dataHelpers';
import './tripPlanner.css';
import Products from './Products';

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
      console.log('response :>> ', response);
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
    return <h1>{error}</h1>;
  }

  if (!locations || !dates) {
    return <h1>Spinner</h1>;
  }

  return (
    <>
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
          options={cities && Object.keys(cities)}
          setValue={setSelectedCity}
        />
        <DatePicker
          disabled={!selectedCity}
          options={dates}
          setValue={setSelectedDate}
        />
      </div>
      <Products products={products} />
    </>
  );
};

export default TripPlanner;
