import { useState } from "react";
import { UserNavBar } from "../../Components/UserNavBar";
import "./ScheduleStyles.css";
import "./SelectDayButton.css"; // Asegúrate de crear este archivo CSS

export const ScheduleGym = () => {
  const [isOpen, setIsOpen] = useState(false);

  const days = ["L", "M", "M", "J", "V", "S", "D"];

  const toggleList = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <section className="w-screen h-screen flex flex-col justify-start items-center bgImage">
        <div className="mt-14 z-10">
          <h1 className="text-4xl font-bold text-white">Horarios</h1>
        </div>
        <div className="z-10 w-full px-6">
          <div className="flex justify-center items-center gap-10 bg-bg-primary mt-10 px-4 py-2 rounded-full">
            <button className="bg-[#EFDD37] w-[50%] rounded-full">
              Mañana
            </button>
            <button className="bg-[#3F159A] w-[50%] rounded-full text-white">
              Tarde
            </button>
          </div>
        </div>
        <div className="w-full px-6 z-10 mt-6">
          <div className="relative w-full inline-block">
            <button
              onClick={toggleList}
              className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
            >
              Seleccionar Día
            </button>
            {isOpen && (
              <div className="days-list w-full">
                <div className="flex flex-row space-x-2 p-2 w-full justify-center items-center bg-white border border-gray-300 rounded-b shadow-lg">
                  {days.map((day, index) => (
                    <div
                      key={index}
                      className="py-2 px-4 bg-blue-100 rounded hover:bg-blue-200 cursor-pointer"
                    >
                      {day}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-full px-6 z-10 h-full">
            <div className=" w-full h-full  bg-white ">

            </div>
        </div>
      </section>
      <UserNavBar />
    </>
  );
};
