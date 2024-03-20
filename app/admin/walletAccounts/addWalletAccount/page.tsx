"use client";

import { WalletAccountForm } from "@/components/forms/walletAccountForm";
import { addWalletAccount } from "@/services/walletAccounts/addWalletAccount";
import { WalletAccountInputs } from "@/ts/types/forms/WalletAccountInputs";
import { errorReporter } from "@/utils/errorReporter";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddWalletAccount(props: any) {
  const router = useRouter();

  const [submission, setSubmission] = useState<{
    v: any;
    l: boolean;
    e: any;
  }>({
    v: null,
    l: false,
    e: null,
  });

  async function onSubmitCb(data: WalletAccountInputs) {
    try {
      setSubmission({ ...submission, l: true });
      await addWalletAccount(data);
      router.push("/admin/walletAccounts");
    } catch (e) {
      errorReporter("Error adding wallet account", true);
      setSubmission({ ...submission, e: e });
    }
  }

  return (
    <>
      <div className="border-b border-white/10 pb-8 mb-10 text-white text-3xl">
        Add wallet account
      </div>
      <WalletAccountForm onSubmitCb={onSubmitCb} />
    </>
  );
}
