import React, { useState } from 'react';
import './LoginStyle.css'; // Importa el CSS

export const LoginPage = ({ handleLogin, setIsRegistering, setIsRecovering, error }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="form-content">
          <div className="logoR">
            <img src="\Icono_Recuperar.jpg" alt="Personaje" />
          </div>
          <h2>Soldados Gym</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={(e) => handleLogin(e, username, password)}>
            <div className="input-group">
              <input
                type="text"
                placeholder="Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
            <button type="submit" className="btn-primary">
              Iniciar sesión
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setIsRegistering(true)}
            >
              Registrarse
            </button>
            <p className="forgot-password">
              ¿Olvidaste tu contraseña?{' '}
              <span className="recover-link" onClick={() => setIsRecovering(true)}>
                Recupérala Aquí
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};



