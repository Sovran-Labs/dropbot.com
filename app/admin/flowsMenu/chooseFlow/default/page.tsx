"use client";

import { FlowMenu } from "@/config/FlowMenu";
import { chooseFlow } from "@/services/flows/chooseFlow";
import { ChooseFlowInputs } from "@/ts/types/ChooseFlowInputs";
import { errorReporter } from "@/utils/errorReporter";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

export default function CreateFlow(props: any) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      templateId: props?.searchParams?.templateId,
      walletAccount: "",
      errorNotifications: true,
      successNotifications: true,
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

  const onSubmit: SubmitHandler<ChooseFlowInputs> = async (data) => {
    try {
      setSubmission({ ...submission, l: true });
      await chooseFlow(data);
      router.push("/admin/flows");
    } catch (e) {
      errorReporter("Error creating flow", true);
      setSubmission({ ...submission, e: e });
    }
  };

  const flow = FlowMenu.find((f) => f.id === props?.searchParams?.flowId);

  return (
    <>
      <div className="my-4 text-white text-3xl">
        Choose Flow <small>({props?.searchParams?.flowId})</small>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-white/10 pb-12">
            <p className="mt-1 text-sm leading-6 text-white">
              {flow?.description}
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
              Account Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              The wallet account you want to use for this flow
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="walletAccount"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Wallet Account
                </label>
                <div className="mt-2">
                  <select
                    {...register("walletAccount")}
                    id="walletAccount"
                    name="walletAccount"
                    autoComplete="walletAccount"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
                  >
                    <option value={""}>(Test Account)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="border-b border-white/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-white">
              Notifications
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              We&apos;ll always let you know about status changes regarding your
              flow
            </p>

            <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-white">
                  By Email
                </legend>
                <div className="mt-6 space-y-6">
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        {...register("errorNotifications")}
                        id="errorNotifications"
                        name="errorNotifications"
                        type="checkbox"
                        className="h-4 w-4 rounded border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-gray-900"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="errorNotifications"
                        className="font-medium text-white"
                      >
                        Errors
                      </label>
                      <p className="text-gray-400">
                        Get notified if an error is caught when running the flow
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        {...register("successNotifications")}
                        id="successNotifications"
                        name="successNotifications"
                        type="checkbox"
                        className="h-4 w-4 rounded border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-gray-900"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="successNotifications"
                        className="font-medium text-white"
                      >
                        Successes
                      </label>
                      <p className="text-gray-400">
                        Get notified when the flows runs successfully
                      </p>
                    </div>
                  </div>
                </div>
              </fieldset>
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-white">
                  <i>Coming Soon</i>&nbsp; - Push Notifications
                </legend>
                <p className="mt-1 text-sm leading-6 text-gray-400">
                  These are delivered via SMS to your mobile phone.
                </p>
              </fieldset>
            </div>
          </div> */}
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
