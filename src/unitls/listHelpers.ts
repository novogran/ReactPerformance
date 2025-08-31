import type { Country, CountryData } from '../types/emissions.types';

export const sortCountries = (
  countries: Country[],
  sortBy: { field: string; direction: string },
  selectedYear: number | null
) => {
  return [...countries].sort((a, b) => {
    const aData = getCountryData(a, selectedYear);
    const bData = getCountryData(b, selectedYear);

    const aValue = getSortValue(a, aData, sortBy.field);
    const bValue = getSortValue(b, bData, sortBy.field);

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortBy.direction === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else {
      const numA = Number(aValue);
      const numB = Number(bValue);
      return sortBy.direction === 'asc' ? numA - numB : numB - numA;
    }
  });
};

export const filterCountries = (
  countries: Country[],
  searchTerm: string,
  regionFilter: string
) => {
  return countries.filter((country) => {
    const matchesSearch =
      country.name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false;
    const matchesRegion =
      regionFilter === 'all' || country.region === regionFilter;
    return matchesSearch && matchesRegion;
  });
};

const getCountryData = (
  country: Country,
  selectedYear: number | null
): CountryData => {
  return (
    country.data.find((d) => d.year === selectedYear) ||
    country.data[country.data.length - 1]
  );
};

const getSortValue = (
  country: Country,
  countryData: CountryData,
  field: string
): string | number => {
  if (field === 'name') return country.name || '';
  if (field === 'population') return countryData.population || 0;
  return countryData[field as keyof CountryData] || 0;
};
