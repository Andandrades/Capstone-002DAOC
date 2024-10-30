import axios from "axios";
const URL = "http://localhost:3000";
//Manejo de sesiónes

export const Login = async (payload) => {
    try {
        const response = await axios.post(`${URL}/Nutri`, payload);
        return response.data 
    } catch (error) {
        console.error("Error al añadir el plan:", error);
    }
};

export const Register = async (payload) => {
    try {
        const response = await axios.post(`${URL}/register`, payload);
        return response.data 
    } catch (error) {
        console.error("Error al añadir el plan:", error);
    }
};

export const Logout = async () => {
    try {
        const response = await axios.post(`${URL}/logout`, {}, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error al cerrar la sesión:", error);
    }
};