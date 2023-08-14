import { useState } from "react";
import { postSector } from "../api/api";
import renderOptions from "../utils/SelectOptions";
import Swal from "sweetalert2";
import useSectors from "../hooks/useSectors";
import { useSectorInvolvedData } from "../context/SectorsInvolvedProvider";
import { ADDSECTORINVOLVED } from "../actions/actionTypes";

function AddNewSectorInvolved() {
	const sectors = useSectors();
	const { sectorsNames, isError, isLoading } = sectors;
	const [isPosting, setIsPosting] = useState(false);
	const { dispatch } = useSectorInvolvedData();

	const initialState = {
		sectors: [],
		name: "",
		agree: false,
	};
	const [sectorData, setSectorData] = useState(initialState);

	/**
	 * add submited sector to state
	 * @param {*} sectorInvolved
	 */
	const handeAddSectorInvolvedToState = (sectorInvolved) => {
		dispatch({
			type: ADDSECTORINVOLVED,
			payload: sectorInvolved,
		});
	};

	/**
	 * form select field handler
	 * @param {*} event
	 */
	const handleSectorFieldChange = (event) => {
		const { name, value, type, checked } = event.target;
		const newValue = type === "checkbox" ? checked : value;

		setSectorData((prevData) => ({
			...prevData,
			[name]: newValue,
		}));
	};

	/**
	 * from fields handler
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

		setSectorData((prevData) => ({
			...prevData,
			sectors: selectedOptions,
		}));
	};

	/**
	 * from submit handler
	 * @param {*} event
	 */
	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			setIsPosting(true);
			const sectorResponse = await postSector(sectorData);
			const { message } = sectorResponse.data;

			handeAddSectorInvolvedToState(sectorResponse.data.data);

			// stop loading
			setIsPosting(false);

			// reset the form
			setSectorData(initialState);

			Swal.fire({
				title: "Good job!",
				text: message,
				icon: "success",
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

	// defined what to render
	let content = null;

	if (!isError && isLoading) {
		content = (
			<>
				<h2>Loading...</h2>
			</>
		);
	} else if (!isLoading && isError) {
		content = (
			<>
				<h2>Something Wrong. Contact admin!</h2>
			</>
		);
	} else if (!isLoading && !isError && sectorsNames.length > 0) {
		content = (
			<>
				<h1 className="text-2xl font-semibold text-center text-gray-500 mt-8 mb-6">
					Please enter your name and pick the Sectors you are
					currently involved in.
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
							value={sectorData.name}
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
							required
							size={8}
							name="sectors"
							onChange={handleSectorChange}
							value={sectorData.sectors.map(
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
								checked={sectorData.agree}
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
								!sectorData.agree ||
								!sectorData.name ||
								sectorData.sectors.length === 0) &&
							"disabled:opacity-50"
						}`}
						disabled={
							isPosting ||
							!sectorData.agree ||
							!sectorData.name ||
							sectorData.sectors.length === 0
						}
					>
						{isPosting ? "Saving..." : "Save"}
					</button>
				</form>
			</>
		);
	}

	return content;
}

export default AddNewSectorInvolved;
