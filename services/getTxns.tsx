export async function getTxns(flowId: string) {
  console.log("getting txns...");

  const serverUrl = process.env.NEXT_PUBLIC_BOT_API_URL;

  return await fetch(`${serverUrl}/getTxns/${flowId}`, {
    credentials: "include",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
