import { useListData } from '../../hooks/useListData';
import { List } from 'react-window';
import { RowComponent } from '../RowComponent/RowComponent';
import { ColumnModal } from '../ColumnModal/ColumnModal';
import { ListControls } from '../ListControls/ListControls';
import { ListHeader } from '../ListHeader/ListHeader';
import './ListOfEmissionsData.css';
import { memo, useMemo } from 'react';

const MemoizedListControls = memo(ListControls);
const MemoizedListHeader = memo(ListHeader);
const MemoizedColumnModal = memo(ColumnModal);
const MemoizedRowComponent = memo(RowComponent);

export default function ListOfEmissionsData() {
  const {
    processedCountries,
    yearsArr,
    selectedYear,
    searchTerm,
    regionFilter,
    sortBy,
    showModal,
    selectedColumns,
    prevYear,
    highlightUpdates,
    stableSetSelectedYear,
    stableSetSearchTerm,
    stableSetRegionFilter,
    stableSetSortBy,
    stableSetShowModal,
    stableSetSelectedColumns,
    stableSetPrevYear,
  } = useListData();

  const listProps = useMemo(
    () => ({
      countries: processedCountries,
      year: selectedYear,
      columns: selectedColumns,
      prevYear: prevYear,
      highlightUpdates: highlightUpdates,
    }),
    [
      processedCountries,
      selectedYear,
      selectedColumns,
      prevYear,
      highlightUpdates,
    ]
  );

  return (
    <div className="list-container">
      <MemoizedListControls
        selectedYear={selectedYear}
        yearsArr={yearsArr}
        regionFilter={regionFilter}
        searchTerm={searchTerm}
        onYearChange={stableSetSelectedYear}
        setPrevYear={stableSetPrevYear}
        onRegionChange={stableSetRegionFilter}
        onSearchChange={stableSetSearchTerm}
        onShowModal={() => stableSetShowModal(true)}
      />

      <MemoizedListHeader
        sortBy={sortBy}
        selectedYear={selectedYear}
        selectedColumns={selectedColumns}
        onSortChange={stableSetSortBy}
      />

      <div className="list-content">
        <List
          rowComponent={MemoizedRowComponent}
          rowCount={processedCountries.length}
          rowHeight={50}
          rowProps={listProps}
        />
      </div>

      {showModal && (
        <MemoizedColumnModal
          selectedColumns={selectedColumns}
          onColumnsChange={stableSetSelectedColumns}
          onClose={() => stableSetShowModal(false)}
        />
      )}
    </div>
  );
}
