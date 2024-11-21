import React from "react";

const PopularExerciseCard = ({ exercise, index }) => {
  return (
    <div className="flex bg-slate-100 flex-col rounded-xl shadow-md justify-center p-6 items-center ">
      <div>
        <h1 className="text-xl py-3 uppercase text-slate-600 font-bold">Top {index + 1}</h1>
      </div>
      <div className=" flex flex-col text-start justify-center rounded-b-xl bg-blue-600 text-white">
        <img src={exercise.image} alt="" />
        <div className="py-5  px-3">
          <h1 className="text-2xl">{exercise.exercise_name}</h1>
          <p className="text-base text-gray-300">Enfoque: {exercise.target}</p>
          <p className="text-base text-gray-300">Registros: {exercise.popularity}</p>
        </div>
      </div>
    </div>
  );
};

export default PopularExerciseCard;
