import {
	ADDSECTORINVOLVED,
	DELETESECTORINVOLVED,
	EDITSECTORINVOLVED,
} from "../actions/actionTypes";

// Define your initial state
export const initialState = [];

// Define your reducer function
const sectorsInvolvedReducer = (state, action) => {
	switch (action.type) {
		case ADDSECTORINVOLVED:
			return [...state, action.payload];
		case EDITSECTORINVOLVED:
			// eslint-disable-next-line no-case-declarations
			return state.map((sector) => {
				if (sector._id === action.payload._id) {
					return {
						...sector,
						...action.payload,
					};
				}
				return sector;
			});
		case DELETESECTORINVOLVED:
			// eslint-disable-next-line no-case-declarations
			return state.filter((sector) => sector._id !== action.payload._id);
		default:
			return state;
	}
};

export default sectorsInvolvedReducer;
