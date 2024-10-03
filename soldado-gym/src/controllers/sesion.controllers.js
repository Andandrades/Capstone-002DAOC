const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Secret y tiempo de expiración del token
const jwtSecret = process.env.JWT_SECRET; // Cargar desde variable de entorno
const tokenExpiry = "1h";

// Endpoint para iniciar sesión
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
      // Busca al usuario en la base de datos
      const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      const user = userResult.rows[0];

      // Verifica si el usuario existe
      if (!user) {
          return res.status(401).json({ message: 'Credenciales inválidas' });
      }

      // Verifica la contraseña
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(401).json({ message: 'Credenciales inválidas' });
      }

      // Genera el token JWT
      const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: tokenExpiry });

      // Establece la cookie
      res.cookie('token', token, {
          httpOnly: true, // Para que la cookie no sea accesible desde el cliente
          secure: process.env.NODE_ENV, // Solo envía la cookie por HTTPS en producción
      });

      res.status(200).json({ message: 'Inicio de sesión exitoso' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};

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
    res
      .status(201)
      .json({ message: "Usuario registrado con éxito", user: newUser.rows[0] });
  } catch (error) {
    console.error(error);
    console.log(error);
    res.status(500).json({ message: "Error al registrar el usuario" });
  }
};

//Validar JWT
const checkAuth = async (req,res) =>{
  const token = req.cookies.token;

  if(!token){
    return res.status(401).json({isAuthenticated : false});
  }

  try {
    const decoded = jwt.verify(token , jwtSecret);
    return res.status(200).json({isAuthenticated : true , userId:decoded.id})
  } catch (error) {
    return res.status(400).json({isAuthenticated : false});
  }
}

//Cerrar sesion
const logOut = async(req,res) =>{
  res.cookie('token' , '' ,{
    httpOnly : true,
    secure : process.env.NODE_ENV,
    expires : new Date(0)
  })

  res.status(200).json({message : 'Sesion cerrada'})
}

module.exports = {
  registerUser,
  loginUser,
  checkAuth,
  logOut
};
