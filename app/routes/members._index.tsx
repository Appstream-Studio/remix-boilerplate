import { Form, MetaFunction, redirect, useNavigate } from "@remix-run/react";
import MainLayout from "~/components/main-layout";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { PageHeader, PageHeaderHeading } from "../components/page-header";
import { createNewContact } from "~/data";
import { ActionFunctionArgs } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Appstream Studio" },
    {
      name: "description",
      content: "Appstream Studio Remix boilerplate",
    },
  ];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const contact = await createNewContact(data);
  return redirect(`/members/${contact.id}/edit`);
};
export default function MembersIndex() {
  const navigate = useNavigate();
  return (
    <MainLayout
      title="Members"
      description="You can manage your members here"
      rightChildren={
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Back
        </Button>
      }
    >
      <Form method="post">
        <div className="flex flex-col gap-6 items-center">
          <div className="max-w-2xl w-full">
            <PageHeader className="gap-4">
              <PageHeaderHeading>
                Here you can create a new member
              </PageHeaderHeading>
              <Input
                type="text"
                id="first"
                name="first"
                placeholder="FirstName"
              />
              <Input type="text" id="last" name="last" placeholder="LastName" />
              {/* We need an avatar input that receives a URL :) */}
              <Input type="text" id="role" name="role" placeholder="Role" />
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
