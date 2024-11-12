import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";

export const NutriPanel = ({ userId }) => {
  const [apoints, setApoints] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newApoint, setNewApoint] = useState({
    start_hour: "",
    available: true,
    nutri_id: "",
    date: "",
  });

  const fetchApoints = async () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/nutriSchedule`)
      .then((response) => {
        const formattedApoints = response.data.map((event) => {
          
          const date = new Date(event.date).toISOString().split("T")[0]; 

          return {
            title: event.available ? "Disponible" : "No Disponible", 
            start: `${date}T${event.start_hour}`,
            extendedProps: {
              available: event.available,
              nutri_id: event.nutri_id,
              client_id: event.client_id,
            },
          };
        });
        setApoints(formattedApoints);
      })
      .catch((error) => {
        toast.error("Error al obtener las clases: ", error);
      });
  };
  useEffect(() => {
    fetchApoints();
  }, []);

  const handleDateClick = (dateInfo) => {
    
    setNewApoint({
      ...newApoint,
      date: dateInfo.dateStr.split("T")[0],
      start_hour: dateInfo.dateStr.split("T")[1]?.slice(0, 5) || "00:00",
      nutri_id: userId,
    });
    setIsModalOpen(true); // Abre el modal para crear el evento
  };

  const handleApointSubmit = () => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/nutriSchedule`, newApoint)
      .then((response) => {
        setApoints([...apoints, response.data]);
        toast.success("Consulta creada con éxito.");
        setIsModalOpen(false);
        fetchApoints();
      })
      .catch((error) => {
        toast.error("Error al crear la consulta.");
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Panel de Nutricionista</h1>
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek" 
        events={apoints}
        dateClick={handleDateClick}
        slotMinTime="06:00:00" //  inicio de la hora de visualización
        slotMaxTime="20:00:00" // el final de la hora de visualización
      />

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-20 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-md w-1/3">
            <h2 className="text-xl font-semibold mb-2">Nueva Consulta</h2>
            <label className="block mb-1">Hora de inicio:</label>
            <input
              type="time"
              className="border p-2 w-full mb-2"
              value={newApoint.start_hour}
              onChange={(e) =>
                setNewApoint({ ...newApoint, start_hour: e.target.value })
              }
            />

            <label className="block mb-1">Disponibilidad:</label>
            <select
              className="border p-2 w-full mb-2"
              value={newApoint.available}
              onChange={(e) =>
                setNewApoint({
                  ...newApoint,
                  available: e.target.value === "true",
                })
              }
            >
              <option value="true">Disponible</option>
              <option value="false">No Disponible</option>
            </select>

            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleApointSubmit}
            >
              Crear Consulta
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded ml-2"
              onClick={() => setIsModalOpen(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
