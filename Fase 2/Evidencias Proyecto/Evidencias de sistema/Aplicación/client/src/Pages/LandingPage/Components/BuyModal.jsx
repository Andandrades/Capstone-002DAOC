import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

const BuyModal = (props) => {
  const { isOpen, onClose, name, amount, description, n_class, isAuth } = props;
  const { register, handleSubmit, formState: { errors } } = useForm();

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
      onClose();
    }
  };

  const onSubmit = (data) => {
    onClose();
  };

  return (
    <>
      {isAuth ? (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 modal-backdrop"
          onClick={handleBackdropClick}
        >
          <div 
            className="modal-dialog bg-gray-200 w-full max-w-lg mx-auto p-5 rounded-md shadow-lg"
            onClick={(e) => e.stopPropagation()} 
          >
            <div className="modal-content">
              <div className="modal-header flex flex-col justify-between items-center">
                <h2 className="text-xl font-bold mb-4 text-black">Detalles del Plan</h2>
                <p className="text-lg font-semibold text-black">{name}</p>
                <p className="text-black">{description}</p>
                <p className="text-lg font-semibold text-green-500">
                  ${amount} CLP
                </p>
                <p className="text-sm text-gray-600">
                  Cantidad de clases: {n_class}
                </p>
                <button
                  className="mt-5 bg-yellow-500 text-black font-bold py-2 px-4 rounded-full"
                  onClick={() => {
                    console.log("Procediendo al pago...");
                  }}
                >
                  Proceder al Pago
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 modal-backdrop"
          onClick={handleBackdropClick}
        >
          <div 
            className="modal-dialog bg-gray-200 w-full max-w-lg mx-auto p-5 rounded-md shadow-lg"
            onClick={(e) => e.stopPropagation()} 
          >
            <div className="modal-content">
              <div className="modal-header flex justify-between items-center">
                <h1 className="text-xl font-bold text-red-500">
                  Regístrate o inicia sesión para continuar
                </h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

BuyModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  name: PropTypes.string,
  amount: PropTypes.number,
  description: PropTypes.string,
  n_class: PropTypes.number,
  isAuth: PropTypes.bool.isRequired,
};

export default BuyModal;
