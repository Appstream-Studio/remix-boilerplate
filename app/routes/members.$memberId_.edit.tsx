import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import { Form, redirect, useLoaderData, useNavigate } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getContact, updateContact } from "~/data";
import MainLayout from "~/components/main-layout";
import { PageHeader, PageHeaderHeading } from "~/components/page-header";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import url from "~/lib/url";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.memberId, "Missing memberId param");
  const contact = await getContact(params.memberId);
  if (!contact) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ contact });
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.memberId, "Missing memberId param");
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.memberId, updates);
  return redirect(url.home());
};

export default function EditMember() {
  const { contact } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  return (
    <MainLayout
      title={`Updating ${contact.first} ${contact.last}`}
      description="You can update member's profile here"
      rightChildren={
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Back
        </Button>
      }
    >
      <Form method="post" key={contact.id}>
        <div className="flex flex-col gap-6 items-center">
          <div className="max-w-2xl w-full">
            <PageHeader className="gap-4">
              <PageHeaderHeading>
                Here you can update {contact.first}
                {"'s"} information
              </PageHeaderHeading>
              <Input
                defaultValue={contact.first}
                type="text"
                id="first"
                name="first"
                placeholder="FirstName"
              />
              <Input
                defaultValue={contact.last}
                type="text"
                id="last"
                name="last"
                placeholder="LastName"
              />
              {/* We need an avatar input that receives a URL :) */}
              <Input
                defaultValue={contact.role}
                type="text"
                id="role"
                name="role"
                placeholder="Role"
              />
              <Button className="w-full" type="submit">
                Save
              </Button>
            </PageHeader>
          </div>
        </div>
      </Form>
    </MainLayout>
  );
}
