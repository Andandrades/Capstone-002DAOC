const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;
const tokenExpiry = "1h";

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    const user = userResult.rows[0];

    if (!user) {
      return res.status(401).json({ message: "Email inválido" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña inválida" });
    }
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.fk_rol_id
      },
      jwtSecret,
      { expiresIn: tokenExpiry }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true, 
      sameSite: "None",
      maxAge: 3600000,
    });

    res.status(200).json({ message: "Inicio de sesión exitoso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno al iniciar sesión" });
  }
};

const registerUser = async (req, res) => {
  const { name, email, password, fk_rol_id } = req.body;
  const date = new Date();

  try {
    const userExists = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (userExists.rows.length > 0) {
      return res
        .status(400)
        .json({ message: "El usuario ya está registrado" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      "INSERT INTO users(name,email,password,register_date,fk_rol_id) VALUES ($1,$2,$3,$5,$4) RETURNING id,email,name,fk_rol_id",
      [name, email, hashedPassword, fk_rol_id,date]
    );

    return res
      .status(201)
      .json({
        message: "Usuario registrado con éxito",
        user: {
          id: newUser.rows[0].id,
          email: newUser.rows[0].email,
          name: newUser.rows[0].name,
          role: newUser.rows[0].fk_rol_id,
        },
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al registrar el usuario" });
  }
};

const checkAuth = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(200).json({ isAuth: false });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    const userResult = await pool.query(
      "SELECT id, name, email, fk_rol_id,weight,height,s.plan_id,s.suscription_id , s.remaining_classes FROM users u left join suscription s on u.id = s.user_id WHERE id = $1 order by start_date desc limit 1",
      [decoded.id]
    );
    const user = userResult.rows[0];
    if (!user) {
      return res.status(404).json({ isAuth: false, message: "Usuario no encontrado" });
    }
    return res.status(200).json({
      isAuth: true,
      userId: decoded.id,
      name: user.name,
      email: user.email,
      role: user.fk_rol_id,
      remaining_classes: user.remaining_classes,
      plan_id: user.plan_id,
      weight : user.weight,
      height : user.height,
      suscription_id: user.suscription_id
    });

  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(200).json({ isAuth: false, message: "Token expirado" });
    }
    return res.status(400).json({ isAuth: false, message: "Token no válido" });
  }
};

const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No estás autenticado" });
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    const userId = decoded.id;
    const userResult = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [userId]
    );
    const user = userResult.rows[0];
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "La contraseña actual es incorrecta" });
    }
    if (newPassword.length < 8) {
      return res.status(400).json({
        message: "La nueva contraseña debe tener al menos 8 caracteres",
      });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await pool.query(
      "UPDATE users SET password = $1 WHERE id = $2",
      [hashedPassword, userId]
    );
    return res.status(200).json({ message: "Contraseña actualizada con éxito" });
  } catch (error) {
    console.error(error);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expirado. Inicia sesión de nuevo" });
    }
    return res.status(500).json({ message: "Error al cambiar la contraseña" });
  }
};


const logOut = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true, 
    secure: true, 
    expires: new Date(0),
    sameSite: "None",
  });

  res.status(200).json({ message: "Sesión cerrada" });
};

module.exports = {
  registerUser,
  loginUser,
  checkAuth,
  logOut,
  changePassword
};
