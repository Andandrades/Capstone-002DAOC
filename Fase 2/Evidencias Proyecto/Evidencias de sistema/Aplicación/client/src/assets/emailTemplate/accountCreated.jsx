import React from 'react';
import confirmar from '../img/Confirmar.webp';

const AccountCreatedTemplate = () => (
  <div className="relative p-4 bg-white rounded-lg shadow-md">
    <div className="absolute inset-0">
      <img
        src={confirmar}
        alt="Confirmar"
        className="w-full h-full object-cover opacity-20"
        style={{ filter: 'blur(8px)' }}
      />
    </div>
    <div className="relative z-10">
      <h1 className="text-2xl font-bold mb-2">Cuenta Creada</h1>
      <h2 className="text-xl font-semibold mb-4">Su cuenta ha sido creada con éxito</h2>
      <p className="text-base">Gracias por registrarse. Esperamos que disfrute de nuestros servicios.</p>
    </div>
  </div>
);

export default AccountCreatedTemplate;