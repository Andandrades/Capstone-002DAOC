import React, { useState } from 'react';
import './RecoverStyle.css'; 
import login from "../../assets/img/login.webp";

const RecoverPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRecover = async (e) => {
    e.preventDefault();

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Por favor ingresa un correo válido');
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:5000/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          subject: 'Recuperación de contraseña',
          message: 'Haz clic en el enlace para restablecer tu contraseña.',
        }),
      });

      if (!response.ok) throw new Error('No se pudo enviar el correo. Inténtalo más tarde.');

      setError('');
      setMessage('Se ha enviado un correo de recuperación');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
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

        <button type="submit" className="btn-primary" disabled={isLoading}>
          {isLoading ? 'Enviando...' : 'Enviar'}
        </button>

        <div className="button-group">
          <button type="button" className="btn-link" onClick={() => console.log('Regresar')}>
            Volver
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecoverPage;