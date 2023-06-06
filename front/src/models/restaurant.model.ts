export interface RestaurantData {
  region: string[];
  category: string[];
  restaurant: Restaurant[];
  total: number;
}

export interface Restaurant {
  _id: string;
  category: string;
  name: string;
  region: string;
  address: string;
  tel: string;
  description: string;
  latitude: number;
  longitude: number;
  reservation: number;
  image: string;
}
