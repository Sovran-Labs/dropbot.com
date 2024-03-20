export async function getCrossChainRoutersMainnet() {
  console.log("getCrossChainRoutersMainnet");

  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_BOT_API_URL}/orbiter/getCrossChainRoutersMainnet`,
    {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!resp.ok) {
    throw new Error("Network response was not OK");
  }

  return resp;
}
