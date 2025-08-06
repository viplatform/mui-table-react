import React, { forwardRef, useImperativeHandle } from 'react';
import {
  MaterialReactTable,
  MRT_SortingState as sortingState,
  MRT_RowSelectionState as rowSelectionState,
  MRT_Row as enableRowSelectionState,
  useMaterialReactTable,
  type MRT_ColumnDef as columnType,
} from 'material-react-table';
import { OnChangeFn, PaginationState } from '@tanstack/react-table';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { CheckboxProps } from '@mui/material/Checkbox';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import _noop from 'lodash/noop';

import NoDataError from './components/NoDataError';

interface IBaseTable {
  data: { [key: string]: unknown }[];
  columns: { [key: string]: unknown }[] | unknown;
  isLoading?: boolean;
  enableColumnActions?: boolean;
  enableFacetedValues?: boolean;
  enableHiding?: boolean;
  enableDensityToggle?: boolean;
  manualExpanding?: boolean;
  enableFullScreenToggle?: boolean;
  enableSorting?: boolean;
  enableCellActions?: boolean;
  showColumnFilters?: boolean;
  showGlobalFilter?: boolean;
  enableGlobalFilter?: boolean;
  enableToolbarInternalActions?: boolean;
  columnVisibility?: { [key: string]: boolean };
  enableStickyHeader?: boolean;
  visibleInShowHideMenu?: boolean;
  manualPagination?: boolean;
  enablePagination?: boolean;
  enableTopToolbar?: boolean;
  enableBottomToolbar?: boolean;
  enableColumnFilters?: boolean;
  enableExpandAll?: boolean;
  enableColumnPinning?: boolean;
  enableColumnOrdering?: boolean;
  enableColumnDragging?: boolean;
  enableRowSelection?:
    | boolean
    | ((row: enableRowSelectionState<{ [key: string]: unknown }>) => boolean);
  enableMultiRowSelection?: boolean;
  enableSelectAll?: boolean;
  rowCount?: number;
  leftFixedColumnIds?: string[];
  rightFixedColumnIds?: string[];
  rowSelection?: rowSelectionState;
  columnOrder?: string[];
  paginationDisplayMode?: 'pages' | 'custom' | 'default';
  positionToolbarAlertBanner?: 'bottom' | 'head-overlay' | 'none' | 'top';
  positionGlobalFilter?: 'none' | 'left' | 'right';
  muiPaginationProps?: { [key: string]: unknown };
  muiTableHeadCellProps?: { [key: string]: unknown };
  muiTableBodyStyleProps?: React.CSSProperties;
  searchBoxPlaceholder?: string;
  pagination?: PaginationState;
  sorting?: sortingState;
  onColumnOrderChange?: (e: unknown) => void;
  onSortingChange?: OnChangeFn<sortingState>;
  onTableContainerScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
  onColumnVisibilityChange?: (e: unknown) => void;
  onRowSelectionChange?: OnChangeFn<rowSelectionState>;
  renderDetailPanel?: ({
    row,
  }: {
    row: enableRowSelectionState<{ [key: string]: unknown }>;
  }) => JSX.Element;
  renderEmptyRowsFallback?: () => JSX.Element;
  renderTopToolbarCustomActions?: (e: unknown) => JSX.Element;
  renderToolbarInternalActions?: (e: unknown) => JSX.Element;
  onPaginationChange?: OnChangeFn<PaginationState> | undefined;
  onGlobalFilterChange?: (searchText: string) => void;
  muiSelectCheckboxProps?:
    | CheckboxProps
    | (({
        row,
        table,
      }: {
        row: enableRowSelectionState<{ [key: string]: unknown }>;
        table: unknown;
      }) => CheckboxProps);
  getRowId?: (row: { [key: string]: unknown }) => string;
  emptyTableText?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tableRef?: any;
}

