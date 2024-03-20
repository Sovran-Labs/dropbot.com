export async function deleteFlow(_id: string) {
  console.log("deleteFlow", _id);

  const resp = await fetch(`${process.env.NEXT_PUBLIC_BOT_API_URL}/flow`, {
    credentials: "include",
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _id,
    }),
  });

  if (!resp.ok) {
    throw new Error("Network response was not OK");
  }

  return resp;
}
