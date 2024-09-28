//Los controladores son las funciones que va a llamar express, dichas funciones se llamaran en las routes y se ejecutaran en estas

const pool = require("../db");

//Obtener todos los roles
const getAllRoles = async (req, res) => {
  try {
    const result = await pool.query("SELECT * from roles");
    res.json(result.rows);
  } catch (error) {
    console.log(error.message)
  }
};

//Obtener un rol en espercifico
const getRol = async (req, res) => {
  console.log(req.params.id)
  res.json('Retornando una sola tarea')
};

//Crear un Rol
const createRol = async (req, res) => {
  const { name, description } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO roles (name_rol, description) VALUES ($1, $2) RETURNING *",
      [name, description]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.log({ error: error.detail });
    res.status(400);
    res.json({ error: error.detail });
  }
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
