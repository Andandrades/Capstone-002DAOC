import axios from "axios";
const URL = `${import.meta.env.VITE_API_URL}`;

// Manejo de sesiones
export const subscriptionByUser = async (payload) => {
    try {
        const response = await axios.post(`${URL}/subscriptionByUser`, payload);
        return response.data;
    } catch (error) {
        console.error("Error al obtener la suscripcion:", error);
    }
};
