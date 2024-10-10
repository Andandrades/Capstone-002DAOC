import React from "react";
import { UserNavBar } from "../../Components/UserNavBar";
import LockIcon from '@mui/icons-material/Lock';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EmailIcon from '@mui/icons-material/Email';
import userIcon from "../../assets/img/userIcon.webp";
import "./ProfileStyle.css"

export const ProfilePage = () => {
  return (

    <div className="body">
      <div className="genericocontainer">
        <form>
          <div >
            <div className="ProfilePhoto">
              <img src={userIcon} alt="" />
              <span>nombre de ejemplo</span>
              <button
                type="button"
                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                cambiar
              </button>
            </div>
          </div>
          <div className="profileslables">
            <div className="profileLabel">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Correo</label>
              <div className="relative mt-2">
                <input type="email" name="email" id="email" autoComplete="email"
                  className="block w-full pl-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Tu correo electrónico" />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EmailIcon />
                </div>
              </div>
            </div>
            <div className="profileLabel">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Edad</label>
              <div className="relative mt-3">
                <input type="email" name="email" id="email" autoComplete="email"
                  className="block w-full pl-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="ingresa tu edad" />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CalendarMonthIcon />
                </div>
              </div>
            </div>
            <div className="profileLabel">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Constraseña</label>
              <div className="relative mt-2">
                <input type="email" name="email" id="email" autoComplete="email"
                  className="block w-full pl-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="ingresa una contraseña" />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancelar</button>
            <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline
             focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Confirmar</button>
          </div>
        </form>
      </div>
      <UserNavBar />
    </div>

  );
}


