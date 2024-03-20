export async function updateUsdTxnVolume(flowId: string) {
	console.log('updating USD transaction volume...');

	const serverUrl = process.env.NEXT_PUBLIC_BOT_API_URL;

	return await fetch(`${serverUrl}/updateUsdTxnVolume/${flowId}`, {
		credentials: 'include',
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
