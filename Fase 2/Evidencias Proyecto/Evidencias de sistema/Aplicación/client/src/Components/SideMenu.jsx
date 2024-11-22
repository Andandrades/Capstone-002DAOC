import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import "../Pages/Nutri/NutriMenu.css";
import "react-day-picker/style.css";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

import { Logout } from './API/sesion';
import { useUser } from './API/UserContext';


export const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const { userData ,fetchAuthData} = useUser();

  const LogoutSesion = async () => {
    try {
      await Logout();
      await fetchAuthData();
      goto()
    } catch (error) {
      console.error("Error en el proceso de cierre de sesión:");
    }
  };


  return (
    <div
      className={[
        "h-min-screen top-0 left-0 relative z-50 flex flex-col min-w-20 overflow-x-hidden bg-blue-500 transition-all ease-in-out duration-[250]",
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
            <li
              onClick={() => navigate("/consultasnutricionales")}
              className="bg-slate-50 w-full cursor-pointer py-2"
            >
              Crear Horas
            </li>
            <li
              onClick={() => navigate("/consultasnutricionales/profile")}
              className="bg-slate-50 w-full cursor-pointer py-2"
            >
              Mi perfil
            </li>
            <button
              onClick={() => LogoutSesion()}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              <LogoutIcon />
              <span>Cerrar sesion</span>
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
};
