import { Cities, CityResponse } from '../types';

export const DEFAULT_ERROR_MESSAGE = 'Error fetching data';
export const getErrorMessage = (
  error: unknown,
  defaultMessage?: string
): string => {
  if (typeof error === 'string') {
    return error;
  } else if (error instanceof Error) {
    return error.message;
  } else {
    return defaultMessage ?? DEFAULT_ERROR_MESSAGE;
  }
};

export const mapCityResponseToCitiesObj = (
  cityResArr: CityResponse[]
): Cities =>
  cityResArr.reduce((prevValue, curValue) => {
    Object.defineProperty(prevValue, curValue[1], {
      value: curValue[0].toString(),
      enumerable: true,
    });
    return prevValue;
  }, {});

export const getDiscountedPrice = (
  price: number,
  discountPercentage: number
): string => ((price * (100 - discountPercentage)) / 100).toFixed(2);

export const getImgAltTextFromTitle = (title: string): string =>
  title.split(':')[0];
