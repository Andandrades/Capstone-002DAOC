import { useState, useEffect } from "react";
import { NavBarAdmin } from "../../../Components/NavBarAdmin";
import axios from "axios";
import CopyClassesModal from "../../../Components/CopyClassesModal";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

export const AdminClasses = () => {
  const [schedueInfo, setScheduleInfo] = useState([]);
  const [day, setDay] = useState("J");
  const [dayModal, setDayModal] = useState();

  const days = ["L", "M", "X", "J", "V", "S", "D"];

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
  }, []);

  const openModalDays = async () => {
    setDayModal(!dayModal);
  };

  return (
    <>
      <div className="w-full h-screen flex justify-start relative flex-col">
        <div className="w-full text-2xl font-semibold flex justify-center py-10">
          <h1>Administrar Clases</h1>
        </div>
        <div className="px-6">
          <button
            onClick={() => openModalDays()}
            className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
          >
            Seleccionar Día
          </button>
        </div>
        {/*<CopyClassesModal originalDay={day} />*/}
        {dayModal ? (
          <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="bg-white p-3">
              <div className="w-full flex justify-end">
                <HighlightOffIcon
                  className="text-black cursor-pointer"
                  onClick={() => openModalDays()}
                ></HighlightOffIcon>
              </div>
              {days.map()}
            </div>
          </div>
        ) : null}
      </div>

      <NavBarAdmin />
    </>
  );
};
