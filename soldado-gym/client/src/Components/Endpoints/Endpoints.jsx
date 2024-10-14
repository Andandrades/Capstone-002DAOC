const URL = "http://localhost:3000";

export const obtenerPlanes = async () => {
    try {
        const response = await fetch(`${URL}/plans`);
        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al obtener los planes:", error);
        throw error;
    }
};

export const obtenerNutri = async () => {
    try {
        const response = await fetch(`${URL}/plans`);
        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al obtener los planes:", error);
        throw error;
    }
};