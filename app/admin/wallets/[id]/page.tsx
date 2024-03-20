"use client";

import { WalletForm } from "@/components/forms/walletForm";
import { editWallet } from "@/services/wallets/editWallet";
import { getWallet } from "@/services/wallets/getWallet";
import { WalletInputs } from "@/ts/types/forms/WalletInputs";
import { errorReporter } from "@/utils/errorReporter";
import { successToast } from "@/utils/toasts";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ViewWallet(props: any) {
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

  const [wallet, setWallet] = useState<{
    l: boolean;
    v: WalletInputs | null;
    e: any | null;
  }>({
    l: true,
    v: null,
    e: null,
  });

  useEffect(() => {
    const fetch = async () => {
      try {
        const resp = await getWallet(params.id);

        const body = await resp.json();

        setWallet({
          l: false,
          v: body.wallet,
          e: null,
        });
      } catch (e) {
        setWallet({
          l: false,
          v: null,
          e: e,
        });
      }
    };

    fetch();
  }, []);

  async function onSubmitCb(data: WalletInputs) {
    try {
      setSubmission({ ...submission, l: true });
      await editWallet(data);
      successToast("Wallet account updated");
    } catch (e) {
      errorReporter("Error editing wallet", true);
      setSubmission({ ...submission, e: e });
    }
  }

  let tsx = null;

  if (wallet.l) {
    tsx = <div>Loading...</div>;
  } else if (wallet.v) {
    tsx = (
      <WalletForm _id={params.id} values={wallet.v} onSubmitCb={onSubmitCb} />
    );
  } else if (wallet.e) {
    errorReporter("Error editing wallet", true);
    tsx = <>Error occurred</>;
  } else {
    tsx = <div>An error occurred</div>;
  }

  return (
    <>
      <div className="border-b border-white/10 pb-8 mb-10 text-white text-3xl">
        Edit wallet
      </div>
      {tsx}
    </>
  );
}
