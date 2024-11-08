import axios from "axios";
const URL = "http://localhost:3000";

// clientes
export const ObtenerClientes = async () => {
  try {
    const response = await axios.get(`${URL}/users/role/Clientes`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los clientes:", error);
    throw error;
  }
};

// entrenadores
export const ObtenerEntrenadores = async () => {
  try {
    const response = await axios.get(`${URL}/users/role/Entrenadores`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los entrenadores:", error);
    throw error;
  }
};

// nutricionistas
export const ObtenerNutricionistas = async () => {
  try {
    const response = await axios.get(`${URL}/users/role/Nutricionistas`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los nutricionistas:", error);
    throw error;
  }
};

// administradores
export const ObtenerAdministradores = async () => {
  try {
    const response = await axios.get(`${URL}/users/role/Administradores`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los administradores:", error);
    throw error;
  }
};

// Eliminar usuario
export const EliminarUsuario = async (id) => {
  try {
    const response = await axios.delete(`${URL}/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    throw error;
  }
};

// Crear usuario
export const CrearUsuario = async (userData) => {
  try {
    const response = await axios.post(`${URL}/users`, userData);
    return response.data;
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    throw error;
  }
};

// Editar usuario
export const ActualizarUsuario = async (id, userData) => {
  try {
    const response = await axios.put(`${URL}/users/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    throw error;
  }
};