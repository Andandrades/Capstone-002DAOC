const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Secret y tiempo de expiración del token
const jwtSecret = process.env.JWT_SECRET; // Cargar desde variable de entorno
const tokenExpiry = "1h";

const registerUser = async (req, res) => {
  const { email, password, fk_rol_id } = req.body;

  try {
    const userExists = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (userExists.rows.lenght > 0) {
      return res
        .status(400)
        .json({ message: "Usuario ya se encuentra registrado" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      "INSERT INTO users(email,password,register_date,fk_rol_id) VALUES ($1,$2,NOW(),$3) RETURNING id,email",
      [email, hashedPassword, fk_rol_id]
    );

    const token = jwt.sign(
      { userId: newUser.rows[0].id, email: newUser.rows[0].email },
      jwtSecret,
      { expiresIn: tokenExpiry }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 3600000,
    });
    res
      .status(201)
      .json({ message: "Usuario registrado con éxito", user: newUser.rows[0] });
  } catch (error) {
    console.error(error);
    console.log(error)
    res.status(500).json({ message: "Error al registrar el usuario" });
  }
};

module.exports = {
  registerUser,
};
