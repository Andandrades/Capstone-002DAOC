import React, { useState } from "react";
import "./LoginStyle.css"; // Asegúrate de que esta ruta sea correcta
import Registrate from "../../assets/img/Registrate.webp"; // Importa la imagen
import { useNavigate } from "react-router-dom";

<<<<<<< HEAD
export const LoginPage = ({ setIsRegistering, setIsRecovering, setIsAuth }) => {
=======
export const LoginPage = ({setIsAuth}) => {
>>>>>>> 12f1a13ca923df08f6aca752848d6416cb1787f5

  const [email, setEmail] = useState(""); // Estado para el nombre de usuario
  const [password, setPassword] = useState(""); // Estado para la contraseña
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Asegura que las cookies se incluyan en la petición
      });

      if (response.status === 200) {
        // Una vez que inicias sesión correctamente, verifica el estado de autenticación
        const authCheckResponse = await fetch(`${import.meta.env.VITE_API_URL}/checkauth`, {
          method: "GET",
          credentials: "include",
        });
        console.log("Auth Check Response:", authCheckResponse);

        if (!authCheckResponse.ok) {
          throw new Error('Error en la verificación de autenticación');
        }

        const authData = await authCheckResponse.json();
        console.log("Auth Data:", authData);
        setIsAuth(authData.isAuth);
<<<<<<< HEAD
        localStorage.setItem("isAuth", JSON.stringify(true));
        navigate("/inicio");
=======
        localStorage.setItem("isAuth", JSON.stringify(true)); // Almacenar en localStorage // Actualiza el estado de isAuth basado en la respuesta
        localStorage.setItem("userID", JSON.stringify(authData.userId)); // Almacenar en localStorage // Actualiza el estado de isAuth basado en la respuesta
        navigate("/inicio"); // Redirige al usuario al menú
>>>>>>> 12f1a13ca923df08f6aca752848d6416cb1787f5
        console.log("Bienvenido");
      } else {
        setError("Credenciales inválidas");
        console.log(response.body);
      }
    } catch (err) {
      setError("Error en el servidor");
      console.log(err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="logo">
          <img src={Registrate} alt="Logo" />{" "}
        </div>
        <h2>Soldados Gym</h2>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Campo de Contraseña */}
          <div className="input-group">
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="password-input"
              required
            />
          </div>

          {/* Botón de inicio de sesión */}
          <button type="submit" className="btn-primary">
            Iniciar sesión
          </button>

          {/* Botón para registrarse */}
          <button
            type="button"
            className="btn-secondary"
            onClick={() => setIsRegistering(true)}
          >
            Registrarse
          </button>

          {/* Recuperación de contraseña */}
          <p className="forgot-password">
            ¿Olvidaste tu contraseña?{" "}
            <span
              className="recover-link"
              onClick={() => setIsRecovering(true)}
            >
              Recupérala aquí
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};
