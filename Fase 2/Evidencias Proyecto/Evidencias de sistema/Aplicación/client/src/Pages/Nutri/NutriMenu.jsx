import { useState,useEffect } from "react";

import { SideMenu } from "../../Components/SideMenu";
import NutriImage from "../../assets/icons/Nutritionist.png";
import { NutriPanel } from "../../Components/NutriPanel";
import axios from "axios";
import { toast } from "react-toastify";
import {CreateMultiHoursModal} from '../../Components/CreateMultiHoursModal'

 const NutriMenu = ({ userId }) => {
  const [apoints, setApoints] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);


  const fetchApoints = async () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/nutriSchedule`)
      .then((response) => {
        const formattedApoints = response.data.map((event) => {
          const date = new Date(event.date).toISOString().split("T")[0];

          return {
            title: event.available ? "Disponible" : "No Disponible",
            id: event.nutri_schedule_id,
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

  const handleBulkSubmit = async ({ selectedDays, startTime, endTime, interval }) => {
    try {
  
      if (selectedDays.length === 0) {
        toast.error("Debe seleccionar al menos un día.");
        return;
      }
  
      // Convertir horas de inicio y fin en objetos Date
      const start = new Date(`1970-01-01T${startTime}:00`);
      const end = new Date(`1970-01-01T${endTime}:00`);
      const bulkSchedules = [];
  
      // Iterar sobre los días seleccionados
      for (let day of selectedDays) {
        // Asegurarse de que day es una fecha válida
        if (!(day instanceof Date)) {
          console.error("Elemento no es una fecha válida:", day);
          continue; // Saltar si no es una fecha válida
        }
  
        // Crear las horas dentro del intervalo seleccionado
        for (let current = new Date(start); current < end; current.setMinutes(current.getMinutes() + interval)) {
          const formattedHour = current.toTimeString().split(' ')[0].slice(0, 5);
  
          // Asignar la fecha completa con el día seleccionado y la hora calculada
          const scheduleDate = new Date(day);
          scheduleDate.setHours(current.getHours());
          scheduleDate.setMinutes(current.getMinutes());
  
          const schedule = {
            date: scheduleDate, // Usar la fecha y hora correcta para cada día
            start_hour: formattedHour,
            available: true,
            nutri_id: userId
          };
  
          bulkSchedules.push(schedule);
        }
      }
  
      // Llamada para crear horarios en lote
      await axios.post(`${import.meta.env.VITE_API_URL}/nutriSchedule/bulk`, bulkSchedules);
      fetchApoints(); // Refresca las horas en la vista
      toast.success("Horas creadas exitosamente.");
    } catch (error) {
      console.error('Error al crear las horas:', error);
      
      toast.error("Error al crear las horas.");
    }
  };

  return (
    <div className=" flex">
      <SideMenu />
      <div className="flex flex-col flex-1">
        <div className="flex justify-between pl-6 text-center items-center">
          <div className="flex justify-center items-center">
            <img src={NutriImage} className="w-10" alt="NutriIcon" />
            <h1 className="text-2xl font-semibold px-2 py-4">
              Administracion de Horas Nutricionales
            </h1>
          </div>
          <div className="flex pr-10">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={() => setIsBulkModalOpen(true)}
            >
              Crear Horas Rápidamente
            </button>
          </div>
        </div>
        <div className="h-full flex justify-evenly pt-5 bg-slate-100">
          <NutriPanel
            userId={userId}
            fetchApoints={fetchApoints}
            apoints={apoints}
            setApoints={setApoints}
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
          />
        </div>
      </div>
      {isBulkModalOpen && (
        <CreateMultiHoursModal
          onClose={() => setIsBulkModalOpen(false)}
          onSubmit={handleBulkSubmit}
        />
      )}
    </div>
  );
};

export default NutriMenu;