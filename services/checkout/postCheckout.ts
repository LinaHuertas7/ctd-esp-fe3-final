import { PersonalData } from "types/form";

export const postCheckout = async (data: PersonalData): Promise<any> => {
	const dataCkeckout = JSON.stringify(data);
	const response = await fetch("/api/checkout", {
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		method: "POST",
		body: dataCkeckout,
	});

	return await response.json();
};
