import React, { useState } from 'react';
import { updateNutri } from '../../../../Components/API/Endpoints';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Button } from 'antd';

const ModifyNutriModal = ({ isOpen, onClose, id, name, price, description, fetchPlans }) => {
  const [loadingButton, setLoadingButton] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoadingButton(true);
    try {
      const payload = { ...data };
      const response = await updateNutri(id, payload);
      toast.success('Consulta modificada correctamente.');
      fetchPlans(true);
      setLoadingButton(false);
      onClose(); 
    } catch (error) {
      setLoadingButton(false);

      toast.error('Error al modificar la consulta.');
    }
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="modal-dialog bg-gray-200 w-full max-w-lg mx-auto p-5 rounded-md shadow-lg">
        <div className="modal-content">
          <div className="modal-header flex justify-between items-center">
            <h1 className="text-2xl font-bold text-black">Modificar consulta nutricional</h1>
            <button
              type="button"
              className="text-black text-xl"
              onClick={onClose}
              aria-label="Cerrar"
            >
              ×
            </button>
          </div>
          <div className="modal-body mt-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nombre del Plan
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-control w-full p-2 border border-gray-300 rounded-md"
                  defaultValue={name}
                  {...register('name', { required: 'Este campo es obligatorio' })}
                />
                {errors.name && <span className="text-red-500">{errors.name.message}</span>}
              </div>

              <div className="form-group mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Descripción del Plan
                </label>
                <textarea
                  id="description"
                  className="form-control w-full p-2 border border-gray-300 rounded-md"
                  defaultValue={description}
                  {...register('description', { required: 'Este campo es obligatorio' })}
                />
                {errors.description && (
                  <span className="text-red-500">{errors.description.message}</span>
                )}
              </div>

              <div className="form-group mb-4">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Precio
                </label>
                <input
                  type="number"
                  id="price"
                  className="form-control w-full p-2 border border-gray-300 rounded-md"
                  defaultValue={price}
                  {...register('price', {
                    required: 'Este campo es obligatorio',
                    min: {
                      value: 5000,
                      message: 'El precio no puede ser menor a 5000',
                    },
                  })}
                />
                {errors.price && <span className="text-red-500">{errors.price.message}</span>}
              </div>

              <div className="form-group mb-4">
                <label htmlFor="offer_price" className="block text-sm font-medium text-gray-700">
                  Precio oferta (opcional)
                </label>
                <input
                  type="number"
                  id="offer_price"
                  className="form-control w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Ejemplo: 4500"
                  {...register('offer_price')}
                />
              </div>

              <div className="modal-footer flex justify-end mt-4">
                <Button
                  type="button"
                  className="btn btn-secondary mr-2 p-2 bg-gray-300 rounded-md"
                  onClick={onClose}
                >
                  Cerrar
                </Button>
                
                <Button
                  type="primary"
                  htmlType="submit" // Esto asegura que el formulario se envíe
                  loading={loadingButton}
                  className="p-2 bg-blue-500 text-white rounded-md"
                >
                  Guardar consulta
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModifyNutriModal;
