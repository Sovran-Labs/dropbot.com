export async function getSupportedTokens() {
  console.log("getSupportedTokens");

  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_BOT_API_URL}/houdini/getSupportedTokens`,
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
