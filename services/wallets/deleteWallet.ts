interface DeleteWalletInputs {
  id: string;
}

export async function deleteWallet(inputs: DeleteWalletInputs) {
  console.log("deleteWallet", inputs);

  const resp = await fetch(`${process.env.NEXT_PUBLIC_BOT_API_URL}/wallet`, {
    credentials: "include",
    method: "DELETE",
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
