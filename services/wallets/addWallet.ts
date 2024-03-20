import { WalletInputs } from "@/ts/types/forms/WalletInputs";

export async function addWallet(inputs: WalletInputs) {
  console.log("addWallet", inputs);

  const resp = await fetch(`${process.env.NEXT_PUBLIC_BOT_API_URL}/wallet`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inputs),
  });

  if (!resp.ok) {
    throw new Error("Network response was not OK");
  }

  return resp;
}
