import React, { useState } from 'react';
import './RecoverStyle.css';
import login from "../../assets/img/login.webp";
import axios from 'axios';

const RecoverPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isRecovering, setIsRecovering] = useState(''); 

  const handleRecover = async (e) => {
    e.preventDefault();

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Por favor ingresa un correo válido');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/check-email', { email });

      if (response.data.exists) {
        // Enviar correo de recuperación
        await axios.post('http://localhost:3000/send-recovery-email', { email });
        setMessage('Se ha enviado un correo de recuperación');
        setError('');
      } else {
        setError('Este correo no tiene una cuenta creada');
        setMessage('');
      }
    } catch (error) {
      setError('Error al verificar el correo');
      setMessage('');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={login} alt="login" />
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
            <button
              type="button"
              className="btn-link"
              onClick={() => setIsRecovering(false)}
            >
              Volver
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecoverPage;