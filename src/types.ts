export type CityResponse = [number, string];

export type Cities = { [cityName: string]: string };

export type LocationsResponse = {
  [country: string]: CityResponse[];
};

export type DatesResponse = string[];

export type ProductResponse = {
  product_url: string;
  image: string;
  id: number;
  title: string;
  price: 31.3;
  summary: string;
  city_id: number;
  available_dates: DatesResponse;
  discount_percentage?: number;
};

export type ProductsResponse = ProductResponse[];
