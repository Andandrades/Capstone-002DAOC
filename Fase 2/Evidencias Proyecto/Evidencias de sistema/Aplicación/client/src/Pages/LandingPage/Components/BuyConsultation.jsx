import React, { useState } from 'react';
import { useUser } from '../../../Components/API/UserContext';
import { iniciarTransaccion } from '../../../Components/API/WebPayApi';
import { BuyLoginmodal } from '../../../Components/BuyLoginmodal';

const BuyConsultationModal = ({ onClose, id, name, amount, description }) => {
  const { userData, isAuth } = useUser();
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(''); 
  const [isLoading, setIsLoading] = useState(false);


  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
      onClose();
    }
  };

  const iniciarTransaccionHandler = async () => {
    setIsLoading(true);
    try {
      const response = await iniciarTransaccion({
        amount,
        id,
        name,
        description,
        returnUrl: `${window.location.origin}/confirmar-pago`,
        userId: userData.id,
        date: selectedDate,
      });

      if (response && response.url) {
        window.location.href = `${response.url}?token_ws=${response.token}`;
      }
    } catch (error) {
      console.error("Error al iniciar transacción:", error);
      alert("Ocurrió un error al iniciar la transacción. Por favor, inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="modal-content text-center">
      <h2 className="text-xl font-bold mb-4 text-black">Seleccionar Fecha</h2>
      <p className="text-black mb-4">{description}</p>
      <input
        type="date"
        className="border border-gray-300 rounded-md p-2 w-full mb-4"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />
      <button
        className="mt-5 bg-blue-500 text-white font-bold py-2 px-4 rounded-full"
        disabled={!selectedDate}
        onClick={() => setStep(2)}
      >
        Continuar
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div className="modal-content text-center">
      <h2 className="text-xl font-bold mb-4 text-black">Confirmar Compra</h2>
      <p className="text-lg font-semibold text-black">{name}</p>
      <p className="text-sm text-gray-600 mb-4">Fecha seleccionada: {selectedDate}</p>
      <p className="text-black">{description}</p>
      <p className="text-lg font-semibold text-green-500">${amount} CLP</p>
      <button
        className={`mt-5 bg-yellow-500 text-black font-bold py-2 px-4 rounded-full ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={iniciarTransaccionHandler}
        disabled={isLoading}
      >
        {isLoading ? "Procesando..." : "Proceder al Pago"}
      </button>
    </div>
  );

  return (
    <>
      {!isAuth ? (
        <BuyLoginmodal onClose={onClose} />
      ) : (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 modal-backdrop"
          onClick={handleBackdropClick}
        >
          <div
            className="modal-dialog bg-gray-200 w-full max-w-lg mx-auto p-5 rounded-md shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black focus:outline-none"
              onClick={onClose}
            >
              &times;
            </button>
            {step === 1 ? renderStep1() : renderStep2()}
          </div>
        </div>
      )}
    </>
  );
};

export default BuyConsultationModal;
