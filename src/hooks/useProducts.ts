import { useEffect, useCallback, useState } from 'react';
import { Cities, ProductsResponse } from '../types';
import { getErrorMessage } from '../utils/dataHelpers';

const DEFAULT_ERROR_MESSAGE = 'Error fetching products';

type UseProducts = (
  cities: Cities | undefined,
  selectedCity: string,
  selectedDate: string
) => {
  products: ProductsResponse | undefined;
  error: string | undefined;
  isLoading: boolean;
};

export const useProducts: UseProducts = (
  cities,
  selectedCity,
  selectedDate
) => {
  const [products, setProducts] = useState<ProductsResponse | undefined>();
  const [error, setError] = useState<string | undefined>();

  const fetchProducts = useCallback(async () => {
    if (!selectedDate || !cities?.[selectedCity]) return;

    try {
      const res = await fetch(
        `http://localhost:3001/products?date=${selectedDate}&city_id=${cities[selectedCity]}`
      );
      if (!res.ok) {
        throw new Error(DEFAULT_ERROR_MESSAGE);
      }
      const response = await res.json();
      setProducts(response);
    } catch (error) {
      setError(getErrorMessage(error, DEFAULT_ERROR_MESSAGE));
    }
  }, [selectedDate, cities, selectedCity]);

  useEffect(() => {
    fetchProducts();
  }, [selectedCity, selectedDate]);

  return {
    products,
    error,
    isLoading: Boolean(selectedCity && selectedDate) && !products && !error,
  };
};
