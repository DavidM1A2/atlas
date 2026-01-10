export interface LatLng {
    lat: number;
    lng: number;
}

export interface LanguageGroup {
    id: string;
    name: string;
    coordinates: LatLng[];
    population: number;
}
