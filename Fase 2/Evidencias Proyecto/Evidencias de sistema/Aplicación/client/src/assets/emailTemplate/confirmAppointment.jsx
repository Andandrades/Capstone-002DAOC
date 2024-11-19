import React from 'react';
import confirmar from '../img/Confirmar.webp';

const ConfirmAppointmentTemplate = ({ appointmentTime }) => (
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
      <h1 className="text-2xl font-bold mb-2">{appointmentTime} - Confirmación de Cita</h1>
      <h2 className="text-xl font-semibold mb-4">Su confirmación de cita ha llegado</h2>
      <p className="text-base">Su cita ha sido confirmada con éxito. Esperamos verlo pronto.</p>
    </div>
  </div>
);

export default ConfirmAppointmentTemplate;
