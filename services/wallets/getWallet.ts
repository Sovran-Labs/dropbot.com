export async function getWallet(_id: string) {
  console.log("getWallet", _id);

  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_BOT_API_URL}/wallet/${_id}`,
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
