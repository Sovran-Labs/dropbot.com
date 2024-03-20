export async function getFlows() {
  console.log("getFlows");

  console.log(
    "process.env.NEXT_PUBLIC_BOT_API_URL",
    process.env.NEXT_PUBLIC_BOT_API_URL
  );

  const resp = await fetch(`${process.env.NEXT_PUBLIC_BOT_API_URL}/flows`, {
    credentials: "include",
    method: "GET",
    headers: {},
  });

  if (!resp.ok) {
    throw new Error("Network response was not OK");
  }

  return resp;
}
