import { useState } from "react";

export const ExerciseHistory = ({ infoClass,setIsOpen }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleString("es-CL", options);
  };

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-full">
      <div
        onClick={toggleAccordion}
        className="w-full flex justify-between items-center h-20 bg-white rounded-xl cursor-pointer"
      >
        <div className="justify-start w-[5%] h-full pl-3 py-1 flex-col bg-button-primary rounded-l-xl"></div>
        <div className="flex flex-col justify-start">
          <h1 className="font-semibold ml-3 capitalize">
            {formatDate(infoClass.created_date)}
          </h1>
          <h1 className="font-semibold ml-3 text-button-primary">
            {infoClass.start_hour}
          </h1>
        </div>
        <div className="flex flex-1 pr-5 justify-end items-center rounded-r-xl">
          <h2 className="text-orange-500">Piernas</h2>
        </div>
      </div>

      <div
        className={`transition-all duration-300 overflow-hidden mb-3 ${
          isExpanded ? "max-h-[300px] p-4" : "max-h-0"
        } bg-gray-50 rounded-b-xl`}
      >
        <div className="flex  justify-start flex-col">
          <h1>Ejercicios realizados: {infoClass.exercises.length}</h1>
          <p className="flex gap-1">
            Enfoque muscular:
            {infoClass.target ? (
              <p className="text-orange-500">{infoClass.target}</p>
            ) : (
              <p className="text-orange-500">Sin Definir</p>
            )}
          </p>
            <button onClick={() => setIsOpen(true)} className="bg-button-primary text-white py-2 rounded-md mt-2">Más Información</button>
        </div>
      </div>
    </div>
  );
};
