export interface EmissionsData {
  [countryName: string]: Country;
}
export interface Country {
  region?: string;
  name?: string;
  iso_code?: string;
  data: CountryData[];
}

export interface CountryData {
  iso_code?: string;
  year: number;
  population?: number;
  co2?: number;
  co2_per_capita?: number;
  methane?: number;
  oil_co2?: number;
  gas_co2?: number;
  cement_co2?: number;
  flaring_co2?: number;
  other_co2?: number;
  temperature_change_from_co2?: number;
  energy_per_capita?: number;
  energy_per_gdp?: number;

  [key: string]: string | number | undefined;
}
