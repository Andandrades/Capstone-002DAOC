import React from 'react';
import confirmar from '../img/Confirmar.webp';

const AccountDeletedTemplate = () => (
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
      <h1 className="text-2xl font-bold mb-2">Cuenta Borrada</h1>
      <h2 className="text-xl font-semibold mb-4">Su cuenta ha sido borrada sin problemas</h2>
      <p className="text-base">Lamentamos verlo partir. Su cuenta ha sido eliminada exitosamente.</p>
    </div>
  </div>
);

export default AccountDeletedTemplate;