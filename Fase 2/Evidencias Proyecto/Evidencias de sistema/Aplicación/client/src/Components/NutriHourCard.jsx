import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const NutriHourCard = ({appointments,userId,setIsScheduled,scheduled,}) => {
  const { nutri_schedule_id, start_hour, date, available, client_id } = appointments;
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const navigate = useNavigate();

  const confirmModal = async () => {
    setIsOpenConfirm(!isOpenConfirm);
  };

  const fecha = new Date(date);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  let formattedDate = fecha.toLocaleDateString("es-ES", options);

  formattedDate =
    formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  const scheduleHour = async () => {

    const Navigate = () => {
        navigate("/", { state: { scrollToNutri: true } });
    };

    // if (userId) {
    //   try {
    //     const res = await fetch(
    //       `${import.meta.env.VITE_API_URL
    //       }/nutriScheduleClient/${nutri_schedule_id}`,
    //       {
    //         method: "PATCH",
    //         body: JSON.stringify({
    //           client_id: userId,
    //         }),
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //       }
    //     );

    //     if (res.ok) {
    //       toast.success("Hora añadida correctamente");
    //       setIsOpenConfirm(false); // Cierra el modal si es exitoso
    //       setIsScheduled(!scheduled);
    //     } else {
    //       toast.error("Error al agendar la hora");
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    Navigate("/")
  };

  const cancelHour = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL
        }/nutriScheduleClientcancel/${nutri_schedule_id}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            client_id: userId,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (res.ok) {
        toast.success("Hora Eliminada correctamente");
        setIsOpenConfirm(false); 
        setIsScheduled(!scheduled);
      } else {
        toast.error("Error al agendar la hora");
      }
    } catch (error) { 
      toast.error("Error al cancelar la hora");
    }
  };

  return (
    <div className="w-full bg-white text-black p-5 rounded-xl flex flex-col">
      <h1 className="text-button-primary font-bold">{start_hour}</h1>
      <div className="w-full flex mt-5 justify-start items-center text-center gap-1 font-semibold">
        <span>{`Disponible: `}</span>
        {available ? (
          <span>Disponible</span>
        ) : (
          <>
            {client_id === userId ? (
              <span className="text-green-600">Hora registrada por ti</span>
            ) : (
              <span className="text-red-600">No Disponible</span>
            )}
          </>
        )}
      </div>
      <div className="w-full flex justify-center items-center">
        {available ? (
          <button
            onClick={() => confirmModal()}
            className="bg-button-primary text-white rounded-full px-2 mt-2"
          >
            Reservar
          </button>
        ) : null}
        {client_id === userId ? (
          <button
            onClick={() => cancelHour()}
            className="bg-yellow-300 px-2 text-black font-medium rounded-full mt-2"
          >
            Cancelar Hora
          </button>
        ) : null}
      </div>
      {isOpenConfirm ? (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center px-6">
          <div className="bg-white py-5 rounded-xl">
            <h1 className="w-full text-center text-xl font-semibold">
              Agendar Hora
            </h1>
            <div className=" p-4 rounded-lg flex flex-col text-start font-semibold text-lg">
              <h1 className="text-button-primary">{start_hour}</h1>
              <h1 className="text-green-500">{formattedDate}</h1>
            </div>
            <div className="flex justify-around mt-4">
              <button
                onClick={() => scheduleHour()}
                className="bg-button-primary rounded-xl text-white w-1/3"
              >
                Confirmar
              </button>
              <button
                onClick={() => confirmModal()}
                className="bg-red-700 rounded-xl w-1/3 text-white"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
