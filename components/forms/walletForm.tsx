import { WalletInputs } from "@/ts/types/forms/WalletInputs";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface P {
  onSubmitCb: (data: any) => void;
  _id?: string;
  values?: WalletInputs;
}

export function WalletForm(P: P) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: P.values,
  });

  const onSubmit: SubmitHandler<WalletInputs> = async (data) => {
    P.onSubmitCb(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-12">
        <div className="border-b border-white/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-white">
            Wallet information
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-400">Wallet details</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-white"
              >
                Wallet name
              </label>
              <div className="mt-2">
                <input
                  {...register("walletName", {
                    required: true,
                  })}
                  id="walletName"
                  name="walletName"
                  type="text"
                  autoComplete="walletName"
                  placeholder="Wallet name"
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="account"
                className="block text-sm font-medium leading-6 text-white"
              >
                Mnemonic
              </label>
              <div className="mt-2">
                <input
                  {...register("mnemonic", {
                    required: true,
                  })}
                  id="mnemonic"
                  name="mnemonic"
                  type="text"
                  autoComplete="mnemonic"
                  placeholder="Mnemonic"
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-white"
          onClick={() => router.back()}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
