import React, { useState } from 'react';
import { updatePlan } from '../../../../Components/API/Endpoints';
import { useForm } from 'react-hook-form';

const ModifyPlanModal = (props) => {
  const { isOpen, onClose, id, name, amount,offer_price, n_class, fetchPlans,description } = props;

  const [selectedColor, setSelectedColor] = useState('#007bff'); 
  const { register, handleSubmit, formState: { errors } } = useForm();

  const colors = ['#007bff','#28a745','#ffc107','#6f42c1',];
  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const onSubmit = (data) => {
    const payload = {
      ...data,
      color: selectedColor,
      id: { id }
    };
    updatePlan(id, payload)
      .then(response => {
        console.log('Plan agregado:', response);
        fetchPlans(true)
      })
      .catch(error => {
        console.error('Error al agregar el plan:', error);
      });
    onClose();
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="modal-dialog bg-gray-200 w-full max-w-lg mx-auto p-5 rounded-md shadow-lg">
        <div className="modal-content">
          <div className="modal-header flex justify-between items-center">
            <div className="my-6 z-10 items">
              <h1 className="text-2xl font-bold text-black">Modificar plan</h1>
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
                <input
                  type="text"
                  className="form-control w-full p-2 border border-gray-300 rounded-md"
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
                  defaultValue={amount}
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
                  defaultValue={offer_price}
                  {...register("offer_price", { required: false })}
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
                  defaultValue={n_class}
                  
                  {...register("n_class", { required: true })}
                />
                {errors.n_class && <span className="text-red-500">Este campo es obligatorio</span>}
              </div>
              
              <div>
                <label htmlFor="options" className="block text-sm font-medium text-gray-700">
                  Seleccione tipo de plan
                </label>
                <select
                  id="options"
                  className="form-select mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  {...register("type")}
                >
                  <option value="Individual">Individual</option>
                  <option value="En parejas">En parejas</option>
                </select>
              </div>
              <div className="form-group mb-4">
                <label htmlFor="planColor" className="block text-sm font-medium text-gray-700 py-3">
                  Color
                </label>
                {colors.map((color) => (
                  <button className='m-3'
                    type="button"
                    key={color}
                    onClick={() => handleColorChange(color)}
                    style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: color,
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      outline: selectedColor === color ? '2px solid #000' : 'none',
                    }}
                  />
                ))}
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


export default ModifyPlanModal;
