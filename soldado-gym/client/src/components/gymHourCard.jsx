import { act, useEffect, useState } from "react";
import User from "../assets/User.svg";
import Clock from "../assets/Clock.svg";
import Certificate from "../assets/Verified.svg";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

export const GymHourCard = ({ schedule }) => {
  const {
    gym_schedule_id,
    start_hour,
    end_hour,
    max_cap,
    actual_cap,
    schedule_date,
  } = schedule;

  const [isModalOpen, setIsModalOpen] = useState(false); //Estado Modal
  const [isFull, setIsFull] = useState(false); // Verificar si la clase está llena al momento de agendar
  const [scheduledUsers, setScheduledUsers] = useState([]);
  const [userId, setUserId] = useState(null); //id del usuario el cual ingresa al sistema

  //Traer id de usuario
  useState(() => {
    const getUserId = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/checkauth`,
          { credentials: "include" }
        );
        const data = await response.json();
        setUserId(data.userId);
      } catch (error) {
        console.log("error al obtener datos", error);
      }
    };
    getUserId();
  }, []);

  useEffect(() => {
    if (actual_cap >= max_cap) {
      setIsFull(true);
    }
  }, [actual_cap, max_cap]);

  const reserveHour = async () => {
    if (actual_cap >= max_cap) {
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/schedule`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          scheduled_date: new Date(),
          actual_cap: actual_cap + 1,
          gym_schedule_id: gym_schedule_id,
          client_id: userId,
        }),
      });

      if (response.ok) {
        //Actualizar cacapidad actual
        await fetch(
          `${import.meta.env.VITE_API_URL}/gymHours/${gym_schedule_id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              actual_cap: actual_cap + 1, // Incrementamos la capacidad
            }),
          }
        );

        // Obtener el nombre del usuario
        const userResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/checkauth`,
          {
            credentials: "include",
          }
        );
        await fetchReservations()
      } else {
        console.log("Error al reservar hora");
      }
    } catch (error) {
      console.log("Error al reservar", error);
    }
  };

  //Funcion para cambiar el estado del Modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

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
    return `${hours > 0 ? hours + "h " : ""}${
      remainingMinutes > 0 ? remainingMinutes + "min" : ""
    }`;
  };

  // Asegúrate de que fetchReservations esté definida en tu componente
const fetchReservations = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/scheduleinfo/${gym_schedule_id}`
    );
    const data = await response.json();
    setScheduledUsers(data); // Guardar los usuarios en el estado
  } catch (error) {
    console.error("Error fetching reservations:", error);
  }
};

useEffect(() => {
  if (isModalOpen) {
    // Desactivamos el scroll en el momento que se abre el modal
    document.body.style.overflow = "hidden";
    fetchReservations(); // Llama a la función al abrir el modal
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
        onClick={toggleModal}
        className="w-full flex mt-5 justify-center items-center"
      >
        <button className="bg-[#FCDE3B] rounded-full w-1/2">Reservar</button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 px-6 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white flex justify-around flex-col w-full h-[70%] p-5 rounded-lg shadow-lg relative">
            <div className=" flex justify-center items-center flex-row">
              <div className="w-[90%] text-[#3936C1] font-bold">
                <p>{`${formatHour(start_hour)} - ${formatHour(end_hour)}`}</p>
              </div>
              <button className="w-[10%] text-lg" onClick={toggleModal}>
                <HighlightOffIcon sx={{ width: "30px", height: "30px" }} />
              </button>
            </div>
            <div className="bg-gray-300 rounded-md w-full my-6 h-[60%] overflow-auto">
              {scheduledUsers.length > 0 ? (
                scheduledUsers.map((reservation, index) => (
                  <div key={index} className="p-2 bg-white">
                    {reservation.client_name}
                  </div>
                ))
              ) : (
                <p>No hay reservas para esta clase.</p>
              )}
            </div>
            <div className="flex justify-around items-center">
              <div className="flex gap-1 justify-center items-center flex-col">
                <img className="w-6" src={User} alt="" />
                <p className="text-[12px] font-semibold">{max_cap} cupos</p>
              </div>
              <div className="flex gap-1 justify-center items-center flex-col">
                <img className="w-6" src={Clock} alt="" />
                <p className="text-[12px] font-semibold">{`Duración: ${calculateDuration(
                  start_hour,
                  end_hour
                )}`}</p>
              </div>
              <div className="flex gap-1 justify-center items-center flex-col">
                <img className="w-6" src={Certificate} alt="" />
                <p className="text-[12px] font-semibold">{`${actual_cap} Reservas`}</p>
              </div>
            </div>
            <div className="w-full flex justify-center items-center">
              <button
                className={`px-8 py-3 rounded-full font-medium ${
                  isFull ? "bg-red-600" : "bg-[#3936C1] text-white"
                }`}
                onClick={reserveHour}
                disabled={isFull}
              >
                {isFull ? "Hora llena" : "Reservar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
