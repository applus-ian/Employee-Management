import * as React from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  SortingState,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState,
  useReactTable,
} from '@tanstack/react-table';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter,
    },
  });

  return (
    <div>
      <div className="flex items-center py-4">
        <div className="flex items-center space-x-2 pr-5">
          <span className="text-sm">Show</span>
          <select
            className="border rounded-md px-2 py-1 text-sm bg-[#9E9E9E]"
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[5, 10, 20, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize} className="bg-white">
                {pageSize}
              </option>
            ))}
          </select>
          <span className="text-sm">entries</span>
        </div>
        <Input
          placeholder="Search assigned department..."
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="w-full"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-center space-x-2 py-3">
        {/* Previous Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="bg-transparent border-none"
        >
          Previous
        </Button>

        {/* Page Numbers */}
        <div className="flex items-center space-x-1">
          {table.getPageCount() > 1 && (
            <>
              {/* Render current page with clickable numbers */}
              {table.getPageCount() > 1 &&
                Array.from({ length: table.getPageCount() }).map((_, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => table.setPageIndex(0)}
                    className={`${table.getState().pagination.pageIndex === index ? 'bg-[#624DE3] text-white' : ''}`}
                  >
                    {index + 1}
                  </Button>
                ))}
            </>
          )}
        </div>

        {/* Next Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="bg-transparent border-none"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
