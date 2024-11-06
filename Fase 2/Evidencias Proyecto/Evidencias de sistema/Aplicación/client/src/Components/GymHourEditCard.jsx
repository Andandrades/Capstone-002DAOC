import { useEffect, useState } from "react";
import User from "../assets/User.svg";
import Clock from "../assets/Clock.svg";
import Certificate from "../assets/Verified.svg";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { DayPicker } from "react-day-picker";
import InfoIcon from "@mui/icons-material/Info";
import { toast } from "react-toastify";

export const GymHourEditCard = ({ schedule, refreshGymHours }) => {
  const {
    gym_schedule_id,
    start_hour: ogStarHour,
    end_hour: ogEndHour,
    max_cap: ogMaxCap,
    actual_cap,
    schedule_date: ogScheduleDate,
  } = schedule;

  const [isModalOpen, setIsModalOpen] = useState(false); //Estado Modal
  const [scheduledUsers, setScheduledUsers] = useState([]);
  const [editModal, setEditModal] = useState(false);

  const [startHour, setStartHour] = useState(ogStarHour);
  const [endHour, setEndHour] = useState(ogEndHour);
  const [maxCap, setMaxCap] = useState(ogMaxCap);
  const [scheduleDate, setScheduleDate] = useState(ogScheduleDate);

  //Funcion para cambiar el estado del Modal

  const fetchScheduledUsers = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/scheduleinfo/${gym_schedule_id}`
      );
      if (!response.ok) {
        throw new Error("Error al obtener los usuarios agendados");
      }
      const data = await response.json();
      setScheduledUsers(data);
    } catch (error) {
      console.error("Error fetching scheduled users:", error);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      fetchScheduledUsers(); // Llama a la API cuando el modal se abre
      document.body.style.overflow = "hidden"; // Desactivamos el scroll
    } else {
      document.body.style.overflow = "auto"; // Volver el scroll a la normalidad al cerrar el modal
    }
  }, [isModalOpen, gym_schedule_id]);

  // Formatear horas en formato de 12 horas con AM/PM
  const formatHour = (hour) => {
    const date = new Date(`1970-01-01T${hour}`);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Función para calcular duracion de clase
  const calculateDuration = (start, end) => {
    const startDate = new Date(`1970-01-01T${start}`);
    const endDate = new Date(`1970-01-01T${end}`);

    const durationMs = endDate - startDate; // Diferencia en milisegundos
    const minutes = Math.floor(durationMs / 1000 / 60); // Convertir milisegundos a minutos
    const hours = Math.floor(minutes / 60); // Calcular horas
    const remainingMinutes = minutes % 60; // Calcular los minutos restantes

    // Retornar la duración en formato 'X horas Y minutos'
    return `${hours > 0 ? hours + "h " : ""}${
      remainingMinutes > 0 ? remainingMinutes + "min" : ""
    }`;
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    if (maxCap < actual_cap) {
      toast.error(
        "Capacidad máxima no puede ser menor que la capacidad actual"
      );
      return;
    }

    const updatedData = {
      start_hour: startHour,
      end_hour: endHour,
      max_cap: maxCap,
      actual_cap,
      schedule_date: scheduleDate,
    };

    try {
      const respuesta = await fetch(
        `${import.meta.env.VITE_API_URL}/gymHours/${gym_schedule_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );

      if (respuesta.ok) {
        setEditModal(false);
        toast.success("Hora editada correctamente!");
        refreshGymHours();
      } else {
        toast.error("Se produjo un error al intentar editar la clase");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      // Desactivamos el scroll en el momento que se abre el modal
      document.body.style.overflow = "hidden";
    } else {
      // Volver el scroll a la normalidad al cerrar el modal
      document.body.style.overflow = "auto";
    }
  }, [isModalOpen, gym_schedule_id]);

  return (
    <div className="mt-10 pb-3 relative bg-white rounded-lg">
      <div className="w-full pt-3 flex justify-start text-start px-5">
        <h1 className="text-[#3936C1] font-bold">{`${formatHour(
          ogStarHour
        )} - ${formatHour(ogEndHour)}`}</h1>
      </div>
      <div className="w-full flex pt-3 justify-around">
        <div className="flex gap-1 justify-center items-center flex-col">
          <img className="w-6" src={User} alt="" />
          <p className="text-[13px] font-semibold">{ogMaxCap} cupos</p>
        </div>
        <div className="flex gap-1 justify-center items-center flex-col">
          <img className="w-6" src={Clock} alt="" />
          <p className="text-[13px] font-semibold">{`Duración: ${calculateDuration(
            ogStarHour,
            ogEndHour
          )}`}</p>
        </div>
        <div className="flex gap-1 justify-center items-center flex-col">
          <img className="w-6" src={Certificate} alt="" />
          <p className="text-[13px] font-semibold">{`${actual_cap} Reservas`}</p>
        </div>
      </div>
      <div className="w-full flex mt-5 justify-center items-center">
        <div className="w-full flex justify-center items-center gap-4 px-4">
          <button
            className="bg-[#FCDE3B] font-medium rounded-full w-1/2"
            onClick={() => setEditModal(true)}
          >
            Editar
          </button>
          <button className="bg-red-500 text-white font-medium rounded-full w-1/2">
            Eliminar
          </button>
        </div>
      </div>
      <div className="absolute bg-gray-700 rounded-full top-[-30px] right-[-12px] flex justify-center mt-5">
        <InfoIcon className="text-yellow-400" />
      </div>

      {editModal ? (
        <div className="fixed py-32 inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-white flex flex-col p-6 rounded-lg">
            <div className="flex justify-between items-center flex-row">
              <h1>Editar Hora</h1>
              <HighlightOffIcon
                className="text-black cursor-pointer"
                onClick={() => setEditModal(false)}
              ></HighlightOffIcon>
            </div>
            <form
              onSubmit={handleEdit}
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
                  value={startHour}
                  onChange={(e) => setStartHour(e.target.value)}
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
                  value={endHour}
                  onChange={(e) => setEndHour(e.target.value)}
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
                  required
                  value={maxCap}
                  onChange={(e) => setMaxCap(e.target.value)}
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
                <label> Capacidad Actual:</label>
                <label htmlFor="">{actual_cap}</label>
              </div>
              <div>
                <label
                  htmlFor="schedule_date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha Clase:
                </label>
                <div className="mt-1 relative max-w-xs mx-auto overflow-hidden rounded-md border border-gray-300 shadow-sm">
                  <DayPicker
                    mode="single"
                    className="absolute top-0 left-0 z-20"
                    selected={scheduleDate}
                    onSelect={(date) => setScheduleDate(date)} // Mantener el valor como objeto Date

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
      ) : null}
    </div>
  );
};
