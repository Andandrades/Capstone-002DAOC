import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { NavBarAdmin } from "../../../Components/NavBarAdmin";
import UsersProfilePicture from "../../../Components/UsersProfilePicture";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import AddExercise from "../../../Components/AddExercise";
import { toast } from "react-toastify";

import Spinner from "../../../Components/Spinner"
const AdminRoutines = () => {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [exercises, setExercises] = useState([]); // Ejercicios del historial
  const [exerciseHistory, setExerciseHistory] = useState({});

  const [isOpen, setIsOpen] = useState(false);

  const [loading, setLoading] = useState(true);

  const fetchExerciseHistory = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/ExercisesClass/${id}`
      );
      setExerciseHistory(response.data[0]);

      const userResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/userData/${response.data[0].user_id}`
      );

      setUserInfo(userResponse.data[0]);

      const exercisesResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/exercisebyHistory/${
          response.data[0].history_id
        }`
      );

      setExercises(exercisesResponse.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching exercise history:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExerciseHistory();
  }, [id]);

  //Formatear fecha para visualizarla de manera optima
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const formattedDate = formatDate(exerciseHistory.created_date);

  const handleAddExercise = async (exerciseData) => {
    try {
      const respuesta = await axios.post(
        `${import.meta.env.VITE_API_URL}/createExerciseRecords`,
        exerciseData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (respuesta.status === 200) {
        toast.success("Ejercicio agregado correctamente");
        fetchExerciseHistory();
        setIsOpen(false);
      }
    } catch (error) {

      console.log(error);

    }
  };

  return (
    <>
      {!loading ? (
        <div className="min-h-screen pt-6 mb-32 flex flex-col justify-start items-start px-6">
          <div className="w-full flex justify-center pt-5 flex-col items-center">
            <UsersProfilePicture
              userId={userInfo.id}
              width={"100px"}
              height={"100px"}
            />
            <span className="pt-5 text-2xl font-semibold text-blue-500 text-center">
              Rutina de {userInfo.name}
            </span>
          </div>
          <div className="w-full bg-slate-50 mt-3 rounded-lg p-4">
            <div className="pt-1">
              <h1 className="font-semibold text-xl text-blue-500">
                Ejercicios
              </h1>
            </div>
            <div className="">
              <h1 className="text-gray-500 font-medium">
                Fecha clase:{formattedDate}
              </h1>
            </div>
          </div>
          <div className="w-full flex items-center bg-gray-100 rounded-b-lg">
            <button
              onClick={() => setIsOpen(true)}
              className="bg-blue-500 w-full flex justify-center text-white py-5 items-center text-center"
            >
              <AddCircleIcon sx={{ fontSize: 30 }} /> Agregar Ejercicios
            </button>
          </div>
          {exercises.length > 0 ? (
            exercises.map((exercise, index) => (
              <div
                key={exercise.exercise_id}
                className="w-full flex-col bg-slate-100 flex justify-center p-6 mt-4 rounded-md"
              >
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
                    Enfoque: <p className="text-blue-500">{exercise.target}</p>{" "}
                  </h1>
                </div>
                <div className="w-full">
                  <h1 className="text-slate-800 font-medium flex gap-1">
                    Máquina: <p className="text-blue-500">{exercise.machine}</p>{" "}
                  </h1>
                </div>

                <div className=" flex items-center py-4 text-center gap-1">
                  <h1 className="text-slate-800 font-medium flex">
                    Peso: <p className="text-blue-500">{exercise.weight} KG</p>
                  </h1>
                  <FitnessCenterIcon
                    className="text-blue-500"
                    sx={{ fontSize: "25px" }}
                  />
                </div>
                <div className="w-full flex flex-col gap-1 justify-evenly">
                  <div className="flex items-center text-center gap-1">
                    <h1 className="text-slate-800 font-medium flex">
                      Sets: <p className="text-blue-500">{exercise.sets}</p>
                    </h1>
                  </div>
                  <div className="flex items-center text-center gap-1">
                    <h1 className="text-slate-800 font-medium flex">
                      Repeticiones:
                      <p className="text-blue-500">{exercise.repetitions}</p>
                    </h1>
                  </div>
                  <div className="flex items-center text-center gap-1">
                    <h1 className="text-slate-800 font-medium flex">
                      Repeticiones totales:
                      <p className="text-blue-500">{exercise.total_reps}</p>
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
            ))
          ) : (
            <div className="p-6 flex justify-center items-center text-center bg-slate-100 w-full mt-2 rounded-md">
              <h1>Este Usuario no posee ejercicios</h1>
            </div>
          )}
          <AddExercise
            isOpen={isOpen}
            onSubmit={handleAddExercise}
            onClose={() => setIsOpen(false)}
            historyId={exerciseHistory.history_id}
          />
        </div>
      ) : (
        <Spinner/>
      )}

      <NavBarAdmin />
    </>
  );
};

export default AdminRoutines;