const BaseTable = forwardRef((props: IBaseTable, tableInstanceRef) => {
  const {
    data,
    columns,
    tableRef = null,
    isLoading = false,
    enableRowSelection = false,
    enableColumnActions = false,
    enableFacetedValues = true,
    enableHiding = false,
    enableDensityToggle = false,
    manualExpanding = false,
    enableFullScreenToggle = false,
    enableSorting = false,
    enableCellActions = false,
    enableSelectAll = true,
    showColumnFilters = false,
    visibleInShowHideMenu = false,
    enableExpandAll = true,
    enablePagination = true,
    showGlobalFilter = true,
    enableGlobalFilter = true,
    enableToolbarInternalActions = true,
    enableStickyHeader = true,
    manualPagination = true,
    enableTopToolbar = true,
    enableBottomToolbar = true,
    enableColumnFilters = true,
    enableColumnPinning = false,
    enableColumnOrdering = false,
    enableColumnDragging = false,
    enableMultiRowSelection = true,
    rowCount,
    rowSelection = {},
    columnVisibility = {},
    leftFixedColumnIds = [],
    rightFixedColumnIds = [],
    columnOrder = [],
    paginationDisplayMode = 'default',
    positionToolbarAlertBanner = 'bottom',
    positionGlobalFilter = 'left',
    muiPaginationProps,
    muiTableHeadCellProps,
    muiTableBodyStyleProps = {},
    pagination,
    searchBoxPlaceholder = 'Search',
    sorting = [],
    onColumnOrderChange,
    onRowSelectionChange,
    onSortingChange,
    onColumnVisibilityChange,
    onGlobalFilterChange,
    onTableContainerScroll = _noop,
    renderDetailPanel,
    emptyTableText,
    renderEmptyRowsFallback = () => <NoDataError text={emptyTableText} />,
    onPaginationChange,
    renderTopToolbarCustomActions,
    renderToolbarInternalActions,
    getRowId,
    muiSelectCheckboxProps,
  } = props;
  const table = useMaterialReactTable({
    columns: columns as columnType<{ [key: string]: unknown }>[],
    data,
    enableRowSelection,
    enableColumnActions,
    enableFacetedValues,
    enableHiding,
    enableDensityToggle,
    manualExpanding,
    enableFullScreenToggle,
    enableSorting,
    enableCellActions,
    enableGlobalFilter,
    enableToolbarInternalActions,
    initialState: {
      showColumnFilters,
      showGlobalFilter,
      columnPinning: { left: leftFixedColumnIds, right: rightFixedColumnIds },
    },
    paginationDisplayMode,
    positionToolbarAlertBanner,
    positionGlobalFilter,
    enableStickyHeader,
    muiPaginationProps,
    muiTableHeadCellProps,
    manualPagination,
    enablePagination,
    enableTopToolbar,
    enableBottomToolbar,
    enableColumnFilters,
    enableExpandAll,
    rowCount,
    enableColumnPinning,
    enableColumnOrdering,
    enableColumnDragging,
    enableMultiRowSelection,
    enableSelectAll,
    displayColumnDefOptions: {
      'mrt-row-actions': {
        visibleInShowHideMenu,
      },
      'mrt-row-expand': {
        header: '',
        Cell: () => null,
      },
    },
    muiTopToolbarProps: {
      sx: {
        pt: '20px',
        pb: '16px',
        px: '12px',
      },
    },
    muiTableContainerProps: {
      ref: tableRef,
      sx: {
        minWidth: '450px',
        overflowY: 'auto',
      },
      onScroll: onTableContainerScroll,
    },
    muiTableBodyCellProps: {
      sx: {
        color: '#000000de',
        ...muiTableBodyStyleProps,
      },
    },
    muiSearchTextFieldProps: {
      placeholder: searchBoxPlaceholder,
      InputProps: {
        style: { minWidth: '350px' },
      },
    },
    state: {
      isLoading,
      columnOrder,
      columnVisibility,
      rowSelection,
      sorting,
      ...(manualPagination && enablePagination && { pagination }),
    },
    paginateExpandedRows: false,
    onColumnOrderChange,
    onRowSelectionChange,
    onSortingChange,
    onColumnVisibilityChange,
    renderEmptyRowsFallback,
    onGlobalFilterChange,
    renderDetailPanel,
    onPaginationChange,
    renderTopToolbarCustomActions,
    renderToolbarInternalActions,
    getRowId,
    muiExpandButtonProps: ({
      row,
      table,
    }: {
      row: enableRowSelectionState<{ [key: string]: unknown }>;
      table: ReturnType<typeof useMaterialReactTable<{ [key: string]: unknown }>>;
    }) => ({
      onClick: () => table.setExpanded({ [row.id]: !row.getIsExpanded() }),
      sx: {
        transform: row.getIsExpanded() ? 'rotate(180deg)' : 'rotate(-90deg)',
        transition: 'transform 0.2s',
      },
    }),
    muiSelectCheckboxProps,
  });
  useImperativeHandle(tableInstanceRef, () => table, [table]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MaterialReactTable table={table} />
    </LocalizationProvider>
  );
});

BaseTable.displayName = 'BaseTable';

export default BaseTable;
