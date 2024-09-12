import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getContacts } from "~/data";
import { DataTable } from "~/components/datatable/data-table";
import { columns } from "~/components/datatable/columns";
import Table from "~/table";
import MainLayout from "~/components/main-layout";
import { DataTableToolbar } from "~/components/datatable/toolbar";
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return json({ contacts, q });
};

export const meta: MetaFunction = () => {
  return [
    { title: "Appstream Studio" },
    {
      name: "description",
      content: "Appstream Studio Remix boilerplate",
    },
  ];
};

export default function Index() {
  const { contacts: team } = useLoaderData<typeof loader>();
  const table = Table({ data: team });
  return (
    <MainLayout title="Team" description="Meet our team">
      <DataTableToolbar table={table} />
      <DataTable table={table} columns={columns} />
    </MainLayout>
  );
}
