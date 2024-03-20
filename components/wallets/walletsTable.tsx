import { getWallets } from "@/services/wallets/getWallets";
import { Wallet } from "@/ts/types/Wallet";
import { errorToast } from "@/utils/toasts";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  flexRender,
} from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { DebouncedInput } from "../shared/DebouncedInput";
import { WindowLoader } from "../shared/WindowLoader";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";
import { WalletsTableActionsDropdown } from "@/components/dropdowns/WalletsTableActionsDropdown";

export const WalletsTable = () => {
  const router = useRouter();
  const columnHelper = createColumnHelper<Wallet>();
  const [renderCount, rerender] = useState<number>(0);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");

  const columns = [
    // columnHelper.accessor("_id", {
    //   header: () => "ID",
    //   cell: (info) => info.renderValue(),
    //   footer: (info) => info.column.id,
    // }),
    columnHelper.accessor("createdAt", {
      header: () => "Created",
      cell: (info) =>
        info.renderValue() && new Date(info.renderValue()!).toLocaleString(),
      footer: (info) => info.column.id,
    }),

    columnHelper.accessor("walletName", {
      cell: (info) => info.renderValue(),
      header: () => <span>Wallet name</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => null, {
      id: "actions",
      cell: (info) => (
        <>
          {/* Options */}
          <WalletsTableActionsDropdown
            _id={info.row.original._id}
            rerender={rerender}
          />
          {/* <WalletAccountsTableActionsDropdown
            _id={info.row.original._id}
            accountHash={info.row.original.account}
            rerender={rerender}
          /> */}
        </>
      ),
      header: () => <span>Actions</span>,
      footer: (info) => info.column.id,
    }),
  ];

  const [wallets, setWallets] = useState<{
    v: any;
    l: boolean;
    e: any;
  }>({
    v: [],
    l: true,
    e: null,
  });

  const table = useReactTable({
    data: wallets.v,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    async function req() {
      try {
        setWallets({ ...wallets, l: true, e: null });
        const resp = await getWallets();
        const data = await resp.json();
        setWallets({ v: data?.wallets ?? [], l: false, e: null });
      } catch (e) {
        errorToast("Error fetching wallets");
        setWallets({ ...wallets, l: false, e: e });
      }
    }

    req();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderCount]);

  return (
    <>
      <div className="my-2">
        <DebouncedInput
          value={globalFilter ?? ""}
          onChange={(value) => setGlobalFilter(String(value))}
          className="block w-1/2 sm:w-1/4 rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
          placeholder="Search all columns..."
        />
      </div>
      {wallets.l ? (
        <WindowLoader />
      ) : wallets.v.length === 0 ? (
        <>No records found</>
      ) : (
        <div className="mt-6 flow-root">
          <div className="-mx-4 my-0 overflow-x-auto sm:-mx-6 lg:-mx-8">
            {/* <div> */}
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 min-h-screen">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <th key={header.id} colSpan={header.colSpan}>
                            {header.isPlaceholder ? null : (
                              <div
                                {...{
                                  className: header.column.getCanSort()
                                    ? "cursor-pointer select-none text-left"
                                    : "",
                                  onClick:
                                    header.column.getToggleSortingHandler(),
                                }}
                              >
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                                {{
                                  asc: (
                                    <>
                                      <ChevronUpIcon className="h-4 w-4 inline-block"></ChevronUpIcon>
                                    </>
                                  ),
                                  desc: (
                                    <>
                                      <ChevronDownIcon className="h-4 w-4 inline-block"></ChevronDownIcon>
                                    </>
                                  ),
                                }[header.column.getIsSorted() as string] ??
                                  null}
                              </div>
                            )}
                          </th>
                        );
                      })}
                    </tr>
                  ))}
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="whitespace-nowrap px-3 py-4 text-sm text-white"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="h-2" />
              <div className="flex items-center gap-2">
                <button
                  className="border rounded p-1"
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  {"<<"}
                </button>
                <button
                  className="border rounded p-1"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  {"<"}
                </button>
                <button
                  className="border rounded p-1"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  {">"}
                </button>
                <button
                  className="border rounded p-1"
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                >
                  {">>"}
                </button>
                <span className="flex items-center gap-1">
                  <div>Page</div>
                  <strong>
                    {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}
                  </strong>
                </span>
                <span className="flex items-center gap-1">
                  | Go to page:
                  <input
                    type="number"
                    defaultValue={table.getState().pagination.pageIndex + 1}
                    onChange={(e) => {
                      const page = e.target.value
                        ? Number(e.target.value) - 1
                        : 0;
                      table.setPageIndex(page);
                    }}
                    className="block w-16 rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  />
                </span>
                <select
                  value={table.getState().pagination.pageSize}
                  onChange={(e) => {
                    table.setPageSize(Number(e.target.value));
                  }}
                  className="block rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
                >
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      Show {pageSize}
                    </option>
                  ))}
                </select>
              </div>
              <div>{table.getRowModel().rows.length} Rows</div>
              {/* <pre>{JSON.stringify(table.getState().pagination, null, 2)}</pre> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
