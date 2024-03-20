export async function getWalletAccount(_id: string) {
	console.log('getWalletAccount', _id);

	const resp = await fetch(
		`${process.env.NEXT_PUBLIC_BOT_API_URL}/walletAccount/${_id}`,
		{
			credentials: 'include',
			method: 'GET',
			headers: {}
		}
	);

	if (!resp.ok) {
		throw new Error('Network response was not OK');
	}

	return resp;
}
