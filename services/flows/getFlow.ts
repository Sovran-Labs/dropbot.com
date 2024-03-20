import { ChooseFlowInputs } from "@/ts/types/ChooseFlowInputs";

export async function getFlow(_id: string) {
  console.log("getFlow", _id);

  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_BOT_API_URL}/flow/${_id}`,
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
