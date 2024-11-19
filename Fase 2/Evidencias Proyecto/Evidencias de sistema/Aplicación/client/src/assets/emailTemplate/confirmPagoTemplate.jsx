import React from 'react';
import confirmarPago from '../../assets/img/Confirmar_pago.webp';

const ConfirmPaymentTemplate = () => (
  <div className="relative p-4 bg-white rounded-lg shadow-md">
    <div className="absolute inset-0">
      <img
        src={confirmarPago}
        alt="Confirmar Pago"
        className="w-full h-full object-cover opacity-20"
        style={{ filter: 'blur(8px)' }}
      />
    </div>
    <div className="relative z-10">
      <h1 className="text-2xl font-bold mb-2">Pago Realizado</h1>
      <h2 className="text-xl font-semibold mb-4">Hemos recibido su pago</h2>
      <p className="text-base">Su pago se ha realizado con éxito. Esperamos verlo pronto.</p>
    </div>
  </div>
);

export default ConfirmPaymentTemplate;