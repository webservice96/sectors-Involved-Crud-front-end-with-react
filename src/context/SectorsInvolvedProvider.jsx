/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";
import sectorsInvolvedReducer, {
	initialState,
} from "../reducers/sectorInvolvedReducer";
export const SectorsInvolvedContext = createContext();

const SectorInvolvedProvider = ({ children }) => {
	const [state, dispatch] = useReducer(sectorsInvolvedReducer, initialState);
	return (
		<SectorsInvolvedContext.Provider value={{ state, dispatch }}>
			{children}
		</SectorsInvolvedContext.Provider>
	);
};

const useSectorInvolvedData = () => {
	const context = useContext(SectorsInvolvedContext);
	if (!context) {
		throw new Error("Somwthing went wrong on Context!");
	}
	return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { SectorInvolvedProvider, useSectorInvolvedData };
