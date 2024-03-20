export async function clearFlowActionLog(fid: string) {
  fetch(`${process.env.NEXT_PUBLIC_BOT_API_URL}/clearFlowLogs/${fid}`, {
    method: "PATCH",
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
