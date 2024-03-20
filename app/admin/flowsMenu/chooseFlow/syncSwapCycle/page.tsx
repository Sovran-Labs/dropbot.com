"use client";

import { FlowMenu } from "@/config/FlowMenu";
import { ConfigureSyncSwapCycleInputs } from "@/ts/types/ConfigureSyncSwapCycleInputs";
import { errorReporter } from "@/utils/errorReporter";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

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
      tokenA: "",
      tokenB: "",
      tokenAAmount: "100",
      targetVolumeAmount: "1000",
      targetVolumeUnit: "USD",
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

  const onSubmit: SubmitHandler<ConfigureSyncSwapCycleInputs> = async (
    data
  ) => {
    try {
      setSubmission({ ...submission, l: true });
      setSubmission({ ...submission, l: false });
      // await chooseFlow(data);
      // router.push("/admin/flows");
    } catch (e) {
      errorReporter("Error creating flow", true);
      setSubmission({ ...submission, e: e });
    }
  };

  const flowTemplate = FlowMenu.find(
    (f) => f.id === props?.searchParams?.templateId
  );

  return (
    <>
      <div className="my-4 text-white text-3xl">Configure SyncSwap Cycle</div>
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
              Swap information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              Configure the swap
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="tokenA"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Token A
                </label>
                <div className="mt-2">
                  <select
                    {...register("tokenA")}
                    id="tokenA"
                    name="tokenA"
                    autoComplete="tokenA"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
                  >
                    <option value={""}>ETH</option>
                  </select>
                </div>
              </div>
              <div className="sm:col-span-3">
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
                    type="number"
                    autoComplete="tokenAAmount"
                    placeholder="Token A Amount"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="tokenB"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Token B
                </label>
                <div className="mt-2">
                  <select
                    {...register("tokenB")}
                    id="tokenB"
                    name="tokenB"
                    autoComplete="tokenB"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
                  >
                    <option value={""}>ETH</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-white/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-white">
              Target Volume
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              Configure the target volume
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="targetVolume"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Target Volume
                </label>
                <div className="mt-2">
                  <input
                    {...register("targetVolumeAmount", {
                      required: true,
                    })}
                    id="targetVolume"
                    name="targetVolume"
                    type="number"
                    step={0.01}
                    autoComplete="targetVolume"
                    placeholder="Target Volume"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="targetVolumeUnit"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Target Volume Unit
                </label>
                <div className="mt-2">
                  <select
                    {...register("targetVolumeUnit")}
                    id="targetVolumeUnit"
                    name="targetVolumeUnit"
                    autoComplete="targetVolumeUnit"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
                  >
                    <option value={"USD"}>USD</option>
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
            Swap
          </button>
        </div>
      </form>
    </>
  );
}
