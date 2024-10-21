import React from 'react';
import PropTypes from 'prop-types';
import { addPlan } from '../../../../Components/API/Endpoints';

const AddPlanModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const AddPlan = () => {
    const payload = {
      name: "postman",
      description: "se añadió este desde el postman",
      n_class: 3,
      price: 50000,
      type: "el tipo no se que es"
    };
  
    addPlan(payload);
  };
  
  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="modal-dialog bg-gray-200 w-full max-w-lg mx-auto p-5 rounded-md shadow-lg">
        <div className="modal-content">
          <div className="modal-header flex justify-between items-center">
            <div className="my-6 z-10 items">
              <h1 className="text-2xl font-bold text-black">Añadir plan</h1>
            </div>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group mb-4">
                <label htmlFor="planName" className="block text-sm font-medium text-gray-700">
                  Nombre del Plan
                </label>
                <input
                  type="text"
                  className="form-control w-full p-2 border border-gray-300 rounded-md"
                  id="planName"
                  name="planName"
                  required
                />
              </div>
              <div className="form-group mb-4">
                <label htmlFor="planDescription" className="block text-sm font-medium text-gray-700">
                  Descripción del Plan
                </label>
                <input
                  type="text"
                  className="form-control w-full p-2 border border-gray-300 rounded-md"
                  id="planDescription"
                  name="planDescription"
                  required
                />
              </div>
              <div className="form-group mb-4">
                <label htmlFor="planPrice" className="block text-sm font-medium text-gray-700">
                  Precio
                </label>
                <input
                  type="number"
                  className="form-control w-full p-2 border border-gray-300 rounded-md"
                  id="planPrice"
                  name="planPrice"
                  required
                />
              </div>
              <div className="form-group mb-4">
                <label htmlFor="planClasses" className="block text-sm font-medium text-gray-700">
                  N° de clases
                </label>
                <input
                  type="number"
                  className="form-control w-full p-2 border border-gray-300 rounded-md"
                  id="planClasses"
                  name="planClasses"
                  required
                />
              </div>
              <div className="form-group mb-4">
                <label htmlFor="planColor" className="block text-sm font-medium text-gray-700">
                  Color
                </label>
                <input
                  type="color"
                  className="form-control w-full p-2 border border-gray-300 rounded-md"
                  id="planColor"
                  name="planColor"
                  required
                />
              </div>
            </form>
          </div>
          <div className="modal-footer flex justify-end mt-4">
            <button type="button" className="btn btn-secondary mr-2 p-2 bg-gray-300 rounded-md" onClick={onClose}>
              Cerrar
            </button>
            <button type="submit" className="btn btn-primary p-2 bg-blue-600 text-white rounded-md" onClick={() => { AddPlan() }}>
              Guardar Plan
            </button>
          </div>
        </div>
      </div>
    </div >
  );
};

AddPlanModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddPlanModal;
