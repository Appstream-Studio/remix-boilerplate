import { Checkbox } from "~/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ContactRecord } from "~/data";
import { DataTableColumnHeader } from "~/components/datatable/data-table-column-header";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import DateCell from "./date-cell";

export const columns: ColumnDef<ContactRecord>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "avatar",
  },
  {
    id: "name",
    accessorFn: (row) => `${row.first} ${row.last}`,
  },
  {
    id: "member",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Member"
        className="text-xs"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex max-w-[150px] items-center">
          <Avatar className="h-9 w-9 mr-4">
            <AvatarImage src={row.getValue("avatar")} alt="@shadcn" />
            <AvatarFallback>{row.getValue("name")}</AvatarFallback>
          </Avatar>
          {row.getValue("name")}
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" className="text-xs" />
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Since"
        className="text-xs"
      />
    ),
    cell: ({ row }) => <DateCell value={row.getValue("createdAt")} />,
  },
];
