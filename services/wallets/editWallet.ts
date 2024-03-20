import { WalletInputs } from "@/ts/types/forms/WalletInputs";

export async function editWallet(inputs: WalletInputs) {
  console.log("editWallet", inputs);

  const resp = await fetch(`${process.env.NEXT_PUBLIC_BOT_API_URL}/wallet`, {
    credentials: "include",
    method: "PATCH",
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
