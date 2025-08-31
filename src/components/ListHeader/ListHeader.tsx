import { memo, useCallback, useMemo } from 'react';
import { HeaderItem } from '../HeaderItem/HeaderItem';

interface ListHeaderProps {
  sortBy: { field: string; direction: string };
  selectedYear: number | null;
  selectedColumns: string[];
  onSortChange: (sort: { field: string; direction: string }) => void;
}

export const ListHeader = memo(function ListHeader({
  sortBy,
  selectedYear,
  selectedColumns,
  onSortChange,
}: ListHeaderProps) {
  const handleSort = useCallback(
    (field: string) => {
      onSortChange({
        field,
        direction:
          sortBy.field === field && sortBy.direction === 'asc' ? 'desc' : 'asc',
      });
    },
    [sortBy.field, sortBy.direction, onSortChange]
  );

  const columnHeaders = useMemo(
    () =>
      selectedColumns.map((column) => (
        <div key={column} className="list-header-item">
          {column.replace(/_/g, ' ')}
        </div>
      )),
    [selectedColumns]
  );

  return (
    <div className="list-header">
      <div className="list-header-content">
        <HeaderItem
          field="name"
          label="Country"
          sortBy={sortBy}
          onSort={handleSort}
        />
        <HeaderItem
          field="population"
          label={`Population (${selectedYear})`}
          sortBy={sortBy}
          onSort={handleSort}
        />
        {columnHeaders}
      </div>
    </div>
  );
});
