const WEB3FORMS_ACCESS_KEY = "19bb96fc-e2d4-426b-9262-695231798241";
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export async function submitToWeb3Forms(fields) {
	const response = await fetch(WEB3FORMS_ENDPOINT, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify({
			access_key: WEB3FORMS_ACCESS_KEY,
			...fields,
		}),
	});

	const result = await response.json();

	if (!response.ok || !result.success) {
		throw new Error(result.message || "Failed to send form. Please try again.");
	}

	return result;
}
