export async function startFlow(fid: string) {
  console.log("starting flow...");
  console.log(
    "process.env.NEXT_PUBLIC_BOT_API_URL",
    process.env.NEXT_PUBLIC_BOT_API_URL
  );
  const serverUrl = process.env.NEXT_PUBLIC_BOT_API_URL;

  fetch(`${serverUrl}/startFlow`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ flowId: fid }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Response:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
