import React from "react";
import { UserNavBar } from "../../Components/UserNavBar";
import Barbell from "../../assets/icons/Barbell.svg";
import Apple from '../../assets/icons/apple.svg'
import { useNavigate } from "react-router-dom";

export const SchedulePage = () => {

  const navigate = useNavigate();

  return (
    <>
      <section className="w-full h-screen flex justify-center relative flex-col">
        <div className="w-full flex py-5 justify-center top-0 absolute">
          <h1 className="text-2xl font-bold">Tipo de hora</h1>
        </div>

        <div className="px-4 w-full flex items-center gap-10 justify-center flex-col">
          <div onClick={() => navigate("/schedule/gym")} className="w-full flex justify-center bg-[#FA6A6A] rounded-3xl hover:scale-105 transition-all ease-in-out">
            <div className="bg-[#2D2D2D] w-[20%] py-3 px-1  flex justify-center rounded-l-3xl">
              <img src={Barbell} className="w-16" alt="" />
            </div>
            <div className="w-[80%] flex items-center justify-center">
              <h1 className="font-bold text-2xl pr-5">Gimnasio</h1>
            </div>
          </div>
          <div className="w-full flex justify-center bg-[#9DFB8E] rounded-3xl hover:scale-105 transition-all ease-in-out">
            <div className="bg-[#67B488] w-[20%] py-3 px-1  flex justify-center rounded-l-3xl ">
              <img src={Apple} className="w-16" alt="" />
            </div>
            <div className="w-[80%] flex items-center justify-center">
              <h1 className="font-bold text-2xl pr-5">Nutricionista</h1>
            </div>
          </div>
        </div>
      </section>
      <UserNavBar />
    </>
  );
};
