import axios from "axios";
const URL = `${import.meta.env.VITE_API_URL}`;

export const ObtenerClientes = async () => {
  try {
    const response = await axios.get(`${URL}/users/role/Clientes`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los clientes:", error);
    throw error;
  }
};

export const ObtenerEntrenadores = async () => {
  try {
    const response = await axios.get(`${URL}/users/role/Entrenadores`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los entrenadores:", error);
    throw error;
  }
};

export const ObtenerNutricionistas = async () => {
  try {
    const response = await axios.get(`${URL}/users/role/Nutricionistas`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los nutricionistas:", error);
    throw error;
  }
};

export const ObtenerAdministradores = async () => {
  try {
    const response = await axios.get(`${URL}/users/role/Administradores`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los administradores:", error);
    throw error;
  }
};

export const EliminarUsuario = async (id) => {
  try {
    const response = await axios.delete(`${URL}/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    throw error;
  }
};

export const CrearUsuario = async (userData) => {
  try {
    const response = await axios.post(`${URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    throw error;
  }
};

export const ActualizarUsuario = async (id, userData) => {
  try {
    const response = await axios.put(`${URL}/users/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    throw error;
  }
};

