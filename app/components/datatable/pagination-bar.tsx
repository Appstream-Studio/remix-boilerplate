import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Link, useSearchParams } from "@remix-run/react";
import { ArrowLeftIcon, ArrowRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

function setSearchParamsString(
  searchParams: URLSearchParams,
  changes: Record<string, string | number | undefined>,
) {
  const newSearchParams = new URLSearchParams(searchParams);

  for (const [key, value] of Object.entries(changes)) {
    if (value === undefined) {
      newSearchParams.delete(key);
      continue;
    }

    newSearchParams.set(key, String(value));
  }

  return Array.from(newSearchParams.entries())
    .map(([key, value]) =>
      value ? `${key}=${encodeURIComponent(value)}` : key,
    )
    .join("&");
}

export function PaginationBar({ total }: { total: number }) {
  const [searchParams] = useSearchParams();
  const $skip = Number(searchParams.get("$skip")) || 0;
  const $top = Number(searchParams.get("$top")) || 10;

  const totalPages = Math.ceil(total / $top);
  const currentPage = Math.floor($skip / $top) + 1;
  const maxPages = 5;
  const halfMaxPages = Math.floor(maxPages / 2);

  const canPageBackwards = $skip > 0;
  const canPageForwards = $skip + $top < total;

  const pageNumbers = [] as Array<number>;
  if (totalPages <= maxPages) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    let startPage = currentPage - halfMaxPages;
    let endPage = currentPage + halfMaxPages;

    if (startPage < 1) {
      endPage += Math.abs(startPage) + 1;
      startPage = 1;
    }

    if (endPage > totalPages) {
      startPage -= endPage - totalPages;
      endPage = totalPages;
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
  }

  return (
    <div className="flex items-center justify-between px-2 mt-4">
      <div className="flex-1 text-sm text-muted-foreground"></div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="md:flex items-center space-x-2 hidden">
          <p className="text-sm font-medium">Rows per page</p>
          <select
            defaultValue={$top}
            onChange={(e) => {
              const newTop = Number(e.target.value);
              const newSearchParams = setSearchParamsString(searchParams, {
                $top: newTop,
                $skip: 0,
              });
              window.location.search = newSearchParams;
            }}
            className="flex items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 h-10 w-[70px]"
          >
            {[1, 2, 3, 4, 10].map((pageSize) => (
              <option key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {currentPage} of {totalPages}
        </div>
        <div className="flex items-center gap-1">
          <Button
            size="xs"
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            asChild
            disabled={!canPageBackwards}
          >
            <Link
              to={{
                search: setSearchParamsString(searchParams, {
                  $skip: 0,
                }),
              }}
              preventScrollReset
              prefetch="intent"
            >
              <span className="sr-only">First page</span>
              <DoubleArrowLeftIcon className="h-4 w-4" />
            </Link>
          </Button>

          <Button
            size="xs"
            variant="outline"
            className={cn(
              "hidden h-8 w-8 p-0 lg:flex",
              !canPageBackwards && "opacity-50 cursor-not-allowed",
            )}
            asChild
            disabled={!canPageBackwards}
          >
            {canPageBackwards ? (
              <Link
                to={{
                  search: setSearchParamsString(searchParams, {
                    $skip: Math.max($skip - $top, 0),
                  }),
                }}
                preventScrollReset
                prefetch="intent"
              >
                <span className="sr-only">Previous page</span>
                <ArrowLeftIcon className="h-4 w-4" />
              </Link>
            ) : (
              <div>
                <span className="sr-only">Previous page</span>
                <ArrowLeftIcon className="h-4 w-4" />
              </div>
            )}
          </Button>

          {pageNumbers.map((pageNumber) => {
            const pageSkip = (pageNumber - 1) * $top;
            const isCurrentPage = pageNumber === currentPage;

            if (isCurrentPage) {
              return (
                <Button
                  size="xs"
                  variant="outline"
                  key={`${pageNumber}-active`}
                  className="grid min-w-[2rem] place-items-center bg-neutral-200 text-sm text-black"
                >
                  <div>
                    <span className="sr-only">Page {pageNumber}</span>
                    <span>{pageNumber}</span>
                  </div>
                </Button>
              );
            } else {
              return (
                <Button
                  size="xs"
                  variant="outline"
                  className="hidden h-8 w-8 p-0 lg:flex"
                  asChild
                  key={pageNumber}
                >
                  <Link
                    to={{
                      search: setSearchParamsString(searchParams, {
                        $skip: pageSkip,
                      }),
                    }}
                    preventScrollReset
                    prefetch="intent"
                    className="min-w-[2rem] font-normal text-neutral-600"
                  >
                    {pageNumber}
                  </Link>
                </Button>
              );
            }
          })}

          <Button
            size="xs"
            variant="outline"
            className={cn(
              "hidden h-8 w-8 p-0 lg:flex",
              !canPageForwards && "opacity-50 cursor-not-allowed",
            )}
            asChild
            disabled={!canPageForwards}
          >
            {canPageForwards ? (
              <Link
                to={{
                  search: setSearchParamsString(searchParams, {
                    $skip: $skip + $top,
                  }),
                }}
                preventScrollReset
                prefetch="intent"
              >
                <span className="sr-only">Next page</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <div>
                <span className="sr-only">Next page</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            )}
          </Button>

          <Button
            size="xs"
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            asChild
            disabled={!canPageForwards}
          >
            <Link
              to={{
                search: setSearchParamsString(searchParams, {
                  $skip: (totalPages - 1) * $top,
                }),
              }}
              preventScrollReset
              prefetch="intent"
            >
              <span className="sr-only">Last page</span>
              <DoubleArrowRightIcon className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
