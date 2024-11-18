import { useState, useEffect } from "react";
import { UserNavBar } from "../../Components/UserNavBar";
import { GymHourCard } from "../../Components/GymHourCard";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import "./ScheduleStyles.css";
import "./SelectDayButton.css";

const ScheduleGym = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scheduleInfo, setScheduleInfo] = useState("");
  const [currentDay, setCurrentDay] = useState("");
  const days = ["D", "L", "M", "X", "J", "V", "S"];
  const todayIndex = new Date().getDay();
  const today = days[todayIndex];

  const toggleList = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setCurrentDay(today);
    fetchGymHours(today);
  }, []);

  const fetchGymHours = async (day) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/gymHoursDay/${day}`);
      if (!response.ok) {
        throw new Error("Error al obtener las horas");
      }
      const data = await response.json();
      setScheduleInfo(data); // Guardar los datos en el estado
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <section className="w-screen flex flex-col justify-start items-center bgImage">
        <div className="mt-14 z-10">
          <h1 className="text-4xl font-bold text-white">Horarios</h1>
        </div>
        <div className="w-full px-6 z-10 mt-6">
          <div className="relative w-full inline-block">
            <button
              onClick={toggleList}
              className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
            >
              Seleccionar Día
            </button>
            {isOpen && (
              <div className="days-list w-full">
                <div className="flex flex-row p-2 w-full justify-center items-center bg-white border border-gray-300 rounded-b shadow-lg">
                  {days.map((day, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        fetchGymHours(day); // Llamar a la función al hacer clic
                        setCurrentDay(day); // Actualizar el día actual
                        setIsOpen(false); // Cerrar la lista al seleccionar
                      }}
                      className={`py-2 px-4 cursor-pointer ${currentDay === day ? "bg-blue-300" : "bg-blue-100 hover:bg-blue-200"
                        }`}
                    >
                      {day}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-full mb-32 px-6 z-10 h-full">
          <div className="w-full h-full flex flex-col">
            {scheduleInfo.length > 0 ? (
              scheduleInfo.map((hour) => (
                <GymHourCard key={hour.gym_schedule_id} schedule={hour} />
              ))
            ) : (
              <div className="w-full bg-white mt-5 p-5 rounded flex justify-center items-center gap-8">
                <HelpOutlineIcon sx={{ fill: "#f1c21b", width: "40px", height: "40px" }} />
                <p className="font-semibold text-gray-500">
                  No se encuentran horas registradas para este día
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
      <UserNavBar />
    </>
  );
};

export default ScheduleGym;
