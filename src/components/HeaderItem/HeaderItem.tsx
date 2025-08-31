import { memo } from 'react';

interface HeaderItemProps {
  field: string;
  label: string;
  sortBy: { field: string; direction: string };
  onSort: (field: string) => void;
}

export const HeaderItem = memo(function HeaderItem({
  field,
  label,
  sortBy,
  onSort,
}: HeaderItemProps) {
  const handleClick = () => onSort(field);

  const sortIndicator =
    sortBy.field === field ? (sortBy.direction === 'asc' ? '↑' : '↓') : '';

  return (
    <div className="list-header-item sortable" onClick={handleClick}>
      {label} {sortIndicator}
    </div>
  );
});
