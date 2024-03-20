import { WalletAccountInputs } from "@/ts/types/forms/WalletAccountInputs";

export async function addWalletAccount(inputs: WalletAccountInputs) {
  console.log("addWalletAccount", inputs);

  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_BOT_API_URL}/walletAccount`,
    {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    }
  );

  if (!resp.ok) {
    throw new Error("Network response was not OK");
  }

  return resp;
}
