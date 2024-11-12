const pool = require("../db");
const nodemailer = require("nodemailer");

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
  const { name, email, password, fk_rol_id, weight, height } = req.body;
  const { id } = req.params;

  try {
    const result = await pool.query(
      "UPDATE users SET name=$1, email=$2, password=$3, fk_rol_id=$4, weight=$5, height=$6 WHERE id=$7 RETURNING *",
      [name, email, password, fk_rol_id, weight, height, id]
    );
    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar Usuarios
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

// Usuarios por rol específico
const getUsersByRole = async (req, res) => {
  const { roleId } = req.params;
  try {
    const result = await pool.query("SELECT * FROM users WHERE fk_rol_id = $1", [roleId]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Verificar si el correo electrónico está registrado
const checkEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    if (result.rowCount > 0) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Enviar correo de recuperación
const sendRecoveryEmail = async (req, res) => {
  const { email } = req.body;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tomas.osorio.276@gmail.com',
      pass: 'tomasosorio12345'
    }
  });

  const mailOptions = {
    from: 'tomas.osorio.276@gmail.com',
    to: email,
    subject: 'Recuperación de contraseña',
    text: 'Presiona aquí para cambiar tu contraseña: [enlace]'
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: 'Correo de recuperación enviado' });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  getUsersByRole,
  checkEmail,
  sendRecoveryEmail
};