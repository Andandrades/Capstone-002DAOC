import { useState } from "react";
import ProfileImage from "./ProfileImage";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchOffIcon from '@mui/icons-material/SearchOff';

export const ExerciseHistory = ({ infoClass, userData  }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

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
          <button
            onClick={() => setIsOpen(true)}
            className="bg-button-primary text-white py-2 rounded-md mt-2"
          >
            Más Información
          </button>
        </div>
      </div>

      {isOpen ? (
        <div className="fixed inset-0 bg-black px-6 bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-slate-100 w-full max-h-[70%] min-h-[70%] rounded-md shadow-lg overflow-y-scroll pb-10">
            <div className="w-full flex justify-end px-4 py-4">
              <button onClick={() => setIsOpen(false)}>
                <CancelIcon className="text-blue-500" />
              </button>
            </div>
            <div className="w-full flex justify-center flex-col items-center pb-2 gap-2">
              <ProfileImage width={"100px"} height={"100px"} />
              <h1 className="font-semibold text-xl">{userData.name}</h1>
            </div>
            <div>
              <h1 className="font-semibold text-blue-500 text-center">
                Ejercicios de la clase {formatDate(infoClass.created_date)}
              </h1>
            </div>
            <div>
              <div className="px-4 flex flex-col pt-3 gap-2">
                {infoClass.exercises.length > 0
                  ? infoClass.exercises.map((exercise, index) => (
                      <div
                        key={index}
                        className="w-full bg-slate-200 p-5 rounded-md"
                      >
                        <div key={exercise.exercise_id} className="">
                          <h2 className="text-xl w-full font-semibold text-gray-500">
                            Ejercicio {index + 1}
                          </h2>
                          <div className="w-full">
                            <h1 className="text-blue-500 text-xl font-semibold ">
                              {exercise.exercise_name}
                            </h1>
                          </div>
                          <div className="w-full pt-5">
                            <h1 className="text-slate-800 font-medium flex gap-1">
                              Enfoque:{" "}
                              <p className="text-blue-500">{exercise.target}</p>{" "}
                            </h1>
                          </div>
                          <div className="w-full">
                            <h1 className="text-slate-800 font-medium flex gap-1">
                              Máquina:{" "}
                              <p className="text-blue-500">
                                {exercise.machine}
                              </p>{" "}
                            </h1>
                          </div>

                          <div className=" flex items-center py-4 text-center gap-1">
                            <h1 className="text-slate-800 font-medium flex">
                              Peso:{" "}
                              <p className="text-blue-500">
                                {exercise.weight} KG
                              </p>
                            </h1>
                            <FitnessCenterIcon
                              className="text-blue-500"
                              sx={{ fontSize: "25px" }}
                            />
                          </div>
                          <div className="w-full flex flex-col gap-1 justify-evenly">
                            <div className="flex items-center text-center gap-1">
                              <h1 className="text-slate-800 font-medium flex">
                                Sets:{" "}
                                <p className="text-blue-500">{exercise.sets}</p>
                              </h1>
                            </div>
                            <div className="flex items-center text-center gap-1">
                              <h1 className="text-slate-800 font-medium flex">
                                Repeticiones:
                                <p className="text-blue-500">
                                  {exercise.repetitions}
                                </p>
                              </h1>
                            </div>
                            <div className="flex items-center text-center gap-1">
                              <h1 className="text-slate-800 font-medium flex">
                                Repeticiones totales:
                                <p className="text-blue-500">
                                  {exercise.total_reps}
                                </p>
                              </h1>
                            </div>
                          </div>
                          <div className="flex flex-col pt-5 gap-1">
                            <h1 className="text-slate-800 font-medium flex">
                              Observación:
                            </h1>
                            <p className="text-blue-500">{exercise.notes}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  : (
                    <div className="flex flex-col justify-center items-center text-center pt-7">
                      <SearchOffIcon className="text-slate-500" sx={{width : "100px" , height : "100px"}}/>
                      <h1>No se encuentran clases registradas para esta clase</h1>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
