import axios from "axios";
const URL = `${import.meta.env.VITE_API_URL}`;

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
        console.error("Error al añadir registrar el usuario:", error);
    }
};

export const Logout = async () => {
    try {
        const response = await axios.post(`${URL}/logout`, {}, { withCredentials: true });
        localStorage.clear();
        return response.data;
    } catch (error) {
        console.error("Error al cerrar la sesión:", error);
    }
};

export const requestPasswordReset = async (email) => {
    try {
        const response = await axios.post(
            `${URL}/request-reset-password`,
            { email },
            { withCredentials: true }
        );

        return response.data;
    } catch (error) {
        console.error("Error al solicitar el cambio de contraseña:", error);
        throw error;
    }
};


export const changePassword = async (currentPassword, newPassword) => {
    try {
        const response = await axios.post(
            `${URL}/change-password`,
            { currentPassword, newPassword },
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        console.error("Error al cambiar la contraseña:", error);
        throw error.response ? error.response.data : { message: "Error desconocido" };
    }
};


