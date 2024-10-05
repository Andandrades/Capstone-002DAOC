import React, { useState } from 'react';
import './recuperar.css';

function Recuperar({ setIsRecovering }) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleRecover = (e) => {
    e.preventDefault();

    // Validación del correo
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Por favor ingresa un correo válido');
      return;
    }
    setError('');
    setMessage('Se ha enviado un correo de recuperación');
  };

  return (
    <div className="login-container">
      <h2>Recuperar Contraseña</h2>
      {message && <p className="message">{message}</p>}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleRecover}>
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
        <button type="submit" className="btn-primary">Enviar</button>
        <div className="button-group">
          <button type="button" className="btn-link" onClick={() => setIsRecovering(false)}>Volver</button>
        </div>
      </form>
    </div>
  );
}

export default Recuperar;
