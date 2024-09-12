import type { MetaFunction } from "@remix-run/node";

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
  return (
    <div className="font-sans p-4">
      <h1 className="text-3xl">Welcome to our boilerplate</h1>
    </div>
  );
}
