import axios from "axios";
const URL = `${import.meta.env.VITE_API_URL}`;


//rutas de administrar planes
export const obtenerPlanes = async () => {
    try {
        const response = await axios.get(`${URL}/plans`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener los planes:", error);
        throw error;
    }
};

export const deletePlan = async (id) => {
    try {
        const response = await axios.delete(`${URL}/plans/${id}`);
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('No se pudo eliminar el plan');
        }
    } catch (error) {
        console.error("Error al eliminar el plan:", error);
        throw error; 
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

//administrar consultas nutricionales 

export const obtenerNutri = async () => {
    try {
        const response = await axios.get(`${URL}/Nutri`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener las consultas nutricionales:", error);
        throw error;
    }
};

export const updateNutri = async (id,payload) => {
    try {
        const response = await axios.put(`${URL}/Nutri/${id}`, payload);
        return response.data 
    } catch (error) {
        console.error("Error al modificar la consulta:", error);
    }
};

export const deleteNutri = async (id) => {
    try {
        const response = await axios.delete(`${URL}/DeleteNutri/${id}`);
        return response.data 
    } catch (error) {
        console.error("Error al eliminar la consulta:", error);
    }
};

export const addNutri = async (payload) => {
    try {
        const response = await axios.post(`${URL}/Nutri`, payload);
        return response.data 
    } catch (error) {
        console.error("Error al añadir el plan:", error);
    }
};


//agenta nutricionista 

export const GetAvalibleNutriSchedule = async () => {
    try {
        const response = await axios.get(`${URL}/GetAvalibleNutriSchedule`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener las consultas nutricionales:", error);
        throw error;
    }
};