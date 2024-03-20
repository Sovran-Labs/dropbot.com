"use client";

import Image from "next/image";
import { FlowMenu } from "@/config/FlowMenu";
import { getSupportedTokens } from "@/services/houdini/getSupportedTokens";
import { ConfigureGeneralHoudiniInputs } from "@/ts/types/ConfigureGeneralHoudiniInputs";
import { errorReporter } from "@/utils/errorReporter";
import { successToast } from "@/utils/toasts";
import {
  ArrowDownIcon,
  ArrowPathIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { getQuote } from "@/services/houdini/getQuote";
import { getWalletAccounts } from "@/services/walletAccounts/getWalletAccounts";
import { chooseFlow } from "@/services/flows/chooseFlow";

export default function GeneralizedHoudiniFlow(props: any) {
  const router = useRouter();

  const [supportedTokens, setSupportedTokens] = useState<{
    v: any;
    l: boolean;
    e: any;
  }>({
    v: [],
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

  const [quote, setQuote] = useState<{
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
        const resp = await getSupportedTokens();
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

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      templateId: props?.searchParams?.templateId,
      tokenA: "",
      tokenB: "",
      tokenAAmount: "",
      tokenBAmount: "",
      obfuscatedAddress: "",
      receiverAddress: "",
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

  const onSubmit: SubmitHandler<ConfigureGeneralHoudiniInputs> = async (
    data
  ) => {
    try {
      console.log("onSubmit", data);

      setSubmission({ ...submission, l: true });

      data.tokenA = supportedTokens.v.find(
        (t: any) => t.id === getValues()["tokenA"]
      );

      data.tokenB = supportedTokens.v.find(
        (t: any) => t.id === getValues()["tokenB"]
      );

      const resp = await chooseFlow(data);

      if (!resp.ok) {
        throw new Error("Network response was not OK");
      }

      router.push("/admin/flows");
    } catch (e) {
      errorReporter("Error creating flow", true);
      setSubmission({ ...submission, e: e });
    }
  };

  watch("tokenA");
  watch("tokenB");

  const flowTemplate = FlowMenu.find(
    (f) => f.id === props?.searchParams?.templateId
  );

  return (
    <>
      <div className="my-4 text-white text-3xl">
        Generalized HoudiniSwap{" "}
        {/* <small>({props?.searchParams?.flowId})</small> */}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-white/10 pb-8">
            <p className="mt-1 text-sm leading-6 text-white">
              {flowTemplate?.description}
            </p>
          </div>
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
          <div className="border-b border-white/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-white">
              Bridge information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              Token A ➡️ Token B
            </p>
            <div>
              {supportedTokens.l && <>Loading...</>}
              {!supportedTokens.l && (
                <button
                  onClick={async () => {
                    try {
                      setSupportedTokens({
                        v: [{ id: "", displayName: "Loading..." }],
                        l: true,
                        e: null,
                      });
                      const resp = await getSupportedTokens();
                      const data = await resp.json();
                      setSupportedTokens({
                        v: [
                          { id: "", displayName: "Select a token" },
                          ...data.tokens,
                        ],
                        l: false,
                        e: null,
                      });
                    } catch (e) {
                      errorReporter(e);
                    }
                  }}
                >
                  <span className="inline-block">
                    <small>Reload tokens</small>&nbsp;
                    <ArrowPathIcon className="h-4 w-4 inline-block" />
                  </span>
                </button>
              )}
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="tokenA"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Token A{" "}
                  {getValues()["tokenA"] && (
                    <span className="inline-block">
                      <Image
                        src={
                          supportedTokens.v.find(
                            (t: any) => t.id === getValues()["tokenA"]
                          )?.icon
                        }
                        height={24}
                        width={24}
                        alt="token icon"
                      />
                    </span>
                  )}
                </label>
                <div className="mt-2">
                  <select
                    {...register("tokenA")}
                    id="tokenA"
                    name="tokenA"
                    autoComplete="tokenA"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
                  >
                    {supportedTokens.v?.map((token: any, index: number) => {
                      return (
                        <option key={index} value={token.id}>
                          {token.displayName}
                        </option>
                      );
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
                  {getValues()["tokenB"] && (
                    <span className="inline-block">
                      <Image
                        src={
                          supportedTokens.v.find(
                            (t: any) => t.id === getValues()["tokenB"]
                          )?.icon
                        }
                        height={24}
                        width={24}
                        alt="token icon"
                      />
                    </span>
                  )}
                </label>
                <div className="mt-2">
                  <select
                    {...register("tokenB")}
                    id="tokenB"
                    name="tokenB"
                    autoComplete="tokenB"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
                  >
                    {supportedTokens.v?.map((token: any, index: number) => {
                      return (
                        <option key={index} value={token.id}>
                          {token.displayName}
                        </option>
                      );
                    })}
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
                  Input amount
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
              <div className="hidden sm:col-span-1 sm:flex justify-center items-center">
                <ArrowRightIcon className="h-6 w-6 text-white" />
              </div>
              <div className="sm:col-span-1 sm:hidden flex justify-center items-center">
                <ArrowDownIcon className="h-6 w-6 text-white" />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="tokenBAmount"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  {quote.l && <>Loading...</>}
                  {!quote.l && (
                    <button
                      onClick={async () => {
                        try {
                          setQuote({ ...quote, l: true });
                          const resp = await getQuote({
                            from: getValues()["tokenA"],
                            to: getValues()["tokenB"],
                            amount: getValues()["tokenAAmount"],
                          });

                          setQuote({ ...quote, l: false });

                          const data = await resp.json();
                          if (resp.ok) {
                            successToast(data.message || "Quote fetched");
                            setValue("tokenBAmount", data?.quote?.amountOut);
                          } else {
                            errorReporter(
                              data.message || "Error getting quote"
                            );
                          }
                        } catch (e) {
                          errorReporter(e);
                        }
                      }}
                    >
                      <span className="inline-block">
                        Get quote{" "}
                        <ArrowPathIcon className="h-4 w-4 inline-block" />
                      </span>
                    </button>
                  )}
                </label>
                <div className="mt-2">
                  <input
                    {...register("tokenBAmount", {
                      required: true,
                    })}
                    id="tokenBAmount"
                    name="tokenBAmount"
                    type="number"
                    readOnly
                    autoComplete="tokenBAmount"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-white/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-white">
              Obfuscated account ➡️ Receiver account
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              Account details
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="obfuscatedAddress"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Obfuscated address
                </label>
                <div className="mt-2">
                  <select
                    {...register("obfuscatedAddress", {
                      required: true,
                    })}
                    id="obfuscatedAddress"
                    name="obfuscatedAddress"
                    autoComplete="obfuscatedAddress"
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
                  {/* <input
                    {...register("obfuscatedAddress", {
                      required: true,
                    })}
                    id="obfuscatedAddress"
                    name="obfuscatedAddress"
                    type="text"
                    autoComplete="obfuscatedAddress"
                    placeholder="Sending address"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  /> */}
                </div>
              </div>
              <div className="hidden sm:col-span-1 sm:flex justify-center items-center">
                <ArrowRightIcon className="h-6 w-6 text-white" />
              </div>
              <div className="sm:col-span-1 sm:hidden flex justify-center items-center">
                <ArrowDownIcon className="h-6 w-6 text-white" />
              </div>
              {/* <div className="sm:col-span-2">
                <label
                  htmlFor="receiverAddress"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Receiver address
                </label>
                <div className="mt-2">
                  <input
                    {...register("receiverAddress", {
                      required: true,
                    })}
                    id="receiverAddress"
                    name="receiverAddress"
                    type="text"
                    autoComplete="receiverAddress"
                    placeholder="Receiving address"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div> */}

              <div className="sm:col-span-2">
                <label
                  htmlFor="receiverAddress"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Receiver address
                </label>
                <div className="mt-2">
                  <select
                    {...register("receiverAddress", {
                      required: true,
                    })}
                    id="receiverAddress"
                    name="receiverAddress"
                    autoComplete="receiverAddress"
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
          </div>
        </div>

        <div className="my-6 flex items-center justify-end gap-x-6">
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
            Generate flow
          </button>
        </div>
      </form>
    </>
  );
}
