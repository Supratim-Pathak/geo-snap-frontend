export interface Route {
  popupContent: string;
  coords: [number, number];
}
export interface Props {
  handelPlacePointer: (params: Route) => void;
}

export interface Location {
  place_id: React.Key | null | undefined;
  display_name: string | number | bigint | boolean | null | undefined;
  lat: number;
  lon: number;
  label?: string;
}
