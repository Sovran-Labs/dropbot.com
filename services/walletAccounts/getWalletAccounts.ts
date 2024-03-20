export async function getWalletAccounts() {
  console.log("getWalletAccounts");

  console.log(
    "process.env.NEXT_PUBLIC_BOT_API_URL",
    process.env.NEXT_PUBLIC_BOT_API_URL
  );

  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_BOT_API_URL}/walletAccounts`,
    {
      credentials: "include",
      method: "GET",
      headers: {},
    }
  );

  if (!resp.ok) {
    throw new Error("Network response was not OK");
  }

  return resp;
}
