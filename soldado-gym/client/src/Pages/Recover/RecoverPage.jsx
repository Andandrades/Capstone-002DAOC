import React, { useState } from 'react';
import './RecoverStyle.css'; // Manteniendo el mismo archivo CSS
import login from "../../assets/img/login.webp";

export const RecoverPage = () => {

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isRecovering, setIsRecovering] = useState(''); 
  const handleRecover = (e) => {
    e.preventDefault();

    // Validación simple del correo
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Por favor ingresa un correo válido');
      return;
    }

    // Limpiar el mensaje de error y mostrar el mensaje de éxito
    setError('');
    setMessage('Se ha enviado un correo de recuperación');
  };
  return (
    <div className="login-container">
    <img src={login} alt="login" /> {/* Cambia aquí a la nueva imagen */}
    <h2>Recuperar Contraseña</h2>

    {/* Mostrar mensaje de éxito */}
    {message && <p className="message">{message}</p>}
    
    {/* Mostrar error si existe */}
    {error && <p className="error">{error}</p>}

    {/* Formulario para ingresar el correo */}
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

      {/* Botón para enviar el formulario */}
      <button type="submit" className="btn-primary">Enviar</button>

      {/* Botón para volver a la página anterior */}
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
  )
}
