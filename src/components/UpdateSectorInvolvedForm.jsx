import { useEffect, useState } from "react";
import { getSectorInvolved, updateSectorInvolved } from "../api/api";
import renderOptions from "../utils/SelectOptions";
import { useNavigate, useParams } from "react-router-dom";
import useSectors from "../hooks/useSectors";
import Swal from "sweetalert2";
import { useSectorInvolvedData } from "../context/SectorsInvolvedProvider";
import { EDITSECTORINVOLVED } from "../actions/actionTypes";

function UpdateSectorInvolvedForm() {
	let { id: sectorId } = useParams();
	const sectorsInfo = useSectors();
	const { sectorsNames, isLoading: sectorsLoading } = sectorsInfo;
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(null);

	const [isPosting, setIsPosting] = useState(false);
	const [sectorUpdatedData, setSectorUpdatedData] = useState({});
	const { dispatch } = useSectorInvolvedData();

	const navigate = useNavigate();

	// get single sector involved
	useEffect(() => {
		getSectorInvolved(sectorId)
			.then((response) => {
				const { name, sectors, agree } = response.data.data;

				setSectorUpdatedData({
					sectors: sectors,
					name: name,
					agree: agree,
				});
				setIsLoading(false);
			})
			.catch((error) => {
				setIsError(error);
				setIsLoading(false);
			});
	}, [sectorId]);

	/**
	 * add updated sector to state
	 * @param {*} sectorInvolved
	 */
	const handeAddSectorInvolvedUpdateToState = (sectorInvolved) => {
		dispatch({
			type: EDITSECTORINVOLVED,
			payload: sectorInvolved,
		});
	};

	/**
	 * sector input handler
	 * @param {*} event
	 */
	const handleSectorFieldChange = (event) => {
		const { name, value, type, checked } = event.target;
		const newValue = type === "checkbox" ? checked : value;

		setSectorUpdatedData((prevData) => ({
			...prevData,
			[name]: newValue,
		}));
	};

	/**
	 * sector selector handler
	 * @param {*} event
	 */
	const handleSectorChange = (event) => {
		const selectedOptions = Array.from(
			event.target.selectedOptions,
			(option) => ({
				value: option.value,
				label: option.text.trimStart(),
			})
		);

		setSectorUpdatedData((prevData) => ({
			...prevData,
			sectors: selectedOptions,
		}));
	};

	/**
	 * sector update form handler
	 * @param {*} event
	 */
	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			setIsPosting(true);
			const sectorUpdatedResponse = await updateSectorInvolved(
				sectorId,
				sectorUpdatedData
			);

			const { message, data } = sectorUpdatedResponse.data;

			// updated sector payload pass
			handeAddSectorInvolvedUpdateToState(data);

			// stop loading
			setIsPosting(false);

			Swal.fire({
				title: "Good job!",
				text: message,
				icon: "success",
				showConfirmButton: true,
				allowOutsideClick: true,
			}).then((result) => {
				if (result.isConfirmed || result.isDismissed) {
					navigate("/");
				}
			});
		} catch (error) {
			const { data } = error.response;

			// join error messages
			const error_Messages = data.errorMessages
				.map((error) => `${error.path}: ${error.message}`)
				.join("<br/>");

			Swal.fire(data.message, error_Messages, "error");
		}
	};

	// define what to render
	let content = null;

	if (isLoading || sectorsLoading) {
		content = (
			<>
				<h2>Loading...</h2>
			</>
		);
	} else if (!isLoading && !sectorsLoading && isError) {
		content = (
			<>
				<h2>Something Wrong. Contact admin!</h2>
			</>
		);
	} else if (!isLoading && !sectorsLoading && !isError) {
		content = (
			<>
				<h1 className="text-2xl font-semibold text-center text-gray-500 mt-8 mb-6">
					Update the Sectors you are currently involved in.
				</h1>
				<form onSubmit={handleSubmit}>
					<div className="mb-6">
						<label
							htmlFor="name"
							className="block mb-2 text-sm text-gray-600"
						>
							Name
						</label>
						<input
							type="text"
							id="name"
							name="name"
							className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
							required
							onChange={handleSectorFieldChange}
							value={sectorUpdatedData.name}
						/>
					</div>
					<div className="mb-6">
						<label
							htmlFor="Sectors"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
						>
							Sectors
						</label>
						<select
							id="Sectors"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
							multiple
							size={8}
							name="sectors"
							onChange={handleSectorChange}
							value={sectorUpdatedData.sectors.map(
								(sector) => sector.value
							)}
						>
							{renderOptions(sectorsNames)}
						</select>
					</div>
					<div className="mb-6">
						<label className="inline-flex items-center">
							<input
								type="checkbox"
								className="form-checkbox h-5 w-5 text-orange-600"
								name="agree"
								onChange={handleSectorFieldChange}
								checked={sectorUpdatedData.agree}
							/>
							<span className="ml-2 text-gray-700">
								Agree to terms
							</span>
						</label>
					</div>

					<button
						type="submit"
						className={`w-32 bg-gradient-to-r from-cyan-400 to-cyan-600 text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mt-4 mb-6 ${
							(isPosting ||
								!sectorUpdatedData.agree ||
								!sectorUpdatedData.name ||
								sectorUpdatedData.sectors.length === 0) &&
							"disabled:opacity-50"
						}`}
						disabled={
							isPosting ||
							!sectorUpdatedData.agree ||
							!sectorUpdatedData.name ||
							sectorUpdatedData.sectors.length === 0
						}
					>
						{isPosting ? "Updating..." : "Update"}
					</button>
				</form>
			</>
		);
	}

	return content;
}

export default UpdateSectorInvolvedForm;
