import { useEffect, useState } from "react";
import { NavBarAdmin } from "../../../Components/NavBarAdmin";
import { toast } from "react-toastify";
import axios from "axios";

import PopularExerciseCard from "../../../Components/PopularExerciseCard";

const AdminExercisesMain = () => {
  const [top, setTop] = useState(5);

  const [popularExercises, setPopularExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPopularExercises = async (selectedTop) => {
    try {
      const resultado = await axios.get(
        `${import.meta.env.VITE_API_URL}/ExercisesTop`,
        { params: { top: selectedTop } }
      );

      setPopularExercises(resultado.data);
      setLoading(false);
    } catch (error) {
      toast.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularExercises(top);
  }, [top]);


  return (
    <>
      <div className="min-h-screen bg-slate-200 flex flex-col justify-start">
        <div className="flex justify-center pt-14">
          <h1 className="font-semibold text-2xl">Ejercicios</h1>
        </div>
        <div className=" w-full py-4 px-6 text-center font-medium text-gray-500">
          {top === 1 ? (
            <h1>Ejercicio mas popular</h1>
          ) : (
            <h1>Los {top} mas populares</h1>
          )}
        </div>

        {!loading ? (
          <div className="px-6 flex justify-start w-full gap-10 pt- items-center flex-col pb-40">
            {popularExercises.map((exer , index) => (
              <PopularExerciseCard key={index} exercise={exer} index={index}/> 
            ))}
          </div>
        ) : null}
      </div>
      <NavBarAdmin />
    </>
  );
};

export default AdminExercisesMain;
