import React from "react";
import weightlift from "../assets/icons/weightlift.ico";
import Plus from "../assets/Plus.svg";

export const ClassesCard = ({ routine }) => {
  //Obtener Dia de consulta en español
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      weekday: "long", // Día de la semana (Lunes, Martes...)
      month: "long",   // Mes (Enero, Febrero...)
      day: "numeric",  // Día
    };
    return date.toLocaleString("es-CL", options);
  };

  // Formatear horas en formato de 12 horas con AM/PM
  const formatHour = (hour) => {
    const date = new Date(`1970-01-01T${hour}`);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="w-full">
      <div className=" flex flex-col relative bg-white px-4 py-6 rounded-lg text-[20px]">
        {routine ? (
          <>
            <h1 className="mb-3">Ultima clase</h1>
            <div className="h-[3px] rounded-full w-full bg-button-primary mb-3"></div>
            <p className="font-semibold capitalize text-indigo-500">
              {formatDate(routine.created_date)}
            </p>
            <p className="font-semibold capitalize text-indigo-500">{formatHour(routine.start_hour)}</p>
            <ul className="px-2">
              <li className="flex justify-start gap-2 items-center">
                {" "}
                <img src={weightlift} alt="" className="w-[34px]" />{" "}
                <p>Ejercicios realizados: </p>
                <p className="text-orange-500">{routine.exercises.length}</p>
              </li>
              <li className="flex justify-start gap-2 items-center">
                {" "}
                <img src={Plus} alt="" /> <p>Enfoque muscular: </p>
                {routine.target ? (
                    <p className="text-orange-500">{routine.target}</p>
                ) : <p className="text-orange-500">0</p> }
              </li>
            </ul>
            <button className="w-full bg-button-primary mt-5 py-2 rounded-lg">
              <p className="text-white">Más Información</p>
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
};
