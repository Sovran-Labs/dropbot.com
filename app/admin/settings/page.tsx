"use client";

import { UpdateSettingsInputs } from "@/ts/types/UpdateSettingsInputs";
import { errorReporter } from "@/utils/errorReporter";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

export default function Settings(props: any) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "tad@cmdlabs.io",
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

  const onSubmit: SubmitHandler<UpdateSettingsInputs> = async (data) => {
    try {
      setSubmission({ ...submission, l: true });
      // await updateSettings(data);
      toast.success("Settings updated");
      setSubmission({ ...submission, l: false });
    } catch (e) {
      errorReporter("Error creating flow", true);
      setSubmission({ ...submission, e: e });
    }
  };

  return (
    <>
      <div className="my-4 text-white text-3xl">Settings</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-white/10 pb-8">
            <p className="mt-1 text-sm leading-6 text-white">
              Update your account settings here
            </p>
          </div>

          <div className="border-b border-white/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-white">
              Contact Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              The email associated with your SOVRAN account (used for
              notifications)
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    {...register("email")}
                    id="email"
                    name="email"
                    autoComplete="email"
                    type="email"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
                  ></input>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-white/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-white">
              Notifications
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              We&apos;ll always let you know about status changes regarding your
              account
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
                        Flow Errors
                      </label>
                      <p className="text-gray-400">
                        Get notified if an error is caught when running your
                        flows
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
                        Flow Successes
                      </label>
                      <p className="text-gray-400">
                        Get notified when your flows run successfully
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
          </div>
        </div>

        <div className="my-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-white"
            onClick={() => router.back()}
          >
            Back
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Update Settings
          </button>
        </div>
      </form>
    </>
  );
}
