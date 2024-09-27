//Los controladores son las funciones que va a llamar express, dichas funciones se llamaran en las routes y se ejecutaran en estas

const pool = require("../db");

//Obtener todos los roles
const getAllRoles = async (req, res) => {
  res.json("");
};

//Obtener un rol en espercifico
const getRol = async (req, res) => {
  res.json("Extrayendo un rol en especifico");
};

//Crear un Rol
const createRol = async (req, res) => {
  const { name, description } = req.body;
  const result = await pool.query("INSERT INTO roles (name_rol, description) VALUES ($1, $2)", [
    name,
    description,
  ]);
  console.log(result);
  res.send("Rol added");
};

//Actualizar un rol
const updateRol = (req, res) => {
  res.send("Actualizando un rol");
};

//Eliminar un rol
const deleteRol = (req, res) => {
  res.send("Eliminando rol");
};

//Al momento de escribir una funcion, se tiene que exportar en esta parte del codigo
module.exports = {
  getAllRoles,
  getRol,
  createRol,
  updateRol,
  deleteRol,
};
