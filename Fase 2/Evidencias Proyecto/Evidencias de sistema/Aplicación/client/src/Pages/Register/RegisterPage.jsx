import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import registrate from "../../assets/img/Registrate.webp";
import { Register } from "../../Components/API/Endpoints";
import "./RegisterStyle.css";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');


  const onSubmit = (data) => {
    event.preventDefault();

    const payload = {
      email: email,
      password: password,
      fk_rol_id: 3,
    };
       
    Register(payload)
      .then(response => {
        console.log("response",response)
        setMessage(`Usuario registrado correctamente: ${response.message}`);
      })
      .catch(error => {
        console.log("error",error)

        setMessage(`Error al registrar: ${error.message}`);
      });
  };
  
  return (
    <div className="register-container flex-col">
      {message && <p className="message">{message}</p>}

      <form onSubmit={onSubmit}
        className="register-form">
        <div className="logo">
          <img src={registrate} alt="Registro" />
        </div>
        <h2>Registrarse</h2>
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
