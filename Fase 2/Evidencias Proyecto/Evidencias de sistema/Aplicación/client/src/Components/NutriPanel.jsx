import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import HeightIcon from "@mui/icons-material/Height";
import ScaleIcon from "@mui/icons-material/Scale";

export const NutriPanel = ({
  userId,
  fetchApoints,
  apoints,
  setIsModalOpen,
  isModalOpen,
  setApoints,
}) => {
  const [selectedHour, setSelectedHour] = useState(null);
  const [userData, setUserData] = useState({});
  const [isHourModalOpen, setIsHourModalOpen] = useState(false);
  const [confirmDeleteHour, setConfirmDeleteHour] = useState(false);

  const handleHourClick = async (info) => {
    setSelectedHour({
      title: info.event.title,
      start: info.event.start,
      end: info.event.end,
      id: info.event.id,
      extendedProps: info.event.extendedProps,
    });

    const clientId = info.event.extendedProps.client_id;

    if (!clientId) {
      setUserData(null);
      setIsHourModalOpen(true);
      return;
    }

    try {
      const respuesta = await axios.get(
        `${import.meta.env.VITE_API_URL}/userData/${clientId}`
      );
      setUserData(respuesta.data[0]);
    } catch (error) {
      console.error("Error al obtener datos de usuario:", error);
    }

    setIsHourModalOpen(true);
  };

  const [newApoint, setNewApoint] = useState({
    start_hour: "",
    available: true,
    nutri_id: "",
    date: "",
  });

  const [slotMinTime, setSlotMinTime] = useState("06:00"); // Hora mínima visible
  const [slotMaxTime, setSlotMaxTime] = useState("21:00"); // Hora máxima visible

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
        console.log(error);

        toast.error("Error al crear la consulta.");
      });
  };

  const handleCloseModal = async () => {
    setIsHourModalOpen(false);
    setConfirmDeleteHour(false);
  };

  const handleDeleteHour = async () => {
    try {
      const resultado = await axios.delete(
        `${import.meta.env.VITE_API_URL}/nutriSchedule/${selectedHour.id}`
      );

      toast.success("Hora eliminada exitosamente!");
      handleCloseModal();
      fetchApoints();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Panel de Nutricionista</h1>
      <div className="flex w-full justify-center gap-5">
        <div className="text-center">
          <h1>Hora Inicio</h1>
          <input
            type="time"
            id="time"
            className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"

            required
            value={slotMinTime}
            onChange={(e) => setSlotMinTime(e.target.value)}
          />
        </div>
        <div className="text-center">
          <h1>Hora fin</h1>
          <input
            type="time"
            id="time"
            className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "

            required
            value={slotMaxTime}
            onChange={(e) => setSlotMaxTime(e.target.value)}
          />
        </div>
      </div>
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        events={apoints}
        eventClick={handleHourClick}
        dateClick={handleDateClick}
        allDaySlot={false}
        slotLabelFormat={{
          hour: "2-digit",
          minute: "2-digit",
          omitZeroMinute: false,
          hour12: false,
        }}
        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          omitZeroMinute: false,
          hour12: false,
        }}
        editable={true} // Habilita drag-and-drop
        slotMinTime={slotMinTime} //  inicio de la hora de visualización
        slotMaxTime={slotMaxTime} // el final de la hora de visualización
        eventDrop={async (info) => {
          // Captura la nueva información del evento
          const { id, start } = info.event;
          const newDate = start.toISOString().split("T")[0];
          const newTime = start.toTimeString().split(" ")[0].slice(0, 5); // Formato HH:MM

          try {
            // Llamada al endpoint para actualizar el evento

            await axios.put(
              `${import.meta.env.VITE_API_URL}/nutriScheduleDrag/update`,
              {
                nutri_schedule_id: id,
                date: newDate,
                start_hour: newTime,
              }
            );
            toast.success("Evento actualizado correctamente");
          } catch (error) {
            toast.error("Error al actualizar el evento");
            console.error("Error:", error);
            // Revertir el cambio si hay un error
            info.revert();
          }
        }}
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
      {isHourModalOpen && (
        <div className="fixed z-20 inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white min-w-96 max-w-96 px-6 rounded-xl shadow-md ">
            <div className="flex justify-end pt-2">
              <HighlightOffIcon
                className="bg-blue-500 rounded-full cursor-pointer text-white"
                onClick={() => handleCloseModal()}
              />
            </div>
            <h2 className="text-xl font-medium mb-2">Detalles de la hora</h2>
            {selectedHour && (
              <div className="mb-2">
                <div className="flex justify-start items-center text-center gap-1 ">
                  <p>
                    <strong>Estado:</strong> {selectedHour.title}
                  </p>
                  {selectedHour.title === "Disponible" ? (
                    <CheckCircleIcon className="text-green-400" />
                  ) : (
                    <CancelIcon className="text-red-400" />
                  )}
                </div>

                <p>
                  <strong>Inicio:</strong> {selectedHour.start.toLocaleString()}
                </p>
                {selectedHour.end && (
                  <p>
                    <strong>Fin:</strong> {selectedHour.end.toLocaleString()}
                  </p>
                )}
              </div>
            )}
            {userData && userData.name ? (
              <div className="p-5 rounded-md  bg-slate-50">
                <h1 className="font-semibold ">{`Nombre usuario reserva:`}</h1>
                <h1>{`${userData.name}`}</h1>
                <div className="flex w-full justify-center gap-2 my-4">
                  {userData.height ? (
                    <div className="flex-1 rounded-md bg-blue-500 text-white h-32 py-2 flex justify-center items-center flex-col">
                      <div className="flex flex-row text-center items-center">
                        <HeightIcon />
                        <h1>{userData.height}CM</h1>
                      </div>
                      <h1>Estatura</h1>
                    </div>
                  ) : (
                    <div className="flex-1 rounded-md bg-blue-500 text-white h-32 py-2 flex justify-center items-center flex-col">
                      <div className="flex px-2 flex-row text-center items-center">
                        <HeightIcon />
                        <h1>Estatura no registrada</h1>
                      </div>
                    </div>
                  )}
                  {userData.weight ? (
                    <div className="flex-1 rounded-md bg-blue-500 text-white h-32 py-2 flex justify-center items-center flex-col">
                      <div className="flex flex-row text-center items-center justify-center">
                        <ScaleIcon />
                        <h1>{userData.weight}CM</h1>
                      </div>
                      <h1>Peso</h1>
                    </div>
                  ) : (
                    <div className="flex-1 rounded-md bg-blue-500 text-white h-32 py-2 flex justify-center items-center flex-col">
                      <div className="flex px-2 flex-row text-center items-center justify-center">
                        <ScaleIcon />
                        <h1>Peso no registrada</h1>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : null}
            {confirmDeleteHour ? (
              <div className="max-h-12 min-h-12">
                <h1 className="break-words text-red-700 text-center font-bold">
                  Esta seguro que quiere eliminar esta hora?
                </h1>
              </div>
            ) : null}
            <div className="w-full flex justify-evenly">
              {!confirmDeleteHour ? (
                <button
                  onClick={() => setConfirmDeleteHour(true)}
                  className="bg-red-500 px-4 text-white py-2 rounded mt-4 mb-5"
                >
                  Eliminar Hora
                </button>
              ) : (
                <div className="w-full flex justify-evenly">
                  <button
                    onClick={() => handleDeleteHour()}
                    className="bg-red-500 px-4 text-white py-2 rounded mt-4 mb-5"
                  >
                    Eliminar
                  </button>
                  <button
                    onClick={() => setConfirmDeleteHour(false)}
                    className="bg-blue-500 px-4 text-white py-2 rounded mt-4 mb-5"
                  >
                    Cancelar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
