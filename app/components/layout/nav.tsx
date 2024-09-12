import { NavLink, useLocation } from "@remix-run/react";
import { siteConfig } from "~/config/site";
import { pages } from "~/config/pages";
import { cn } from "~/lib/utils";
import url from "~/lib/url";
import { Icons } from "~/components/icons";

export default function Nav() {
  const { pathname } = useLocation();
  return (
    <div className="mr-4 flex">
      <NavLink to={url.home()} className="mr-6 flex items-center space-x-2">
        <Icons.logo className="h-6 w-6 fill-brand" />
        <span className="hidden font-bold sm:inline-block text-primary text-lg">
          {siteConfig.name}
        </span>
      </NavLink>
      <nav className="flex items-center gap-4 text-sm lg:gap-3  ">
        {pages.mainNav?.map(
          (item) =>
            item.href && (
              <NavLink
                key={item.href}
                to={item.href}
                className={cn(
                  "rounded-md py-2 px-3 text-sm hover:bg-brand hover:text-primary-foreground hover:dark:text-primary",
                  pathname.startsWith(item.href)
                    ? "bg-brand text-primary-foreground dark:text-primary hover:bg-brand/80"
                    : "",
                )}
              >
                {item.title}
              </NavLink>
            ),
        )}
      </nav>
    </div>
  );
}
