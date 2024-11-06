import axios from "axios";
const URL = "http://localhost:3000";

export const ObtenerClientes = async () => {
    try {
        const response = await axios.get(`${URL}/user`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener los planes:", error);
        throw error;
    }
};