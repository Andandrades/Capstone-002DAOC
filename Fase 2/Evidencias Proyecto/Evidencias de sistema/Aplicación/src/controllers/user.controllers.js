const pool = require("../db");
const bcrypt = require("bcrypt");

// Listar Usuarios
const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (error) {
    res.json({ error: error.message });
  }
};

// Traer Usuario Especifico
const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("SELECT * FROM users WHERE id=$1", [id]);

    if (result.rowCount === 0) {
      return res.json({ message: "Usuario no encontrado" });
    }
    return res.json(result.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar usuarios
const updateUser = async (req, res) => {
  const { name, weight, height, email } = req.body;
  const { id } = req.params;

  try {
    // Obtener el usuario actual para mantener el valor de fk_rol_id
    const userResult = await pool.query("SELECT fk_rol_id FROM users WHERE id = $1", [id]);
    if (userResult.rowCount === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const { fk_rol_id } = userResult.rows[0];

    // Actualizar el usuario manteniendo el valor de fk_rol_id
    const result = await pool.query(
      "UPDATE users SET name = $1, weight = $2, height = $3, email = $4, fk_rol_id = $5 WHERE id = $6 RETURNING *",
      [name, weight, height, email, fk_rol_id, id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Eliminar usuario
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("DELETE FROM users WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.json({ message: "Usuario eliminado con éxito" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener usuarios por rol
const getUsersByRole = async (req, res) => {
  const { roleId } = req.params;

  try {
    const result = await pool.query("SELECT * FROM users WHERE fk_rol_id = $1", [roleId]);

    if (result.rowCount === 0) {
      return res.json({ message: "No se encontraron usuarios con ese rol" });
    }

    return res.json(result.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Crear usuario
const createUser = async (req, res) => {
  const { name, email, password, fk_rol_id, weight, height } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserResult = await pool.query(
      "INSERT INTO users (name, email, password, fk_rol_id, weight, height) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [name, email, hashedPassword, fk_rol_id, weight || null, height || null]
    );
    const newUser = newUserResult.rows[0];
    res.status(201).json({ 
      message: 'Usuario registrado con éxito',
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.fk_rol_id,
        weight: newUser.weight,
        height: newUser.height
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
};

module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  getUsersByRole,
  createUser,
};