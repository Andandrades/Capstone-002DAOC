const authorizeRole = (allowedRoles) => {
    return (req, res, next) => {
      const userRole = req.user.role; // Obtenemos el rol del usuario desde `req.user`
  
      if (allowedRoles.includes(userRole)) {
        return next(); // Si el rol está permitido, continúa
      }
  
      return res.status(403).json({ message: "Acceso denegado: permiso insuficiente" });
    };
  };
  
  module.exports = authorizeRole;
  