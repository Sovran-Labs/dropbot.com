interface DeleteWalletAccountInputs {
  account: string;
}

export async function deleteWalletAccount(inputs: DeleteWalletAccountInputs) {
  console.log("deleteWalletAccount", inputs);

  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_BOT_API_URL}/walletAccount`,
    {
      credentials: "include",
      method: "DELETE",
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
