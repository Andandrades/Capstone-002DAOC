import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

export const CreateMultiHoursModal = ({ onClose, onSubmit }) => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [interval, setInterval] = useState(60); // Intervalo en minutos por defecto

  const handleFormSubmit = () => {
    onSubmit({ selectedDays: selectedDates, startTime, endTime, interval });
    onClose();
  };

  const handleDayClick = (date) => {
    // Crear una nueva lista de fechas seleccionadas
    const newSelectedDates = selectedDates.some(
      (d) => d.toDateString() === date.toDateString() // Comparar fechas por su representación en string
    )
      ? selectedDates.filter((d) => d.toDateString() !== date.toDateString())
      : [...selectedDates, date];

    setSelectedDates(newSelectedDates);
    console.log(selectedDates);
    
  };



  return (
    <div className="fixed inset-0 z-20 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-md w-1/3">
        <h2 className="text-xl font-semibold mb-2">Crear Horas Rápidamente</h2>

        <label>Días de la semana:</label>
        <DayPicker
          selected={selectedDates}
          onDayClick={handleDayClick}
          className={{
            selected : 'bg-blue-500 text-white'
          }}
          modifiers={{
            selected: (date) => selectedDates.some(d => d.toDateString() === date.toDateString()), // Clase de Tailwind para resaltar los días seleccionados
          }}
        />

        <label>Hora de inicio:</label>
        <input
          type="time"
          className="border p-2 w-full mb-2"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />

        <label>Hora de fin:</label>
        <input
          type="time"
          className="border p-2 w-full mb-2"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />

        <label>Intervalo (en minutos):</label>
        <input
          type="number"
          className="border p-2 w-full mb-2"
          value={interval}
          onChange={(e) => setInterval(Number(e.target.value))}
        />

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleFormSubmit}
        >
          Crear Horas
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded ml-2"
          onClick={onClose}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};
