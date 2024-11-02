import { useEffect, useState } from "react";
import User from "../assets/User.svg";
import Clock from "../assets/Clock.svg";
import Certificate from "../assets/Verified.svg";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { DayPicker } from "react-day-picker";
export const GymHourEditCard = ({ schedule }) => {
  const {
    gym_schedule_id,
    start_hour,
    end_hour,
    max_cap,
    actual_cap,
    schedule_date,
  } = schedule;

  const [isModalOpen, setIsModalOpen] = useState(false); //Estado Modal
  const [scheduledUsers, setScheduledUsers] = useState([]);
  const [reservation, setReservation] = useState(null);
  const [userId, setUserId] = useState("");
  const [classId, setClassId] = useState({});
  const [editModal, setEditModal] = useState(false);

  //Funcion para cambiar el estado del Modal


  useEffect(() => {
    getUserId();
  }, []);

  const getUserId = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/checkauth`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      setUserId(data.userId); // Esto disparará el segundo useEffect cuando userId se actualice
    } catch (error) {
      console.log(error);
    }
  };



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
    const date = new Date(`1970-01-01T${hour}Z`);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Función para calcular duracion de clase
  const calculateDuration = (start, end) => {
    const startDate = new Date(`1970-01-01T${start}Z`);
    const endDate = new Date(`1970-01-01T${end}Z`);

    const durationMs = endDate - startDate; // Diferencia en milisegundos
    const minutes = Math.floor(durationMs / 1000 / 60); // Convertir milisegundos a minutos
    const hours = Math.floor(minutes / 60); // Calcular horas
    const remainingMinutes = minutes % 60; // Calcular los minutos restantes

    // Retornar la duración en formato 'X horas Y minutos'
    return `${hours > 0 ? hours + "h " : ""}${remainingMinutes > 0 ? remainingMinutes + "min" : ""
      }`;
  };

  //Funcion para eliminar hora
  const eliminateClass = async () => {
    const resultado = await fetch(
      `${import.meta.env.VITE_API_URL}/scheduleHour/${classId}`,
      { method: "DELETE" }
    );
    if (resultado.ok) {
      setReservation(false);
      fetchScheduledUsers();
      setClassId(null); // Limpia el classId ya que la reserva ha sido eliminada
      console.log("Hora eliminada");
    }
  };

  //Fuincion para agendar hora
  const scheduleHour = async () => {
    const resultado = await fetch(
      `${import.meta.env.VITE_API_URL}/scheduleHour`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Especifica que el contenido es JSON
        },
        body: JSON.stringify({
          // Convierte el objeto en una cadena JSON
          gym_schedule_id: gym_schedule_id,
          client_id: userId,
        }),
      }
    );

    if (resultado.ok) {
      const data = await resultado.json();
      setReservation(true); // Cambiar a estado reservado
      setClassId(data.class_id); // Guardamos el nuevo classId cuando se agende la hora
      fetchScheduledUsers(); // Actualizar usuarios agendados
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
    <div className="mt-10 pb-3 bg-white rounded-lg">
      <div className="w-full pt-3 flex justify-start text-start px-5">
        <h1 className="text-[#3936C1] font-bold">{`${formatHour(
          start_hour
        )} - ${formatHour(end_hour)}`}</h1>
      </div>
      <div className="w-full flex pt-3 justify-around">
        <div className="flex gap-1 justify-center items-center flex-col">
          <img className="w-6" src={User} alt="" />
          <p className="text-[13px] font-semibold">{max_cap} cupos</p>
        </div>
        <div className="flex gap-1 justify-center items-center flex-col">
          <img className="w-6" src={Clock} alt="" />
          <p className="text-[13px] font-semibold">{`Duración: ${calculateDuration(
            start_hour,
            end_hour
          )}`}</p>
        </div>
        <div className="flex gap-1 justify-center items-center flex-col">
          <img className="w-6" src={Certificate} alt="" />
          <p className="text-[13px] font-semibold">{`${actual_cap} Reservas`}</p>
        </div>
      </div>
      <div

        className="w-full flex mt-5 justify-center items-center"
      >
        <div className="w-full flex justify-center items-center gap-4 px-4">
          <button className="bg-[#FCDE3B] font-medium rounded-full w-1/2" onClick={() => setEditModal(true)}>
            Editar
          </button>
          <button className="bg-red-500 text-white font-medium rounded-full w-1/2">
            Eliminar
          </button>
        </div>

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
      ) : null}

    </div>
  );
};
