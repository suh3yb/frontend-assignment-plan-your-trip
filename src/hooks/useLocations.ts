import { useEffect, useCallback, useState } from 'react';
import { LocationsResponse } from '../types';
import { getErrorMessage } from '../utils/dataHelpers';

const DEFAULT_ERROR_MESSAGE = 'Error fetching locations';

type UseLocations = () => {
  locations: LocationsResponse | undefined;
  error: string | undefined;
  isLoading: boolean;
};

export const useLocations: UseLocations = () => {
  const [locations, setLocations] = useState<LocationsResponse | undefined>();
  const [error, setError] = useState<string | undefined>();

  const fetchLocations = useCallback(async () => {
    try {
      const res = await fetch('http://localhost:3001/locations');
      if (!res.ok) {
        throw new Error(DEFAULT_ERROR_MESSAGE);
      }
      const response = await res.json();
      setLocations(response);
    } catch (error) {
      setError(getErrorMessage(error, DEFAULT_ERROR_MESSAGE));
    }
  }, []);

  useEffect(() => {
    fetchLocations();
  }, []);

  return {
    locations,
    error,
    isLoading: !locations && !error,
  };
};
