"use client";

import { WalletsTable } from "@/components/wallets/walletsTable";
import { useRouter } from "next/navigation";
import React from "react";

export default function Wallets() {
  const router = useRouter();

  return (
    <>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <div className="m-4 text-white text-3xl">Wallets</div>
        </div>
        <div className="m-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => {
              router.push("/admin/wallets/addWallet");
            }}
          >
            Add wallet
          </button>
        </div>
      </div>

      <WalletsTable />
    </>
  );
}
