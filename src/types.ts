export interface LatLng {
  latitude: number;
  longitude: number;
}

export interface Tracker {
  id: string;
  location: LatLng;
  altitude: number;
  name: string;
  speed: number;
}
