import { memo, useCallback, useState, useMemo } from 'react';
import './ColumnModal.css';
import { availableColumns } from './types/columnModal.types';
import { formatColumnName } from '../../unitls/formatColumnName';

interface ColumnModalProps {
  selectedColumns: string[];
  onColumnsChange: (columns: string[]) => void;
  onClose: () => void;
}

export const ColumnModal = memo(function ColumnModal({
  selectedColumns,
  onColumnsChange,
  onClose,
}: ColumnModalProps) {
  const [tempSelected, setTempSelected] = useState(selectedColumns);

  const handleToggle = useCallback((column: string) => {
    setTempSelected((prev) =>
      prev.includes(column)
        ? prev.filter((c) => c !== column)
        : [...prev, column]
    );
  }, []);

  const handleApply = useCallback(() => {
    onColumnsChange(tempSelected);
    onClose();
  }, [tempSelected, onColumnsChange, onClose]);

  const columnCheckboxes = useMemo(
    () =>
      availableColumns.map((column) => (
        <label key={column} className="column-checkbox">
          <input
            type="checkbox"
            checked={tempSelected.includes(column)}
            onChange={() => handleToggle(column)}
          />
          <span>{formatColumnName(column)}</span>
        </label>
      )),
    [tempSelected, handleToggle]
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Select Columns to Display</h3>
        <div className="columns-list">{columnCheckboxes}</div>
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleApply}>Apply</button>
        </div>
      </div>
    </div>
  );
});
