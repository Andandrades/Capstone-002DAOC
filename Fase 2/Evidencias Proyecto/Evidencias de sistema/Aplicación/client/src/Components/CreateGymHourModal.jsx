import React, { useState } from 'react';

const CreateGymHourModal = ({ selectedSlot, onSave, closeModal }) => {
  const [eventData, setEventData] = useState({
    title: '',
    maxCapacity: '',
  });

  const handleSubmit = () => {
    const newEvent = {
      title: eventData.title,
      start: selectedSlot.startStr,
      end: selectedSlot.endStr,
      extendedProps: {
        maxCapacity: eventData.maxCapacity,
      },
    };
    onSave(newEvent);  // Llama la función onSave del componente padre
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4 sm:mx-auto">
        <h3 className="text-xl font-bold mb-4 text-center">Agregar evento para {selectedSlot.startStr}</h3>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Título del evento"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={eventData.title}
            onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
          />
        </div>

        <div className="mb-4">
          <input
            type="number"
            placeholder="Capacidad máxima"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={eventData.maxCapacity}
            onChange={(e) => setEventData({ ...eventData, maxCapacity: e.target.value })}
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Guardar
          </button>
          <button
            onClick={closeModal}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGymHourModal;
