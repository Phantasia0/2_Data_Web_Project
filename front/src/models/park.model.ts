export interface ParkData {
  region: string[];
  category: any[];
  park: Park[];
  total: number;
}

export interface Park {
  _id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  tel: string;
  region: string;
}
