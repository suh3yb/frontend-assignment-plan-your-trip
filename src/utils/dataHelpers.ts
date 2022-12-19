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
