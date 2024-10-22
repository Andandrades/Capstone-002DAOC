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


export const deletePlan = async (id) => {
    try {
        const response = await axios.delete(`${URL}/plans/${id}`);
        return response.data 
    } catch (error) {
        console.error("Error al eliminar el plan:", error);
    }
};

export const addPlan = async (payload) => {
    try {
        const response = await axios.post(`${URL}/plans`, payload);
        return response.data 
    } catch (error) {
        console.error("Error al añadir el plan:", error);
    }
};

export const updatePlan = async (id,payload) => {
    try {
        const response = await axios.put(`${URL}/plans/${id}`, payload);
        return response.data 
    } catch (error) {
        console.error("Error al añadir el plan:", error);
    }
};
