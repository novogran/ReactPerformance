import type { EmissionsData, Country } from '../types/emissions.types';

export function transformEmissionsData(data: EmissionsData): Country[] {
  return Object.entries(data).map(([name, countryData]) => ({
    name,
    ...countryData,
  }));
}
