const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No estás autenticado" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded; 
    next(); 
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expirado" });
    }
    return res.status(401).json({ message: "Token no válido" });
  }
};

module.exports = authenticateToken;
