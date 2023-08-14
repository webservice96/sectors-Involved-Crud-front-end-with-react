import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "https://api-sector-involver.vercel.app/api/v1",
});

export const fetchSectors = () => {
	return axiosInstance.get("/sectors");
};

export const postSector = (sector) => {
	return axiosInstance.post("/sector-involved/create-sectorInvolved", sector);
};

export const getSectorInvolved = (id) => {
	return axiosInstance.get(`/sector-involved/${id}`);
};

export const updateSectorInvolved = (id, updatedData) => {
	return axiosInstance.patch(`/sector-involved/${id}`, updatedData);
};

export const deleteSectorInvolved = (id) => {
	return axiosInstance.delete(`/sector-involved/${id}`);
};
