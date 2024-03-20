import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import { deleteWalletAccount } from "@/services/walletAccounts/deleteWalletAccount";
import ConfirmDeleteDialog from "@/components/shared/ConfirmationDialog";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface P {
  accountHash: string;
  _id: string;
  rerender: React.Dispatch<React.SetStateAction<number>>;
}

export function WalletAccountsTableActionsDropdown(P: P) {
  const router = useRouter();

  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            Options
            <ChevronDownIcon
              className="-mr-1 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <span
                    onClick={() => {
                      window.open(
                        `https://debank.com/profile/${P.accountHash}`,
                        "_blank"
                      );
                    }}
                    className={classNames(
                      "cursor-pointer",
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    View on DeBank{" "}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/logos/companies/DeBank.svg"
                      className="inline-block h-4 w-4 ml-1.5"
                      width={16}
                      height={16}
                      alt="DeBank Logo"
                    />
                  </span>
                )}
              </Menu.Item>
            </div>
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <span
                    onClick={() => {
                      router.push(`/admin/walletAccounts/${P._id}`);
                    }}
                    className={classNames(
                      "cursor-pointer",
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    View
                  </span>
                )}
              </Menu.Item>
            </div>
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <span
                    onClick={async () => {
                      setShowDeleteDialog(true);
                    }}
                    className={classNames(
                      "cursor-pointer",
                      active ? "bg-gray-100 text-red-900" : "text-red-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Delete
                  </span>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      <ConfirmDeleteDialog
        open={showDeleteDialog}
        cancel={() => {
          setShowDeleteDialog(false);
        }}
        confirm={async () => {
          await deleteWalletAccount({
            account: P.accountHash,
          });

          P.rerender((prev) => prev + 1);
        }}
      />
    </>
  );
}
