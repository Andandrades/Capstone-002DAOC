import React from "react";
import { UserNavBar } from "../../Components/UserNavBar";
import "./ScheduleStyles.css"

export const ScheduleGym = () => {
  return (
    <>
      <section className="w-screen h-screen flex flex-col justify-start items-center bgImage">
            <div className="mt-14 z-10">
                <h1 className="text-4xl font-bold text-white">Horarios</h1>
            </div>
            <div className="flex justify-center items-center gap-10">
                <button>Mañana</button>
                <button>Tarde</button>
            </div>
      </section>
      <UserNavBar/>
    </>
  );
};
