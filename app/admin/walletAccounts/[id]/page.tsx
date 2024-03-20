"use client";

import { WalletAccountForm } from "@/components/forms/walletAccountForm";
import { editWalletAccount } from "@/services/walletAccounts/editWalletAccount";
import { getWalletAccount } from "@/services/walletAccounts/getWalletAccount";
import { WalletAccountInputs } from "@/ts/types/forms/WalletAccountInputs";
import { errorReporter } from "@/utils/errorReporter";
import { successToast } from "@/utils/toasts";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ViewWalletAccount(props: any) {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const [submission, setSubmission] = useState<{
    v: any;
    l: boolean;
    e: any;
  }>({
    v: null,
    l: false,
    e: null,
  });

  const [walletAccount, setWalletAccount] = useState<{
    l: boolean;
    v: WalletAccountInputs | null;
    e: any | null;
  }>({
    l: true,
    v: null,
    e: null,
  });

  useEffect(() => {
    const fetch = async () => {
      try {
        const resp = await getWalletAccount(params.id);

        const body = await resp.json();

        setWalletAccount({
          l: false,
          v: body.walletAccount,
          e: null,
        });
      } catch (e) {
        setWalletAccount({
          l: false,
          v: null,
          e: e,
        });
      }
    };

    fetch();
  }, []);

  async function onSubmitCb(data: WalletAccountInputs) {
    try {
      setSubmission({ ...submission, l: true });
      await editWalletAccount(data);
      successToast("Wallet account updated");
    } catch (e) {
      errorReporter("Error editing wallet account", true);
      setSubmission({ ...submission, e: e });
    }
  }

  let tsx = null;

  if (walletAccount.l) {
    tsx = <div>Loading...</div>;
  } else if (walletAccount.v) {
    tsx = (
      <WalletAccountForm
        _id={params.id}
        values={walletAccount.v}
        onSubmitCb={onSubmitCb}
      />
    );
  } else if (walletAccount.e) {
    errorReporter("Error editing wallet account", true);
    tsx = <>Error occurred</>;
  } else {
    tsx = <div>An error occurred</div>;
  }

  return (
    <>
      <div className="border-b border-white/10 pb-8 mb-10 text-white text-3xl">
        Edit wallet account
      </div>
      {tsx}
    </>
  );
}
