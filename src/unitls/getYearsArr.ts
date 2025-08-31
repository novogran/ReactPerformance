import type { Country } from '../types/emissions.types';

export function getYearsArray(countryArr: Country[]): number[] {
  const result: number[] = [];
  const countryData = countryArr[0].data;
  countryData.forEach((value) => result.push(value.year));
  return result;
}
