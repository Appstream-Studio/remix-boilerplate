import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Form, useSubmit } from "@remix-run/react";
import { Table } from "@tanstack/react-table";

import { Button } from "~/components/ui/button";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const submit = useSubmit();
  return (
    <div className="flex items-center justify-between px-2">
      {/* Needs a column named "select" to be displayed */}
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="md:flex items-center space-x-2 hidden">
          <p className="text-sm font-medium">Rows per page</p>
          <Form
            id="search-form"
            role="search"
            onChange={(e) => {
              submit(e.currentTarget);
            }}
          >
            <select
              name="pageSize"
              id="pageSize"
              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
            >
              {[1, 2, 3, 4, 10].map((pageSize) => (
                <option key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </option>
              ))}
            </select>
          </Form>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Form
            id="search-form"
            role="search"
            onChange={(e) => {
              submit(e.currentTarget);
            }}
          >
            <Button
              id="pageIndex"
              name="pageIndex"
              variant="outline"
              value={0}
              className="hidden h-8 w-8 p-0 lg:flex"
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <DoubleArrowLeftIcon className="h-4 w-4" />
            </Button>
          </Form>
          <Form
            id="search-form"
            role="search"
            onChange={(e) => {
              submit(e.currentTarget);
            }}
          >
            <Button
              id="pageIndex"
              name="pageIndex"
              value={table.getState().pagination.pageIndex - 1}
              variant="outline"
              className="h-8 w-8 p-0"
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
          </Form>
          <Form
            id="search-form"
            role="search"
            onChange={(e) => {
              submit(e.currentTarget);
            }}
          >
            <Button
              id="pageIndex"
              name="pageIndex"
              value={table.getState().pagination.pageIndex + 1}
              variant="outline"
              className="h-8 w-8 p-0"
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </Form>

          <Form
            id="search-form"
            role="search"
            onChange={(e) => {
              submit(e.currentTarget);
            }}
          >
            <Button
              id="pageIndex"
              name="pageIndex"
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              value={table.getPageCount() - 1}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <DoubleArrowRightIcon className="h-4 w-4" />
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
