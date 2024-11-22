import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import "../Pages/Nutri/NutriMenu.css";
import "react-day-picker/style.css";
import {useNavigate} from 'react-router-dom';

export const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className={[
        "h-min-[100%] z-50 flex flex-col min-w-20 overflow-x-hidden bg-blue-500 transition-all ease-in-out duration-[250]",
        `${isOpen ? "w-72" : "w-20"}`,
      ].join(" ")}
    >
      <div className="w-full flex justify-end">
        <label className="scale-50" htmlFor="check">
          <input
            onClick={() => setIsOpen(!isOpen)}
            type="checkbox"
            id="check"
          />
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>
      <div className=" px-6">
        <div className="py-10 text-center">
          <ul
            className={[
              "transition ease-in-out duration-200 flex flex-col gap-4",
              `${isOpen ? "opacity-100" : "opacity-0"}`,
            ].join(" ")}
          >
            <li onClick={() => navigate('/consultasnutricionales')} className="bg-slate-50 w-full cursor-pointer py-2">Crear Horas</li>
            <li onClick={() => navigate('/consultasnutricionales/profile')} className="bg-slate-50 w-full cursor-pointer py-2">Mi perfil</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
