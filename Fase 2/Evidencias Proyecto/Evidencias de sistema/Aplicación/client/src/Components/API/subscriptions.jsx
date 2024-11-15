import axios from "axios";
const URL = "http://localhost:3000";

// Manejo de sesiones
export const subscriptionByUser = async (payload) => {
    try {
        const response = await axios.post(`${URL}/subscriptionByUser`, payload); // Enviar `payload` en el body
        return response.data;
    } catch (error) {
        console.error("Error al obtener la suscripcion:", error);
    }
};
