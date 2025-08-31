import { memo, useCallback, useMemo } from 'react';

interface ListControlsProps {
  selectedYear: number | null;
  yearsArr: number[];
  regionFilter: string;
  searchTerm: string;
  setPrevYear: (year: number | null) => void;
  onYearChange: (year: number) => void;
  onRegionChange: (region: string) => void;
  onSearchChange: (search: string) => void;
  onShowModal: () => void;
}

export const ListControls = memo(function ListControls({
  selectedYear,
  yearsArr,
  regionFilter,
  searchTerm,
  setPrevYear,
  onYearChange,
  onRegionChange,
  onSearchChange,
  onShowModal,
}: ListControlsProps) {
  const handleYearChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setPrevYear(selectedYear);
      onYearChange(Number(e.target.value));
    },
    [selectedYear, setPrevYear, onYearChange]
  );

  const handleRegionChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onRegionChange(e.target.value);
    },
    [onRegionChange]
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onSearchChange(e.target.value);
    },
    [onSearchChange]
  );

  const yearOptions = useMemo(
    () =>
      yearsArr.map((y) => (
        <option key={y} value={y}>
          {y}
        </option>
      )),
    [yearsArr]
  );

  return (
    <div className="controls-section">
      <div className="control-group">
        <label>Year:</label>
        <select value={selectedYear || ''} onChange={handleYearChange}>
          {yearOptions}
        </select>
      </div>

      <div className="control-group">
        <label>Region:</label>
        <select value={regionFilter} onChange={handleRegionChange}>
          <option value="all">All Regions</option>
          <option value="Africa">Africa</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="North America">North America</option>
          <option value="South America">South America</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>

      <div className="control-group">
        <label>Search:</label>
        <input
          type="text"
          placeholder="Search countries..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <button className="columns-button" onClick={onShowModal}>
        Select Columns
      </button>
    </div>
  );
});
