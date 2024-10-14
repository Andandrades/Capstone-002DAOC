import axios from "axios";
const URL = "http://localhost:3000";

export const obtenerPlanes = async () => {
    try {
        const response = await axios.get(`${URL}/plans`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener los planes:", error);
        throw error;
    }
};

export const obtenerNutri = async () => {
    try {
        const response = await axios.get(`${URL}/Nutri`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener las consultas nutricionales:", error);
        throw error;
    }
};
