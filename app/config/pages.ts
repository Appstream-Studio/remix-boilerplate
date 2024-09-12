import { MainNavItem } from "~/types/nav";

interface DocsConfig {
  mainNav: MainNavItem[];
}

export const pages: DocsConfig = {
  mainNav: [
    {
      title: "Dashboard",
      href: "/",
    },
  ],
};
