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
  const { id } = req.params

  const result = await pool.query("SELECT * FROM roles WHERE id=$1", [id])


  if (result.rowCount === 0) {
    return res.status(400).json({ message: "Usuario no encontrado" })
  }

  res.json(result.rows)
};

//Crear un Rol
const createRol = async (req, res) => {
  const { name_rol, description } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO roles (name_rol, description) VALUES ($1, $2) RETURNING *",
      [name_rol, description]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.log({ error: error.detail });
    res.status(400);
    res.json({ error: error.detail });
  }
};

//Actualizar un rol
const updateRol = async (req, res) => {

  const { id } = req.params;
  const { name_rol, description } = req.body;

  const result = await pool.query("UPDATE roles SET name_rol = $1 , description = $2 WHERE id = $3 RETURNING *", [name_rol, description, id]);

  if (result.rows.length === 0)
    return res.status(400).json({ message: "Usuario no encontrado" });

  return res.json(result.rows[0])
};

//Eliminar un rol
const deleteRol = async (req, res) => {
  const { id } = req.params;

  const result = await pool.query("DELETE FROM roles WHERE id =$1", [id])

  if (result.rowCount === 0) {
    return res.status(400).json({
      message: "Usuario no encontrado",
    })
  }

  return res.sendStatus(204);

};

//Al momento de escribir una funcion, se tiene que exportar en esta parte del codigo
module.exports = {
  getAllRoles,
  getRol,
  createRol,
  updateRol,
  deleteRol,
};
