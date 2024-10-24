const pool = require("../db");

//Listar Usuarios
const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (error) {
    res.json({ error: error.message });
  }
};

//Traer Usuario Especifico
const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("SELECT * FROM users WHERE id=$1", [id])

    if (result.rowCount === 0) {
      return res.json({ message: "Usuario no encontrado" })
    }
    return res.json(result.rows)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

//Crear Usuarios
const createUser = async (req, res) => {
  const { name, email, password, fk_rol_id, weight, height } =
    req.body;
  const register_date = new Date();
  try {
    const result = await pool.query(
      "INSERT INTO users (name,email,password,register_date, fk_rol_id , weight , height) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *",
      [name, email, password, register_date, fk_rol_id, weight, height]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.log({ error: error.detail });
    res.status(400);
    res.json({ error: error.detail });
  }
};

//Actualizar usuarios
const updateUser = async (req, res) => {
  const { name, email, password, register_date, fk_rol_id, weight, height } =
    req.body;
  const { id } = req.params;

  try {
    const result = await pool.query(
      "UPDATE users SET name=$1 , email=$2, password=$3, register_date=$4, fk_rol_id=$5, weight=$6 , height=$7 WHERE id=$8 RETURNING *",
      [name, email, password, register_date, fk_rol_id, weight, height, id]
    );
    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.json({ error: error.message });
  }
};

//Eliminar Usuarios
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM users WHERE id =$1", [id]);

    if (result.rowCount === 0) {
      return res.status(400).json({
        message: "Usuario no encontrado",
      });
    }
    return res.sendStatus(204);
  } catch (error) {
    res.json({ error: error.message });
  }
};
module.exports = {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser
};
