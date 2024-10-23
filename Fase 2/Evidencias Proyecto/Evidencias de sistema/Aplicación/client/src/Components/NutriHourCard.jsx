import React from "react";

export const NutriHourCard = ({ appointments }) => {
  const { start_hour, date, available } = appointments;
  return (
    <div className="w-full bg-white text-black p-5 rounded-xl flex flex-col">
      <h1 className="text-button-primary font-bold">{start_hour}</h1>
      <div className="w-full flex mt-5 justify-start items-center text-center gap-1 font-semibold">
        <span>{`Disponible: `}</span>
        {available ? (
          <span>Disponible</span>
        ) : (
          <span className="text-red-600">No Disponible</span>
        )}
      </div>
      <div className="w-full flex justify-center items-center">
        {available ? (
          <button className="bg-button-primary text-white rounded-full mt-2">
            Reservar
          </button>
        ) : (
          <button className="bg-red-600 text-white rounded-full mt-2">
            No disponible
          </button>
        )}
      </div>
    </div>
  );
};
