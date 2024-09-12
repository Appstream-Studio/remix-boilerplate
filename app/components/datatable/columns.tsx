import { Checkbox } from "~/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ContactRecord } from "~/data";
import { DataTableColumnHeader } from "~/components/datatable/data-table-column-header";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import DateCell from "~/components/datatable/date-cell";
import { Button } from "~/components/ui/button";
import { Form, NavLink } from "@remix-run/react";
import url from "~/lib/url";
import { TrashIcon } from "lucide-react";

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
    accessorKey: "id",
    enableHiding: false,
  },
  {
    accessorKey: "avatar",
    enableHiding: false,
  },
  {
    id: "name",
    accessorFn: (row) => `${row.first} ${row.last}`,
    enableHiding: false,
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
      const id = row.getValue<string>("id");
      return (
        <Button asChild variant="ghost">
          <NavLink to={url.editMember(id)}>
            <div className="flex max-w-[150px] items-center">
              <Avatar className="h-9 w-9 mr-4">
                <AvatarImage src={row.getValue("avatar")} alt="@shadcn" />
                <AvatarFallback>{row.getValue("name")}</AvatarFallback>
              </Avatar>
              <p className="max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap    ">
                {row.getValue("name")}
              </p>
            </div>
          </NavLink>
        </Button>
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
  {
    id: "destroy",
    cell: ({ row }) => {
      const memberId = row.getValue<string>("id");
      return (
        <Form
          action={`/members/${memberId}/destroy`}
          method="post"
          onSubmit={(event) => {
            const response = confirm(
              "Please confirm you want to delete this record.",
            );
            if (!response) {
              event.preventDefault();
            }
          }}
        >
          <Button size="icon" type="submit" variant="ghost">
            <TrashIcon aria-label="Delete" className="h-4 w-4" />
          </Button>
        </Form>
      );
    },
  },
];
