import React from 'react';
import ensalada from '../../assets/img/ensalada.webp';

const ChangePasswordTemplate = () => (
  <div className="relative p-4 bg-white rounded-lg shadow-md">
    <div className="absolute inset-0">
      <img
        src={ensalada}
        alt="Ensalada"
        className="w-full h-full object-cover opacity-20"
        style={{ filter: 'blur(8px)' }}
      />
    </div>
    <div className="relative z-10">
      <h1 className="text-2xl font-bold mb-2">Solicitud de Cambio de Contraseña</h1>
      <h2 className="text-xl font-semibold mb-4">Nos ha llegado su solicitud de cambio de contraseña</h2>
      <p className="text-base mb-2">Por favor, presione el siguiente enlace para cambiar su contraseña:</p>
      <a href="https://www.youtube.com" className="text-blue-500 underline">Cambiar Contraseña</a>
    </div>
  </div>
);

export default ChangePasswordTemplate;