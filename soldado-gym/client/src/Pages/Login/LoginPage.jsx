import React, { useState } from 'react';
import './LoginStyle.css'; // Asegúrate de que esta ruta sea correcta
import Registrate from '../../assets/img/Registrate.webp'; // Importa la imagen

export const LoginPage = ({ handleLogin, setIsRegistering, setIsRecovering, error }) => {
  const [username, setUsername] = useState(''); // Estado para el nombre de usuario
  const [password, setPassword] = useState(''); // Estado para la contraseña

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="logo">
          <img src={Registrate} alt="Logo" /> {/* Asegúrate de que esta imagen está en la ruta correcta */}
        </div>
        <h2>Soldados Gym</h2>
        
        {/* Mostrar error en caso de que exista */}
        {error && <p className="error">{error}</p>}

        {/* Formulario de login */}
        <form onSubmit={(e) => handleLogin(e, username, password)}>
          {/* Campo de Email */}
          <div className="input-group">
            <input
              type="text"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
            ¿Olvidaste tu contraseña?{' '}
            <span className="recover-link" onClick={() => setIsRecovering(true)}>
              Recupérala aquí
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

