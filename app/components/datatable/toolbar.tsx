"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { DataTableViewOptions } from "~/components/datatable/data-table-view-options";
import { Form, useNavigation, useSubmit } from "@remix-run/react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  q: string | null;
}

export function DataTableToolbar<TData>({
  table,
  q,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const submit = useSubmit();
  const navigation = useNavigation();
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex flex-1 items-center space-x-2">
        <Form
          id="search-form"
          role="search"
          onChange={(event) => {
            const isFirstSearch = q === null;
            submit(event.currentTarget, {
              replace: !isFirstSearch,
            });
          }}
        >
          <Input
            id="q"
            aria-label="Search contacts"
            defaultValue={q || ""}
            placeholder="Search ..."
            type="search"
            name="q"
          />
          <div id="search-spinner" aria-hidden hidden={!searching} />
        </Form>

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
