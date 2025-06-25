
import { useState, useEffect } from "react";

export default function useFetchData(url) {
	const [data, setData] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function fetchData() {
			setIsPending(true);
			try {
				const respons = await fetch(url);
				if (!respons.ok) {
					setData(null);
					console.log(respons);
					throw new Error(`Error: ${respons.statusText}`);
				}
				const json = await respons.json();
				setData(json);
				setIsPending(false);
				setError(null);
			} catch (error) {
				setIsPending(false);
				setError(err.message);

			}
		}
		fetchData();
	}, [url]);
	return { data, isPending, error };
}
