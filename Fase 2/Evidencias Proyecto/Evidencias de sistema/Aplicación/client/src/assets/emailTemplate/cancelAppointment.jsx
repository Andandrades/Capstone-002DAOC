import React from 'react';
import ensalada from '../../assets/img/Ensalada.webp';

const CancelAppointmentTemplate = ({ appointmentTime }) => (
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
      <h1 className="text-2xl font-bold mb-2">{appointmentTime} Cancelacion de su cita</h1>
      <h2 className="text-xl font-semibold mb-4">Su solicitud para cancelar la cita a llegado</h2>
      <p className="text-base">Su cita se a cancelado con exito .</p>
    </div>
  </div>
);

export default CancelAppointmentTemplate;