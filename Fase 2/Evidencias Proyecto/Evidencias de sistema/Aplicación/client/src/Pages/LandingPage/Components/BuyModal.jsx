import React from 'react';
import { useUser } from '../../../Components/API/UserContext';
import { iniciarTransaccion } from '../../../Components/API/WebPayApi';
import { BuyLoginmodal } from '../../../Components/BuyLoginmodal';
import BuyConsultationModal from './BuyConsultation';

const BuyModal = (props) => {
  const { isOpen, onClose, id, name, amount, description, n_class, isPlan, IsConsulta } = props;
  const { userData, isAuth } = useUser();

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
      onClose();
    }
  };

  const iniciarTransaccionHandler = async () => {
    try {
      const response = await iniciarTransaccion({
        amount,
        id,
        name,
        description,
        returnUrl: `${window.location.origin}/confirmar-pago`,
        userId: userData.id
      });
      if (response && response.url) {
        window.location.href = `${response.url}?token_ws=${response.token}`;
      }
    } catch (error) {
      console.error("Error al iniciar transacción:", error);
    }
  };

  if (!isAuth) {
    return <BuyLoginmodal onClose={onClose} />;
  }

  if (IsConsulta) {
    return (
      <BuyConsultationModal
        onClose={onClose}
        name={name}
        amount={amount}
        description={description}
      />
    );
  }

  if (userData.remaining_classes > 0) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 modal-backdrop px-8"
        onClick={handleBackdropClick}
      >
        <div
          className="modal-dialog bg-white w-full max-w-lg mx-auto p-6 rounded-md shadow-lg relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-2 right-2 text-gray-600 hover:text-black focus:outline-none"
            onClick={onClose}
          >
            &times;
          </button>
  
          <div className="modal-content text-center">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              {isPlan ? "¡Ya tienes un plan activo!" : "¡Ya tienes consultas pendientes!"}
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              Antes de realizar la compra, te informamos que aún tienes clases pendientes por utilizar.
              Aprovecha las clases que tienes disponibles antes de adquirir un nuevo plan.
            </p>
            <p className="text-lg font-semibold text-gray-800">
              Clases pendientes: <span className="text-blue-600">{userData.remaining_classes}</span>
            </p>
            
            <div className="mt-6">
              <button
                onClick={onClose}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-md"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  

  if (userData.remaining_classes< 1) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 modal-backdrop px-8"
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

          <div className="modal-content text-center">
            <h2 className="text-xl font-bold mb-4 text-black">
              {isPlan ? "Detalles del plan" : "Detalles de la consulta"}
            </h2>
            <p className="text-lg font-semibold text-black">{name}</p>
            {isPlan && <p className="text-sm text-gray-600">Cantidad de clases: {n_class}</p>}
            <p className="text-black">{description}</p>
            <p className="text-lg font-semibold text-green-500">${amount} CLP</p>

            <button
              className="mt-5 bg-yellow-500 text-black font-bold py-2 px-4 rounded-full"
              onClick={iniciarTransaccionHandler}
            >
              Proceder al Pago
            </button>
          </div>
        </div>
      </div>
    );
  }
  if (userData.remaining_classes > 0) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 modal-backdrop px-8"
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

          <div className="modal-content text-center">
            <h2 className="text-xl font-bold mb-4 text-black">
              {isPlan ? "Detalles del plan" : "Detalles de la consulta"}
            </h2>
            <p className="text-lg font-semibold text-black">Tienes clases pendientes</p>
          </div>
        </div>
      </div>
    );
  }



  return null; 
};

export default BuyModal;
