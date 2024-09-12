import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { NavLink, useLoaderData } from "@remix-run/react";
import { getContacts } from "~/data";
import { DataTable } from "~/components/datatable/data-table";
import { columns } from "~/components/datatable/columns";
import Table from "~/table";
import MainLayout from "~/components/main-layout";
import { DataTableToolbar } from "~/components/datatable/toolbar";
import { PaginationBar } from "~/components/datatable/pagination-bar";

import url from "~/lib/url";
import { Button } from "~/components/ui/button";
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") || null;
  const $top = Number(url.searchParams.get("$top")) || 10;
  const $skip = Number(url.searchParams.get("$skip")) || 0;
  const dbContacts = await getContacts(q);
  const contacts = dbContacts.slice($skip, $skip + $top);

  return json({ contacts, q, total: dbContacts.length });
};

export default function Index() {
  const { contacts: team, q, total } = useLoaderData<typeof loader>();
  const table = Table({ data: team });
  return (
    <MainLayout
      title="Team"
      description="Meet our team"
      rightChildren={
        <Button asChild>
          <NavLink prefetch="intent" to={url.createMember()}>
            Create
          </NavLink>
        </Button>
      }
    >
      <DataTableToolbar table={table} q={q} />
      <DataTable table={table} columns={columns} />
      <PaginationBar total={total} />
    </MainLayout>
  );
}
