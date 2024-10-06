import React, { useState } from 'react';
import './LoginStyle.css'; // Se mantiene el mismo CSS

export const LoginPage = ({ handleLogin, setIsRegistering, setIsRecovering, error }) => {
  const [username, setUsername] = useState(''); // Estado para el nombre de usuario
  const [password, setPassword] = useState(''); // Estado para la contraseña

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="form-content">
          {/* Logo del personaje */}
          <div className="logoR">
            <img src="\Icono_Recuperar.jpg" alt="Personaje" />
          </div>

          {/* Título del login */}
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
    </div>
  );
};
