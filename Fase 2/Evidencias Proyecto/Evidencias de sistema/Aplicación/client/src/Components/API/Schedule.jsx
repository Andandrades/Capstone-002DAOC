import axios from "axios";

const URL = `${import.meta.env.VITE_API_URL}`;

export const GetNextClass = async (id) => {
    try {
        const response = await axios.get(`${URL}/scheduleNextClass/${id}`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error al obtener la siguiente clase.", error);
    }
};

export const GetNextConsultation = async (id) => {
    try {
        const response = await axios.get(`${URL}/scheduleNextConsultation/${id}`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error al obtener la siguiente consulta.", error);
    }
};
