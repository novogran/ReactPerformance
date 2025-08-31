import { type RowComponentProps } from 'react-window';
import type { Country } from '../../types/emissions.types';
import './RowComponent.css';
import { memo, useCallback, useMemo } from 'react';

export const RowComponent = memo(function RowComponent({
  index,
  style,
  countries,
  year,
  columns,
  prevYear,
  highlightUpdates,
}: RowComponentProps<{
  countries: Country[];
  year: number | null;
  columns: string[];
  prevYear: number | null;
  highlightUpdates: boolean;
}>) {
  const country = countries[index];

  const { yearData, prevYearData, iso_code } = useMemo(() => {
    const yearData =
      country.data.find((info) => info.year === year) ||
      country.data[country.data.length - 1];
    const prevYearData = prevYear
      ? country.data.find((info) => info.year === prevYear) ||
        country.data[country.data.length - 1]
      : null;

    return { yearData, prevYearData, iso_code: country.iso_code };
  }, [country, year, prevYear]);

  const hasValueChanged = useCallback(
    (column: string) => {
      if (!prevYearData) return false;
      const currentValue = yearData[column as keyof typeof yearData];
      const previousValue = prevYearData[column as keyof typeof prevYearData];
      return currentValue !== previousValue;
    },
    [yearData, prevYearData]
  );

  const populationCell = useMemo(
    () => (
      <div
        className={`row-item ${highlightUpdates && hasValueChanged('population') ? 'highlight' : ''}`}
      >
        {yearData.population ? yearData.population.toLocaleString() : 'N/A'}
      </div>
    ),
    [yearData.population, highlightUpdates, hasValueChanged]
  );

  const columnCells = useMemo(
    () =>
      columns.map((column) => {
        if (column === 'iso_code') {
          return (
            <div key={column} className="row-item">
              {iso_code ? iso_code : 'N/A'}
            </div>
          );
        }

        const value = yearData[column as keyof typeof yearData];
        const displayValue =
          value !== undefined && value !== null
            ? typeof value === 'number'
              ? value.toLocaleString()
              : value
            : 'N/A';

        return (
          <div
            key={column}
            className={`row-item ${highlightUpdates && hasValueChanged(column) ? 'highlight' : ''}`}
          >
            {displayValue}
          </div>
        );
      }),
    [columns, yearData, iso_code, highlightUpdates, hasValueChanged]
  );

  return (
    <div className="row-component" style={style}>
      <div className="row-item">{country.name}</div>
      {populationCell}
      {columnCells}
    </div>
  );
});
