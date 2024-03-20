export async function getCrossChainRoutersTestnet() {
  console.log("getCrossChainRoutersTestnet");

  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_BOT_API_URL}/orbiter/getCrossChainRoutersTestnet`,
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
