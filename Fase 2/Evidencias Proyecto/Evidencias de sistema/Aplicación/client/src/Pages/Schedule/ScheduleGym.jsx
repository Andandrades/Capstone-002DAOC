import { useState, useEffect } from "react";
import { UserNavBar } from "../../Components/UserNavBar";
import { GymHourCard } from "../../Components/GymHourCard";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

import "./ScheduleStyles.css";
import "./SelectDayButton.css";
import Spinner from "../../Components/Spinner";

const ScheduleGym = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);

  const [scheduleInfo, setScheduleInfo] = useState("");
  const [currentDay, setCurrentDay] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const days = ["D", "L", "M", "X", "J", "V", "S"];
  const todayIndex = new Date().getDay();
  const today = days[todayIndex];

  const todayDate = new Date()

  const toggleList = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setCurrentDay(today);
    fetchGymHours({ day: today });
  }, [today]);

  const handleDateChange = (selectedDate) => {
    const formattedDate = selectedDate.toISOString().split("T")[0];
    setSelectedDate(selectedDate); 
    fetchGymHours({ date: formattedDate });
    setIsDateOpen(false); // Cierra el DayPicker después de seleccionar una fecha
  };

  const fetchGymHours = async ({ day, date }) => {
    setLoading(true);
    try {
      let url;

      // Verifica si se ha proporcionado un día
      if (day) {
        url = `${import.meta.env.VITE_API_URL}/gymHoursDay/${day}`;
      }
      // Verifica si se ha proporcionado una fecha
      else if (date) {
        url = `${import.meta.env.VITE_API_URL}/gymHoursDate/${date}`;
      } else {
        throw new Error("Debe proporcionar un día o una fecha");
      }

      const response = await fetch(url, { credentials: "include" });
      if (!response.ok) {
        throw new Error("Error al obtener las horas");
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        const sortedData = data.sort((a, b) => {
          const timeA = new Date(`1970-01-01T${a.start_hour}`).getTime();
          const timeB = new Date(`1970-01-01T${b.start_hour}`).getTime();
          return timeA - timeB;
        });
  
        setScheduleInfo(sortedData);
      } else {
        setScheduleInfo(data);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
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
            <div className="w-full flex gap-4 justify-center">
              <button
                onClick={toggleList}
                className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
              >
                Seleccionar Día
              </button>
              <div className="">
                <button
                  onClick={() => setIsDateOpen(true)}
                  className="px-4 py-2 text-white  bg-blue-500 hover:bg-blue-600 focus:outline-none"
                >
                  Seleccionar Fecha
                </button>
              </div>
            </div>

            {isOpen && (
              <div className="days-list w-full">
                <div className="flex flex-row p-2 w-full justify-center items-center bg-white border border-gray-300 rounded-b shadow-lg">
                  {days.map((day, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        fetchGymHours({ day }); // Llamar a la función al hacer clic
                        setCurrentDay(day); // Actualizar el día actual
                        setIsOpen(false); // Cerrar la lista al seleccionar
                      }}
                      className={`py-2 px-4 cursor-pointer ${
                        currentDay === day
                          ? "bg-blue-300"
                          : "bg-blue-100 hover:bg-blue-200"
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
        {loading ? (
          <div className="relative flex justify-center items-center min-h-[200px]">
            <Spinner />
          </div>
        ) : (
          <>
            <div className="w-full mb-32 px-6 z-10 h-full">
              <div className="w-full h-full flex flex-col">
                {scheduleInfo.length > 0 ? (
                  scheduleInfo.map((hour) => (
                    <GymHourCard key={hour.gym_schedule_id} schedule={hour} />
                  ))
                ) : (
                  <div className="w-full bg-white mt-5 p-5 rounded flex justify-center items-center gap-8">
                    <HelpOutlineIcon
                      sx={{ fill: "#f1c21b", width: "40px", height: "40px" }}
                    />
                    <p className="font-semibold text-gray-500">
                      No se encuentran horas registradas para este día
                    </p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
        {isDateOpen ? (
          <div className="fixed inset-0 px-6 bg-black bg-opacity-50 flex justify-center items-center z-30">
            <DayPicker
              selected={selectedDate}
              className="mt-2 p-2 border border-gray-300 bg-white relative rounded"
              fromDate={todayDate}
              mode="single"
              onDayClick={handleDateChange}
            />
          </div>
        ) : null}
        <UserNavBar />
      </section>
    </>
  );
};

export default ScheduleGym;
