"use client";

import { FlowMenu } from "@/config/FlowMenu";
import { chooseFlow } from "@/services/flows/chooseFlow";
import { Configure7dInputs } from "@/ts/types/Configure7d";
import { errorReporter } from "@/utils/errorReporter";
import { ArrowDownIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
// import SYNCSWAP_TOKEN_DATA from "@/config/SyncswapSupportedTokensMainnet";
import { getWalletAccounts } from "@/services/walletAccounts/getWalletAccounts";
import { successToast } from "@/utils/toasts";
import { getSupportedTokensMainnet } from "@/services/syncSwap/getSupportedTokensMainnet";

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
      //   tokenAAddress: "0x000000000000000000000000000000000000800A",
      //   tokenBAddress: "0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4",
      tokenAAddress: "",
      tokenBAddress: "",
      tokenALowerBound: "1",
      tokenAUpperBound: "10",
      waitTimeLowerBound: 1,
      waitTimeUpperBound: 2,
      loopCount: 1,
      wAccount: "",
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

  const [supportedTokens, setSupportedTokens] = useState<{
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
        setSupportedTokens({
          v: [],
          l: true,
          e: null,
        });
        const resp = await getSupportedTokensMainnet();
        const data = await resp.json();

        setSupportedTokens({
          v: [{ symbol: "", address: "" }, ...data.tokens],
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
          v: [{ id: "", account: "" }, ...data.walletAccounts],
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

  const onSubmit: SubmitHandler<Configure7dInputs> = async (data) => {
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
                {...register("templateId", {
                  required: true,
                })}
                id="templateId"
                name="templateId"
                type="templateId"
                autoComplete="templateId"
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="my-4 text-white text-3xl">Configure 7d</div>
          <div className="border-b border-white/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-white">
              Swap information 🔃
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
                    {...register("tokenAAddress", {
                      required: true,
                    })}
                    id="tokenA"
                    name="tokenAAddress"
                    autoComplete="tokenA"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
                  >
                    {supportedTokens.l && (
                      <option value={""}>Loading...</option>
                    )}
                    {supportedTokens.v.map((token: any) => {
                      if (token.symbol === "") {
                        return (
                          <option key={token.symbol} value={token.address}>
                            Select a token
                          </option>
                        );
                      } else {
                        return (
                          <option key={token.symbol} value={token.address}>
                            {token.symbol} - {token.address}
                          </option>
                        );
                      }
                    })}
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
                    {...register("tokenBAddress", {
                      required: true,
                    })}
                    id="tokenB"
                    name="tokenBAddress"
                    autoComplete="tokenB"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
                  >
                    {supportedTokens.l && (
                      <option value={""}>Loading...</option>
                    )}
                    {supportedTokens.v.map((token: any) => {
                      if (token.symbol === "") {
                        return (
                          <option key={token.symbol} value={token.address}>
                            Select a token
                          </option>
                        );
                      } else {
                        return (
                          <option key={token.symbol} value={token.address}>
                            {token.symbol} - {token.address}
                          </option>
                        );
                      }
                    })}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="border-b border-white/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-white">
              Configure amount 💰
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              Set the lower and upper bounds for the random amount of token A to
              swap.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="tokenALowerBound"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Token A lower bound
                </label>
                <div className="mt-2">
                  <input
                    {...register("tokenALowerBound", {
                      required: true,
                    })}
                    id="tokenALowerBound"
                    name="tokenALowerBound"
                    type="text"
                    autoComplete="tokenALowerBound"
                    placeholder="Token A lower bound"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="tokenAUpperBound"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Token A upper bound
                </label>
                <div className="mt-2">
                  <input
                    {...register("tokenAUpperBound", {
                      required: true,
                    })}
                    id="tokenAUpperBound"
                    name="tokenAUpperBound"
                    type="text"
                    autoComplete="tokenAUpperBound"
                    placeholder="Token A upper bound"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-white/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-white">
              Configure repetitions 🔁
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              Loop the swap transaction multiple times with a random wait time
              between each swap if you like.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="waitTimeLowerBound"
                  className="block text-sm font-medium leading-6 text-white overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  Wait time lower bound (in seconds)
                </label>
                <div className="mt-2">
                  <input
                    {...register("waitTimeLowerBound", {
                      required: true,
                    })}
                    id="waitTimeLowerBound"
                    name="waitTimeLowerBound"
                    type="number"
                    autoComplete="waitTimeLowerBound"
                    placeholder="Wait time lower bound"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="waitTimeUpperBound"
                  className="block text-sm font-medium leading-6 text-white overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  Wait time upper bound (in seconds)
                </label>
                <div className="mt-2">
                  <input
                    {...register("waitTimeUpperBound", {
                      required: true,
                    })}
                    id="waitTimeUpperBound"
                    name="waitTimeUpperBound"
                    type="number"
                    autoComplete="waitTimeUpperBound"
                    placeholder="Wait time upper bound"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="loopCount"
                  className="block text-sm font-medium leading-6 text-white overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  Loop count
                </label>
                <div className="mt-2">
                  <input
                    {...register("loopCount", {
                      required: true,
                    })}
                    id="loopCount"
                    name="loopCount"
                    type="number"
                    autoComplete="loopCount"
                    placeholder="Loop count"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-white/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-white">
              Choose wallet
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              Choose the wallet that will perform the swap.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="obfuscatedAddress"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Wallet account
                </label>
                <div className="mt-2">
                  <select
                    {...register("wAccount", {
                      required: true,
                    })}
                    id="wAccount"
                    name="wAccount"
                    autoComplete="wAccount"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  >
                    {walletAccounts.v?.map((account: any, index: number) => {
                      if (account.account === "") {
                        return (
                          <option key={index} value={account.account}>
                            Select account
                          </option>
                        );
                      } else {
                        return (
                          <option key={index} value={account.account}>
                            {account.accountName && `(${account.accountName})`}
                            &nbsp;{account.account}
                          </option>
                        );
                      }
                    })}
                  </select>
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
