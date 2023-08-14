import { useEffect, useState } from "react";
import { fetchSectors } from "../api/api";

const useSectors = () => {
	const [sectorsNames, setSectorsName] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(null);

	useEffect(() => {
		fetchSectors()
			.then((response) => {
				setSectorsName(response.data.data);
				setIsLoading(false);
			})
			.catch((error) => {
				setIsError(error);
				setIsLoading(false);
			});
	}, []);

	return {
		sectorsNames,
		isLoading,
		isError,
	};
};

export default useSectors;
