import React, { useState } from "react";
import "./LoginStyle.css";
import Registrate from "../../assets/img/Registrate.webp";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../Components/API/UserContext";

const LoginPage = () => {
  const { fetchAuthData } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const goto = (url) => {
    navigate(`/${url}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
    } catch (err) {
      setError("Error en el servidor");
      console.log(err);
    }
    fetchAuthData();

  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="logo">
          <img src={Registrate} alt="Logo" />
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
            onClick={() => goto('Register')}
          >
            Registrarse
          </button>
          {/* Recuperación de contraseña */}
          <p className="forgot-password">
            ¿Olvidaste tu contraseña?{" "}
            <span className="recover-link">
              Recupérala aquí
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
