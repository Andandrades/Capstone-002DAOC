import { useState, useEffect } from "react";
import { NavBarAdmin } from "../../../Components/NavBarAdmin";
import axios from "axios";
import CopyClassesModal from "../../../Components/CopyClassesModal";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { GymHourCard } from "../../../Components/GymHourCard";
//DayPicker
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export const AdminClasses = () => {
  const [schedueInfo, setScheduleInfo] = useState([]);

  const [day, setDay] = useState("X");
  const [dayModal, setDayModal] = useState();
  const [date, setDate] = useState(new Date());
  const [createModal, setCreateModal] = useState(false);

  const days = [
    {
      days: [
        { id: "L", dia: "Lunes" },
        { id: "M", dia: "Martes" },
        { id: "X", dia: "Miercoles" },
        { id: "J", dia: "Jueves" },
        { id: "V", dia: "Viernes" },
        { id: "S", dia: "Sabado" },
      ],
    },
  ];

  // Función para obtener las horas del gimnasio para el día seleccionado
  const fetchGymHours = async (day) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/gymHoursDay/${day}`
      );
      if (!response.ok) {
        throw new Error("Error al obtener las horas");
      }
      const data = await response.json();
      setScheduleInfo(data); // Guardar los datos en el estado
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchGymHours(day);
    console.log(schedueInfo);
  }, []);

  const openModalDays = async () => {
    setDayModal(!dayModal);
  };

  const handleDateSelect = (selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
      setDayModal(false);
    }
  };

  return (
    <>
      <div className="w-full h-screen flex justify-start relative flex-col">
        <div className="w-full text-2xl font-semibold flex justify-center py-10">
          <h1>Administrar Clases</h1>
        </div>
        <div className="flex justify-end px-6">
          <button onClick={() => setCreateModal(true)} className="w-auto">
            <AddCircleIcon
              sx={{ color: "#4B69FE", height: "40px", width: "40px" }}
            />
          </button>
        </div>
        <div className="px-6">
          <button
            onClick={() => openModalDays()}
            className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
          >
            Seleccionar Día
          </button>
        </div>
        {schedueInfo.length > 0 ? (
          schedueInfo.map((schedue) => (
            <GymHourCard key={schedue.gym_schedule_id} schedule={schedue} />
          ))
        ) : (
          <h1>No se encuentran clases</h1>
        )}

        {/*<CopyClassesModal originalDay={day} />*/}
        {dayModal ? (
          <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="bg-white p-3 rounded-lg">
              <div className="w-full flex justify-end">
                <HighlightOffIcon
                  className="text-black cursor-pointer"
                  onClick={() => openModalDays()}
                ></HighlightOffIcon>
              </div>
              <DayPicker
                showOutsideDays
                className="text-black scale-90"
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
              />
            </div>
          </div>
        ) : null}

        {createModal ? (
          <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="bg-white w-[90%] p-3 rounded-lg">
              <div className="w-full flex justify-end">
                <HighlightOffIcon
                  className="text-black cursor-pointer"
                  onClick={() => setCreateModal(false)}
                ></HighlightOffIcon>
              </div>
              <h1 className="font-semibold text-2xl">Crear Clase</h1>

            </div>
          </div>
        ) : null}
      </div>

      <NavBarAdmin />
    </>
  );
};
