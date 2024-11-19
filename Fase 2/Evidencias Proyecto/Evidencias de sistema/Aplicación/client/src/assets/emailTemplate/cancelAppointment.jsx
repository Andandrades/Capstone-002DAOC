import React from 'react';
import cancelar from '../img/cancelar.webp';

const CancelAppointmentTemplate = ({ appointmentTime }) => (
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
      <h1 className="text-2xl font-bold mb-2">{appointmentTime} - Cancelación de Cita</h1>
      <h2 className="text-xl font-semibold mb-4">Su solicitud de cancelación de la cita ha sido recibida</h2>
      <p className="text-base">Su cita ha sido cancelada sin problemas.</p>
    </div>
  </div>
);

export default CancelAppointmentTemplate;