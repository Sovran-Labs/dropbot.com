"use client";

import { WalletForm } from "@/components/forms/walletForm";
import { addWallet } from "@/services/wallets/addWallet";
import { WalletInputs } from "@/ts/types/forms/WalletInputs";
import { errorReporter } from "@/utils/errorReporter";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddWallet(props: any) {
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

  async function onSubmitCb(data: WalletInputs) {
    try {
      setSubmission({ ...submission, l: true });
      await addWallet(data);
      router.push("/admin/wallets");
    } catch (e) {
      errorReporter("Error adding wallet account", true);
      setSubmission({ ...submission, e: e });
    }
  }

  return (
    <>
      <div className="border-b border-white/10 pb-8 mb-10 text-white text-3xl">
        Add wallet
      </div>
      <WalletForm onSubmitCb={onSubmitCb} />
    </>
  );
}
