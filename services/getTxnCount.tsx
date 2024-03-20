export async function getTxnCount(flowId: string) {
  console.log("getting txn count...");

  const serverUrl = process.env.NEXT_PUBLIC_BOT_API_URL;

  return await fetch(`${serverUrl}/getTxnCount/${flowId}`, {
    credentials: "include",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
