import React from "react";
import { PageHeaderDescription, PageHeaderHeading } from "./page-header";

interface MainLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function MainLayout({
  title,
  children,
  description,
}: MainLayoutProps) {
  return (
    <>
      <div className="flex justify-between mb-4 md:flex-row flex-col md:items-center">
        <div>
          <PageHeaderHeading>{title}</PageHeaderHeading>
          <PageHeaderDescription>{description}</PageHeaderDescription>
        </div>
      </div>
      <div className="mb-4">{children}</div>
    </>
  );
}
