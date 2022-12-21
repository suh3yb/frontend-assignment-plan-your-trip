import React, { useState } from 'react';
import Filters from './Filters';
import Products from './Products';
import './TripPlanner.css';

const TripPlanner: React.FC = () => {
  const [selectedCityId, setSelectedCityId] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');

  return (
    <>
      <Filters
        setSelectedCityId={setSelectedCityId}
        setSelectedDate={setSelectedDate}
      />
      <div className="page-separator" />
      <Products selectedCityId={selectedCityId} selectedDate={selectedDate} />
    </>
  );
};

export default TripPlanner;
