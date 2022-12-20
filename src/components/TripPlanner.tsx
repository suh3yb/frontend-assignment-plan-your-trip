import React, { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import Filters from './Filters';
import Products from './Products';
import { ReactComponent as Spinner } from '../assets/spinner.svg';
import './tripPlanner.css';

const TripPlanner: React.FC = () => {
  const [selectedCityId, setSelectedCityId] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');

  const {
    products,
    error: productsError,
    isLoading: isProductsLoading,
  } = useProducts(selectedCityId, selectedDate);

  return (
    <>
      <Filters
        setSelectedCityId={setSelectedCityId}
        setSelectedDate={setSelectedDate}
      />
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
