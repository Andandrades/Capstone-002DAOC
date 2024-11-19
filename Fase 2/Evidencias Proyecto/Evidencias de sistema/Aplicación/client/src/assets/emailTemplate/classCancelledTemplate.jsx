import React from 'react';
import cancelar from '../img/cancelar.webp';

const ClassCancelledTemplate = ({ className, classTime }) => (
  <div className="relative p-4 bg-white rounded-lg shadow-md">
    <div className="absolute inset-0">
      <img
        src={cancelar}
        alt="Cancelar"
        className="w-full h-full object-cover opacity-20"
        style={{ filter: 'blur(8px)' }}
      />
    </div>
    <div className="relative z-10">
      <h1 className="text-2xl font-bold mb-2">Clase Cancelada</h1>
      <h2 className="text-xl font-semibold mb-4">Su clase {className} ha sido cancelada</h2>
      <p className="text-base">Lamentamos darle esta informacon pero su clase {classTime} ha sido cancelada.</p>
    </div>
  </div>
);

export default ClassCancelledTemplate;