export async function getWallets() {
  console.log("getWallets");

  const resp = await fetch(`${process.env.NEXT_PUBLIC_BOT_API_URL}/wallets`, {
    credentials: "include",
    method: "GET",
    headers: {},
  });

  if (!resp.ok) {
    throw new Error("Network response was not OK");
  }

  return resp;
}
