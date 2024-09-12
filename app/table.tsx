import {
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { ContactRecord, PaginatedContacts } from "~/data";
import { columns } from "~/components/datatable/columns";

export default function Table({ data }: { data: PaginatedContacts }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    avatar: false,
    name: false,
  });
  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable({
    data: data.contacts,
    columns,
    manualPagination: true,
    rowCount: data.rowCount,
    pageCount: data.pageCount,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      pagination: {
        pageSize: data.pageSize,
        pageIndex: data.pageIndex,
      },
    },
    enableRowSelection: true,
    getColumnCanGlobalFilter: () => true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onColumnVisibilityChange: setColumnVisibility,
  });
  return table;
}
