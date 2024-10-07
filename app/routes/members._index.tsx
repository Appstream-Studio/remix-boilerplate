import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { ActionFunctionArgs } from "@remix-run/node";
import { Form, redirect, useActionData, useNavigate } from "@remix-run/react";
import { z } from "zod";
import { Field, FieldError } from "~/components/forms/field";
import { InputConform } from "~/components/forms/input";
import { SelectConform } from "~/components/forms/select";
import MainLayout from "~/components/main-layout";
import { PageHeader, PageHeaderHeading } from "~/components/page-header";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { createNewContact } from "~/data";
import { REQUIRED_ERROR } from "~/lib/constants";
import url from "~/lib/url";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const submission = parseWithZod(formData, {
    schema: z.object({
      first: z
        .string({ required_error: REQUIRED_ERROR.firstName })
        .min(1)
        .max(100),
      last: z
        .string({ required_error: REQUIRED_ERROR.lastName })
        .min(1)
        .max(100),
      role: z
        .enum(["dev", "pm", "apprentice", "devops", "god"], {
          required_error: REQUIRED_ERROR.role,
        })
        .optional(),
    }),
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  await createNewContact(data);
  return redirect(url.home());
};
export default function MembersIndex() {
  const navigate = useNavigate();
  const lastResult = useActionData<typeof action>();
  const [form, fields] = useForm({
    id: "createMember",
    lastResult,
    shouldValidate: "onSubmit",
    shouldRevalidate: "onInput",
    defaultValue: {
      first: "",
      last: "",
      role: "dev",
    },
  });
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
      <Form method="post" id={form.id} onSubmit={form.onSubmit}>
        <div className="flex flex-col gap-6 items-center">
          <div className="max-w-2xl w-full">
            <PageHeader className="gap-4">
              <PageHeaderHeading>
                Here you can create a new member
              </PageHeaderHeading>

              <Field>
                <Label htmlFor={fields.first.id}>First name</Label>
                <InputConform
                  meta={fields.first}
                  type="text"
                  placeholder="First name..."
                />
                {fields.first.errors && (
                  <FieldError>{fields.first.errors}</FieldError>
                )}
              </Field>

              <Field>
                <Label htmlFor={fields.last.id}>Last name</Label>
                <InputConform
                  meta={fields.last}
                  type="text"
                  placeholder="Last name..."
                />
                {fields.last.errors && (
                  <FieldError>{fields.last.errors}</FieldError>
                )}
              </Field>
              {/* We need an avatar input that receives a URL :) */}
              <Field>
                <Label htmlFor={fields.role.id}>Role</Label>
                <SelectConform
                  placeholder="Select a Role"
                  meta={fields.role}
                  items={[
                    { value: "dev", name: "Developer" },
                    { value: "pm", name: "Project manager" },
                    { value: "apprentice", name: "Apprentice" },
                    { value: "devops", name: "DevOps" },
                    { value: "god", name: "GOD (does everything)" },
                  ]}
                />
                {fields.role.errors && (
                  <FieldError>{fields.role.errors}</FieldError>
                )}
              </Field>
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
