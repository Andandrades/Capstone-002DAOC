import React, { useState } from 'react';
import login from "../../assets/img/login.webp";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RecoverPage = () => {

  const navigate = useNavigate();

  const sendEmail = async () => {
    try {
      const response = await axios.post('http://localhost:3000/sendemail', {
        to: 'andyxz00hd@hotmail.com',
        subject: 'Correo desde React',
        text: 'Hola, este es un correo enviado desde mi aplicación React y Express.',
      });
      toast.success('Se ha enviado un correo de recuperación');

      console.log('Correo enviado:', response.data);
    } catch (error) {
      console.error('Error enviando correo:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    sendEmail();
  };

  const goto = (ruta) => {
    navigate(`/login`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <div className="flex justify-center items-center mb-6">
          <img src={login} alt="Logo" className="w-48 h-auto" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Soldados Gym</h2>
        <h2>Recuperar Contraseña</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
          <button type="submit"

            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 mb-4"
          >
            Recuperar contraseña
          </button>
          <span
            className="text-purple-600 cursor-pointer underline mt-4 text-gray-600"
            onClick={() => goto()}
          >
            Volver atras
          </span>
        </form>
      </div>
    </div>
  )
}

export default RecoverPage;