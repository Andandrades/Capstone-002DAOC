import { useState, useEffect } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import axios from "axios";

const CreateGymHourModal = ({ setCreateModal }) => {
  
  const [formData, setFormData] = useState({
    start_hour: "00:00",
    end_hour: "00:00",
    max_cap: 0,
    schedule_date: "",
  });


  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (selectedDate) => {
    setFormData({ ...formData, schedule_date: selectedDate });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/gymHours`,
        formData
      );
      console.log("Respuesta:", response.data);
      setCreateModal(false);
    } catch (error) {
      console.log("Error al crear la clase", error);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("userID"); // Cambia a "userID"
    if (storedUser) {
        setFormData({
            ...formData,
            actual_cap: 0, // Valor predeterminado
            admin_id: parseInt(storedUser), // Asegúrate de convertirlo a número
        });
    } else {
        console.error("No se encontró userID en localStorage");
    }
}, [setFormData]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center overflow-y-auto">
      <div className="bg-white pt-3 pb-32 w-[90%] max-h-screen p-3 rounded-lg overflow-y-auto">
        <div className="w-full flex justify-end">
          <HighlightOffIcon
            className="text-black cursor-pointer"
            onClick={() => setCreateModal(false)}
          ></HighlightOffIcon>
        </div>
        <h1 className="font-semibold text-2xl">Crear Clase</h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 p-4 max-w-md mx-auto"
        >
          <div>
            <label
              htmlFor="start_hour"
              className="block text-sm font-medium text-gray-700"
            >
              Hora Inicio:
            </label>
            <input
              type="time"
              id="start_hour"
              name="start_hour"
              value={formData.start_hour || ""}
              onChange={handleOnChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="end_hour"
              className="block text-sm font-medium text-gray-700"
            >
              Hora Termino:
            </label>
            <input
              type="time"
              id="end_hour"
              name="end_hour"
              value={formData.end_hour || ""}
              onChange={handleOnChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="max_cap"
              className="block text-sm font-medium text-gray-700"
            >
              Capacidad Maxima:
            </label>
            <select
              id="max_cap"
              name="max_cap"
              value={formData.max_cap || ""}
              onChange={handleOnChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Capacidad Maxima</option>
              {[...Array(101).keys()].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="schedule_date"
              className="block text-sm font-medium text-gray-700"
            >
              Fecha Clase:
            </label>
            <div className="mt-1 w-full max-w-xs sm:max-w-md mx-auto overflow-hidden rounded-md border border-gray-300 shadow-sm">
              <DayPicker
                mode="single"
                selected={formData.schedule_date}
                onSelect={handleDateChange}
                className="p-2"
                styles={{
                  day: { maxWidth: "2rem" },
                  months: { display: "flex", justifyContent: "center" },
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGymHourModal;
