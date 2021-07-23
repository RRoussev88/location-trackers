export interface LatLng {
  lat: number;
  lng: number;
}

export interface Report {
  id: string;
  location: LatLng;
  altitude: number;
  name: string;
  speed: number;
}
