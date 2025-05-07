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
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { CirclePlus } from 'lucide-react';
import NewSkillCategoryForm from './create-form';

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

  // Placeholder functions for onCancel and onSave
  const handleCancel = () => {
    console.log('Cancelled');
  };

  const handleSave = () => {
    console.log('Saved');
  };

  return (
    <div>
      <div className="flex items-center py-4">
        <div className="flex items-center space-x-4 pr-5">
          <span className="text-sm">Show</span>
          <select
            className="border rounded-md px-2 py-1 text-sm"
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[5, 10, 20, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
          <span className="text-sm">entries</span>
        </div>
        <Input
          placeholder="Search category..."
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-xs"
        />
        <div className="pl-5">
          <Dialog>
            <DialogTrigger asChild>
              <button className="px-2 py-1 text-[#EE7A2A] font-medium text-xs rounded-md hover:bg-[#FFA161] hover:text-white border border-[#EE7A2A] size-fit">
                <span className="flex items-center gap-1">
                  Add New Category
                  <CirclePlus size={18} strokeWidth={2} />
                </span>
              </button>
            </DialogTrigger>
            <div>
              <NewSkillCategoryForm onCancel={handleCancel} onSave={handleSave} />
            </div>
          </Dialog>
        </div>
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
