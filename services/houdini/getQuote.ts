import { HoudiniGetQuoteInputs } from "@/ts/types/HoudiniGetQuoteInputs";

export async function getQuote(inputs: HoudiniGetQuoteInputs) {
  console.log("getQuote");

  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_BOT_API_URL}/houdini/getQuote`,
    {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    }
  );

  return resp;
}
