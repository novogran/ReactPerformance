import { useState, useEffect, useMemo, useCallback } from 'react';
import { getRegionFromISOCode } from '../unitls/countryRegionMapping';
import { getYearsArray } from '../unitls/getYearsArr';
import { filterCountries, sortCountries } from '../unitls/listHelpers';
import { getEmissionsData } from '../unitls/loadCO2Data';
import { transformEmissionsData } from '../unitls/transformEmissionsData';

const emissionsData = getEmissionsData();

export const useListData = () => {
  const [year, setYear] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('all');
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState({ field: 'name', direction: 'asc' });
  const [showModal, setShowModal] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState([
    'year',
    'iso_code',
    'co2',
    'co2_per_capita',
  ]);
  const [highlightUpdates, setHighlightUpdates] = useState(false);
  const [prevYear, setPrevYear] = useState<number | null>(null);

  const countries = useMemo(
    () => transformEmissionsData(emissionsData.read()),
    []
  );

  const enrichedCountries = useMemo(
    () =>
      countries.map((country) => ({
        ...country,
        region: getRegionFromISOCode(country.iso_code || ''),
      })),
    [countries]
  );

  const yearsArr = useMemo(
    () => getYearsArray(enrichedCountries),
    [enrichedCountries]
  );

  const stableSetSelectedYear = useCallback(
    (newYear: number) => {
      setPrevYear(selectedYear);
      setSelectedYear(newYear);
    },
    [selectedYear]
  );

  const stableSetSearchTerm = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const stableSetRegionFilter = useCallback((filter: string) => {
    setRegionFilter(filter);
  }, []);

  const stableSetSortBy = useCallback(
    (newSortBy: { field: string; direction: string }) => {
      setSortBy(newSortBy);
    },
    []
  );

  const stableSetShowModal = useCallback((show: boolean) => {
    setShowModal(show);
  }, []);

  const stableSetSelectedColumns = useCallback((columns: string[]) => {
    setSelectedColumns(columns);
  }, []);

  const stableSetPrevYear = useCallback((year: number | null) => {
    setPrevYear(year);
  }, []);

  useEffect(() => {
    if (yearsArr.length > 0 && !selectedYear) {
      const latestYear = yearsArr[yearsArr.length - 1];
      stableSetPrevYear(latestYear);
      stableSetSelectedYear(latestYear);
      setYear(latestYear);
    }
  }, [yearsArr, selectedYear, stableSetPrevYear, stableSetSelectedYear]);

  useEffect(() => {
    if (selectedYear && selectedYear !== year) {
      setHighlightUpdates(true);
      const timer = setTimeout(() => setHighlightUpdates(false), 1000);
      return () => clearTimeout(timer);
    }
    setYear(selectedYear);
  }, [selectedYear, year]);

  const processedCountries = useMemo(() => {
    const filtered = filterCountries(
      enrichedCountries,
      searchTerm,
      regionFilter
    );
    return sortCountries(filtered, sortBy, selectedYear);
  }, [enrichedCountries, searchTerm, regionFilter, sortBy, selectedYear]);

  return {
    processedCountries,
    yearsArr,
    selectedYear,
    searchTerm,
    regionFilter,
    sortBy,
    showModal,
    selectedColumns,
    highlightUpdates,
    prevYear,
    stableSetSelectedYear,
    stableSetSearchTerm,
    stableSetRegionFilter,
    stableSetSortBy,
    stableSetShowModal,
    stableSetSelectedColumns,
    stableSetPrevYear,
  };
};
