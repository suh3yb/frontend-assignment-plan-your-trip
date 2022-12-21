import { useEffect, useCallback, useState } from 'react';
import { DatesResponse } from '../types';
import { getErrorMessage } from '../utils/dataHelpers';

const DEFAULT_ERROR_MESSAGE = 'Error fetching available dates';

type UseDates = () => {
  dates: DatesResponse | undefined;
  error: string | undefined;
  isLoading: boolean;
};

export const useDates: UseDates = () => {
  const [dates, setDates] = useState<DatesResponse | undefined>();
  const [error, setError] = useState<string | undefined>();

  const fetchDates = useCallback(async () => {
    try {
      const res = await fetch('http://localhost:3001/available_dates');
      if (!res.ok) {
        throw new Error(DEFAULT_ERROR_MESSAGE);
      }
      const response = await res.json();
      setDates(response);
    } catch (error) {
      setError(getErrorMessage(error, DEFAULT_ERROR_MESSAGE));
    }
  }, []);

  useEffect(() => {
    fetchDates();
  }, []);

  return {
    dates,
    error,
    isLoading: !dates && !error,
  };
};
