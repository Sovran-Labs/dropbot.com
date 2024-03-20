"use client";

import { FlowMenu } from "@/config/FlowMenu";
import { chooseFlow } from "@/services/flows/chooseFlow";
import { getWalletAccounts } from "@/services/walletAccounts/getWalletAccounts";
import { ConfigureFlow1Inputs } from "@/ts/types/ConfigureFlow1";
import { errorReporter } from "@/utils/errorReporter";
import { successToast } from "@/utils/toasts";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

export default function ConfigureFlow1(props: any) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      templateId: props?.searchParams?.templateId,
      account: "",
    },
  });

  const [submission, setSubmission] = useState<{
    v: any;
    l: boolean;
    e: any;
  }>({
    v: null,
    l: false,
    e: null,
  });

  const [walletAccounts, setWalletAccounts] = useState<{
    v: any;
    l: boolean;
    e: any;
  }>({
    v: [],
    l: false,
    e: null,
  });

  useEffect(() => {
    async function fetch() {
      try {
        setWalletAccounts({
          v: [{ id: "", displayName: "Loading..." }],
          l: true,
          e: null,
        });
        const resp = await getWalletAccounts();
        const data = await resp.json();
        setWalletAccounts({
          v: [
            { id: "", account: "Select a wallet account" },
            ...data.walletAccounts,
          ],
          l: false,
          e: null,
        });
        successToast("Wallet accounts fetched");
      } catch (e) {
        errorReporter("Error fetching wallet accounts", true);
        setWalletAccounts({ ...walletAccounts, l: false, e: e });
      }
    }

    fetch();
  }, []);

  const onSubmit: SubmitHandler<ConfigureFlow1Inputs> = async (data) => {
    try {
      setSubmission({ ...submission, l: true });
      await chooseFlow(data);
      router.push("/admin/flows");
    } catch (e) {
      errorReporter("Error creating flow", true);
      setSubmission({ ...submission, e: e, l: false });
    }
  };

  const flow = FlowMenu.find((f) => f.id === props?.searchParams?.templateId);

  return (
    <>
      <div className="my-4 text-white text-3xl">Configure Flow 1</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-white/10 pb-8">
            <p className="mt-1 text-sm leading-6 text-white">
              {flow?.detailedDescription}
            </p>
          </div>

          <div className="hidden">
            <label
              htmlFor="templateId"
              className="block text-sm font-medium leading-6 text-white"
            >
              Template Id
            </label>
            <div className="mt-2">
              <input
                {...register("templateId")}
                id="templateId"
                name="templateId"
                type="templateId"
                autoComplete="templateId"
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="account"
              className="block text-sm font-medium leading-6 text-white"
            >
              Wallet account
            </label>
            <div className="mt-2">
              <select
                {...register("account", {
                  required: true,
                })}
                id="account"
                name="account"
                autoComplete="account"
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              >
                {walletAccounts.v?.map((account: any, index: number) => {
                  return (
                    <option key={index} value={account.account}>
                      {account.accountName && `(${account.accountName})`}
                      &nbsp;
                      {account.account}
                    </option>
                  );
                })}
              </select>
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
            Choose Flow
          </button>
        </div>
      </form>
    </>
  );
}
