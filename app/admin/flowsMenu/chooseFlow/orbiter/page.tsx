"use client";

import Image from "next/image";
import { FlowMenu } from "@/config/FlowMenu";
import { ConfigureOrbiterInputs } from "@/ts/types/ConfigureOrbiterInputs";
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
import { getWalletAccounts } from "@/services/walletAccounts/getWalletAccounts";

import { chooseFlow } from "@/services/flows/chooseFlow";
import { getCrossChainRoutersMainnet } from "@/services/orbiter/getCrossChainRoutersMainnet";
import { getChainsMainnet } from "@/services/orbiter/getChainsMainnet";
import JsonView from "react18-json-view";

export default function GeneralizedOrbiterFlow(props: any) {
  const router = useRouter();

  const [crossChainRouters, setCrossChainRouters] = useState<{
    v: any;
    l: boolean;
    e: any;
  }>({
    v: [],
    l: false,
    e: null,
  });

  const [chains, setChains] = useState<{
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
        setCrossChainRouters({
          v: [{ id: "", line: "Loading..." }],
          l: true,
          e: null,
        });
        const resp = await getCrossChainRoutersMainnet();
        const data = await resp.json();

        console.log("data", data);
        setCrossChainRouters({
          v: [{ id: "", line: "Select a router" }, ...data?.routers?.result],
          l: false,
          e: null,
        });
        successToast("Supported cross-chain routers fetched");
      } catch (e) {
        errorReporter("Error fetching routers", true);
        setCrossChainRouters({ ...crossChainRouters, l: false, e: e });
      }
    }
    fetch();
  }, []);

  useEffect(() => {
    async function fetch() {
      try {
        setChains({
          v: [],
          l: true,
          e: null,
        });

        const resp = await getChainsMainnet();
        const data = await resp.json();

        console.log("chains data", data);

        setChains({
          v: [...data?.chains?.result],
          l: false,
          e: null,
        });
        successToast("Supported chains fetched");
      } catch (e) {
        errorReporter("Error fetching chains", true);
        setChains({ ...chains, l: false, e: e });
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
      router: "",
      amount: "",
      address: "",
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

  const onSubmit: SubmitHandler<ConfigureOrbiterInputs> = async (data) => {
    try {
      setSubmission({ ...submission, l: true });
      data.router = crossChainRouters.v.find(
        (r: any) => r.line === getValues()["router"]
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

  watch("router");

  const flowTemplate = FlowMenu.find(
    (f) => f.id === props?.searchParams?.templateId
  );

  if (crossChainRouters.v && chains.v) {
    // including src chain name for UI/UX
    for (let i = 0; i < crossChainRouters.v.length; i++) {
      const router = crossChainRouters.v[i];
      router.srcChainName = chains.v.find(
        (c: any) => c.chainId === router.srcChain
      )?.name;
    }

    // including tgt chain name for UI/UX
    for (let i = 0; i < crossChainRouters.v.length; i++) {
      const router = crossChainRouters.v[i];
      router.tgtChainName = chains.v.find(
        (c: any) => c.chainId === router.tgtChain
      )?.name;
    }
  }

  console.log("***", crossChainRouters.v);

  return (
    <>
      <div className="my-4 text-white text-3xl">Generalized Orbiter</div>
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
              Cross-chain Routers
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-400"></p>
            <div>
              {(crossChainRouters.l || chains.l) && <>Loading...</>}
              {!crossChainRouters.l && (
                <button
                  onClick={async () => {
                    try {
                      setCrossChainRouters({
                        v: [{ id: "", line: "Loading..." }],
                        l: true,
                        e: null,
                      });
                      const resp = await getCrossChainRoutersMainnet();
                      const data = await resp.json();
                      setCrossChainRouters({
                        v: [
                          { id: "", line: "Select a router" },
                          ...data?.routers?.result,
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
                    <small>Reload routers</small>&nbsp;
                    <ArrowPathIcon className="h-4 w-4 inline-block" />
                  </span>
                </button>
              )}
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="router"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Router{" "}
                </label>
                <div className="mt-2">
                  <select
                    {...register("router")}
                    id="router"
                    name="router"
                    autoComplete="router"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
                  >
                    {crossChainRouters.v?.map((router: any, index: number) => {
                      return (
                        <option key={index} value={router.line}>
                          {index ? `${index} -` : ""} {router.line}&nbsp;
                          {router.srcChainName && `${router.srcChainName}`}
                          {router.srcChainName && router.tgtChainName && "/"}
                          {router.tgtChainName && `${router.tgtChainName}`}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="sm:col-span-3">
                {crossChainRouters.v.find((r: any) => {
                  return r.line === getValues()["router"];
                }) && (
                  <label
                    htmlFor="routerDetails"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Router details
                    <JsonView
                      className="mt-2"
                      collapsed={true}
                      src={crossChainRouters.v.find(
                        (r: any) => r.line === getValues()["router"]
                      )}
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="tokenAAmount"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Input amount
                </label>
                <div className="mt-2">
                  <input
                    {...register("amount", {
                      required: true,
                    })}
                    id="amount"
                    name="amount"
                    type="text"
                    autoComplete="amount"
                    placeholder="Amount"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-white/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-white">
              Sender account
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              Account details
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Address
                </label>
                <div className="mt-2">
                  <select
                    {...register("address", {
                      required: true,
                    })}
                    id="address"
                    name="address"
                    autoComplete="address"
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
