import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import registrate from "../../assets/img/Registrate.webp"; 
import "./RegisterStyle.css"; 

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // email y password
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Registro exitoso');
        navigate('/login'); // Redirigir al login 
      } else {
        setMessage('Error: ' + data.error);
      }
    } catch (error) {
      setMessage('Error en el servidor: ' + error.message);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister} className="register-form">
        <div className="logo">
          <img src={registrate} alt="Registro" /> 
        </div>
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
        <button type="button" className="btn-link" onClick={() => navigate('/login')}>Volver</button>
      </form>
    </div>
  );
};
