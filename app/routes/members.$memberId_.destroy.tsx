import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import invariant from "tiny-invariant";

import { deleteContact } from "~/data";
import url from "~/lib/url";

export const action = async ({ params }: ActionFunctionArgs) => {
  invariant(params.memberId, "Missing memberId param");
  await deleteContact(params.memberId);
  return redirect(url.home());
};
