import { Cities, CityResponse } from '../types';

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
