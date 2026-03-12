export type RouteId = string;

export interface Route {
  routeId: RouteId;
  vesselType: string;
  fuelType: string;
  year: number;

 
  ghgIntensity: number;

  
  fuelConsumption: number;

  
  distance: number;

  
  totalEmissions: number;

  isBaseline: boolean;
}

