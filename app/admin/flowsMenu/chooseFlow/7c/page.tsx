"use client";

import { FlowMenu } from "@/config/FlowMenu";
import { chooseFlow } from "@/services/flows/chooseFlow";
import { errorReporter } from "@/utils/errorReporter";
import { ArrowDownIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Configure7cInputs } from "@/ts/types/Configure7c";
import { getSupportedTokensTestnet } from "@/services/syncSwap/getSupportedTokensTestnet";
import { successToast } from "@/utils/toasts";

export default function ConfigureSyncSwap(props: any) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      templateId: props?.searchParams?.templateId,
      tokenAAddress: "0x0000000000000000000000000000000000000000",
      tokenBAddress: "0x0faF6df7054946141266420b43783387A78d82A9",
      tokenAAmount: "0.0001",
      wAccount: "",
      usdTxnTargetValue: "1000",
    },
  });

  const [supportedTokens, setSupportedTokens] = useState<{
    v: any;
    l: boolean;
    e: any;
  }>({
    v: [],
    l: false,
    e: null,
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

  useEffect(() => {
    async function fetch() {
      try {
        setSupportedTokens({
          v: [{ id: "", displayName: "Loading..." }],
          l: true,
          e: null,
        });
        const resp = await getSupportedTokensTestnet();
        const data = await resp.json();
        setSupportedTokens({
          v: [{ id: "", displayName: "Select a token" }, ...data.tokens],
          l: false,
          e: null,
        });
        successToast("Supported tokens fetched");
      } catch (e) {
        errorReporter("Error fetching supported tokens", true);
        setSupportedTokens({ ...supportedTokens, l: false, e: e });
      }
    }

    fetch();
  }, []);

  const onSubmit: SubmitHandler<Configure7cInputs> = async (data) => {
    try {
      setSubmission({ ...submission, l: true });
      await chooseFlow(data);
      router.push("/admin/flows");
    } catch (e) {
      errorReporter("Error creating flow", true);
      setSubmission({ ...submission, e: e, l: false });
    }
  };

  const flow = FlowMenu.find((f) => f.id === props?.searchParams?.flowId);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="hidden">
            <label
              htmlFor="templateId"
              className="block text-sm font-medium leading-6 text-white"
            >
              Flow Menu Id
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
          <div className="my-4 text-white text-3xl">Configure 7c</div>
          <div className="border-b border-white/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-white">
              Swap information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              {flow?.description}
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="tokenA"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Token A
                </label>
                <div className="mt-2">
                  <select
                    {...register("tokenAAddress")}
                    id="tokenA"
                    name="tokenAAddress"
                    autoComplete="tokenA"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
                  >
                    {supportedTokens.v.map((token: any, index: number) => (
                      <option key={token.symbol} value={token.address}>
                        {token.symbol} - {token.address}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="hidden sm:col-span-1 sm:flex justify-center items-center">
                <ArrowRightIcon className="h-6 w-6 text-white" />
              </div>
              <div className="sm:col-span-1 sm:hidden flex justify-center items-center">
                <ArrowDownIcon className="h-6 w-6 text-white" />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="tokenB"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Token B
                </label>
                <div className="mt-2">
                  <select
                    {...register("tokenBAddress")}
                    id="tokenB"
                    name="tokenBAddress"
                    autoComplete="tokenB"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
                  >
                    {supportedTokens.v.map((token: any, index: number) => (
                      <option key={token.symbol} value={token.address}>
                        {token.symbol} - {token.address}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="tokenAAmount"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Token A amount
                </label>
                <div className="mt-2">
                  <input
                    {...register("tokenAAmount", {
                      required: true,
                    })}
                    id="tokenAAmount"
                    name="tokenAAmount"
                    type="text"
                    autoComplete="tokenAAmount"
                    placeholder="Token A Amount"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="usdTxnTargetValue"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  USD Txn Target Value
                </label>
                <div className="mt-2">
                  <input
                    {...register("usdTxnTargetValue", {
                      required: true,
                    })}
                    id="usdTxnTargetValue"
                    name="usdTxnTargetValue"
                    type="text"
                    autoComplete="usdTxnTargetValue"
                    placeholder="USD Txn Target Value"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="wAccount"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Wallet Account
                </label>
                <div className="mt-2">
                  <input
                    {...register("wAccount", {
                      required: true,
                    })}
                    id="wAccount"
                    name="wAccount"
                    type="text"
                    autoComplete="wAccount"
                    placeholder="Wallet Account"
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
            Choose Flow
          </button>
        </div>
      </form>
    </>
  );
}
