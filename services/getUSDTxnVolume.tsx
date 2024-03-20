export async function getUSDTransactionVolume(flowId: string) {
  console.log("getting USD transaction volume...");

  const serverUrl = process.env.NEXT_PUBLIC_BOT_API_URL;

  return await fetch(`${serverUrl}/getUSDTransactionVolume/${flowId}`, {
    credentials: "include",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
