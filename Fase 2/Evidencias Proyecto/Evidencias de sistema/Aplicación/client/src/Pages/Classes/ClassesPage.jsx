import React, { useEffect, useState } from "react";
import { UserNavBar } from "../../Components/UserNavBar";
import "../../Components/css/BackgroundRadius.css";
import { ExerciseHistory } from "../../Components/ExerciseHistory";
import { ClassesCard } from "../../Components/ClassesCard";
import axios from "axios";
import ProfileImage from "../../Components/ProfileImage";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import CancelIcon from "@mui/icons-material/Cancel";

const ClassesPage = ({ userData }) => {
  const [classes, setClasses] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const fetchClasses = async () => {
    const resultado = await axios.get(
      `${import.meta.env.VITE_API_URL}/userRecords/${userData.id}`
    );

    if (resultado.status === 200) {
      setClasses(resultado.data);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      weekday: "long", // Día de la semana (Lunes, Martes...)
      month: "long", // Mes (Enero, Febrero...)
      day: "numeric", // Día
    };
    return date.toLocaleString("es-CL", options);
  };

  return (
    <>
      <section
        className="bg-[radial-gradient(circle, rgb(255, 255, 255) 8%, rgb(177, 174, 174) 100%)] 
      backgroundPrimary w-full flex justify-start py-10 flex-col px-4 backgroundPrimary min-h-[100vh] pb-28 "
      >
        <div className="w-full flex justify-center items-center">
          <h1 className="text-2xl font-bold  mb-10">Historial de clases</h1>
        </div>
        <ClassesCard routine={classes[0]} setIsOpen={setIsOpen} />
        <h1 className="text-2xl font-semibold text-gray-700 mt-5 mb-2">
          Historial de clases
        </h1>
        {classes.length > 1
          ? classes.map((prevClass) => (
              <ExerciseHistory infoClass={prevClass} key={prevClass.class_id} />
            ))
          : null}

        {isOpen ? (
          <div className="fixed inset-0 bg-black px-6 bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="bg-slate-100 w-full max-h-[70%] min-h-[70%] rounded-md shadow-lg overflow-y-scroll pb-10">
              <div className="w-full flex justify-end px-4 py-4">
                <button onClick={() => setIsOpen(false)}><CancelIcon className="text-blue-500"/></button>
              </div>
              <div className="w-full flex justify-center flex-col items-center pb-2 gap-2">
                <ProfileImage width={"100px"} height={"100px"} />
                <h1 className="font-semibold text-xl">{userData.name}</h1>
              </div>
              <div>
                <h1 className="font-semibold text-blue-500 text-center">
                  Ejercicios de la clase {formatDate(classes[0].created_date)}
                </h1>
              </div>
              <div>
                <div className="px-4 flex flex-col pt-3 gap-2">
                  {classes[0].exercises.length > 0
                    ? classes[0].exercises.map((exercise, index) => (
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
                                <p className="text-blue-500">
                                  {exercise.target}
                                </p>{" "}
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
                                  <p className="text-blue-500">
                                    {exercise.sets}
                                  </p>
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
                    : null}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </section>
      <UserNavBar />
    </>
  );
};

export default ClassesPage;
