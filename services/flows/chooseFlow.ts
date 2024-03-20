import { ConfigureFlow1Inputs } from "@/ts/types/ConfigureFlow1";
import { Configure7cInputs } from "@/ts/types/Configure7c";
import { ConfigureGeneralHoudiniInputs } from "@/ts/types/ConfigureGeneralHoudiniInputs";
import { Configure7dInputs } from "@/ts/types/Configure7d";
import { ConfigureOrbiterInputs } from "@/ts/types/ConfigureOrbiterInputs";

export async function chooseFlow(
  inputs:
    | ConfigureGeneralHoudiniInputs
    | Configure7cInputs
    | Configure7dInputs
    | ConfigureFlow1Inputs
    | ConfigureOrbiterInputs
    | any
) {
  console.log("chooseFlow");

  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_BOT_API_URL}/chooseFlow`,
    {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    }
  );

  if (!resp.ok) {
    throw new Error("Network response was not OK");
  }

  return resp;
}
