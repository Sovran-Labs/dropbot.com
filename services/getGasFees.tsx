export async function getGasFees(flowId: string) {
  console.log("getting gas fees...");

  const serverUrl = process.env.NEXT_PUBLIC_BOT_API_URL;

  return await fetch(`${serverUrl}/getGasFees/${flowId}`, {
    credentials: "include",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
