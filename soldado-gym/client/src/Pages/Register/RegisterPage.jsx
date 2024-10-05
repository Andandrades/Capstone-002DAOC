import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import logo from "../../assets/img/Logo.png";
import "./RegisterStyle.css";

export const RegisterPage = () => {
  const navigate = useNavigate(); // Inicializa useNavigate
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Las contraseñas no coinciden');
    } else {
      setMessage('Registro exitoso');
      // Aquí puedes añadir la lógica para manejar el registro
    }
  };

  return (
    <div className="registro-container">
      <img src={logo} alt="Logo" className="logo" />
      <form onSubmit={handleRegister}>
        <h2>Registrarse</h2>
        {message && <p className="message">{message}</p>}
        <div className="input-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="confirmPassword">Confirmar Contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-primary">Registrarse</button>
        <button type="button" className="btn-link" onClick={() => navigate('/login')}>Volver</button> {/* Cambia setIsRegistering */}
      </form>
    </div>
  );
};