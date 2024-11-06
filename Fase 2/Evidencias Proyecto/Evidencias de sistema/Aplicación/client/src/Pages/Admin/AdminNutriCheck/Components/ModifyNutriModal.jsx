import React from 'react';
import { updateNutri } from '../../../../Components/API/Endpoints';
import { useForm } from 'react-hook-form';

const ModifyNutriModal = (props) => {
  const { isOpen, onClose, id, name, price, description, fetchPlans, } = props;

  if (!isOpen) return null;

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const payload = {
      ...data,
    };
    updateNutri(id, payload)
      .then(response => {
        console.log('consulta modificada:', response);
        fetchPlans(true)
      })
      .catch(error => {
        console.error('Error al agregar el plan:', error);
      });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="modal-dialog bg-gray-200 w-full max-w-lg mx-auto p-5 rounded-md shadow-lg">
        <div className="modal-content">
          <div className="modal-header flex justify-between items-center">
            <div className="my-6 z-10 items">
              <h1 className="text-2xl font-bold text-black">Modificar consulta nutricional</h1>
            </div>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group mb-4">
                <label htmlFor="planName" className="block text-sm font-medium text-gray-700">
                  Nombre del Plan
                </label>
                <input
                  type="text"
                  className="form-control w-full p-2 border border-gray-300 rounded-md"
                  id="planName"
                  defaultValue={name}
                  {...register("name", { required: true })}
                />
                {errors.name && <span className="text-red-500">Este campo es obligatorio</span>}
              </div>
              <div className="form-group mb-4">
                <label htmlFor="planDescription" className="block text-sm font-medium text-gray-700">
                  Descripción del Plan
                </label>
                <textarea
                  type="text"
                  className="form-control w-full p-2 border border-gray-300 rounded-md pb-24"
                  id="planDescription"
                  defaultValue={description}
                  {...register("description", { required: true })}
                />
                {errors.description && <span className="text-red-500">Este campo es obligatorio</span>}
              </div>
              <div className="form-group mb-4">
                <label htmlFor="planPrice" className="block text-sm font-medium text-gray-700">
                  Precio
                </label>
                <input
                  type="number"
                  className="form-control w-full p-2 border border-gray-300 rounded-md"
                  id="planPrice"
                  defaultValue={price}
                  {...register("price", { required: true })}
                />
                {errors.price && <span className="text-red-500">Este campo es obligatorio</span>}
              </div>
              <div className="form-group mb-4">
                <label htmlFor="planPrice" className="block text-sm font-medium text-gray-700">
                  Precio oferta (no obligatorio)
                </label>
                <input
                  type="number"
                  className="form-control w-full p-2 border border-gray-300 rounded-md"
                  id="planPrice"
                  defaultValue={price}
                  {...register("offer_price", { required: false })}
                />
              </div>


              <div className="modal-footer flex justify-end mt-4">
                <button type="button" className="btn btn-secondary mr-2 p-2 bg-gray-300 rounded-md" onClick={onClose}>
                  Cerrar
                </button>
                <button type="submit" className="btn btn-secondary mr-2 p-2 bg-gray-300 rounded-md ">
                  Guardar Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ModifyNutriModal;
