import React from "react";
import { UserNavBar } from "../../Components/UserNavBar";
import LockIcon from '@mui/icons-material/Lock';
import userIcon from "../../assets/img/userIcon.webp";
import "./ProfileStyle.css"

export const ProfilePage = () => {
  return (
    <div className="genericocontainer h-screen flex flex-col justify-between">
      <section className="backgroundPrimary w-full flex flex-col items-center  h-full">
        <div className="w-full flex justify-center items-center pt-10 pb-10">
          <h1 className="text-3xl font-bold">Mi perfil</h1>
        </div>
        <form className="my-form">
          <div className="ProfilePhoto">
            <img src={userIcon} alt="" />
            <p>nombre de ejemplo</p>
            <button type="button" className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              cambiar
            </button>
          </div>
          <div className="profileLabel">
            <label className="block text-sm font-medium leading-6 text-gray-900">Edad</label>
            <div className="mt-2">
              <input type="date" name="birthdate" id="birthdate" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 " />
            </div>

            <label className="block text-sm font-medium leading-6 text-gray-900">Genero</label>
            <div className="mt-2">
              <select id="country" name="country" autoComplete="country-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                <option>Masculino</option>
                <option>Femenino</option>
                <option>Prefiero no decirlo</option>
              </select>
            </div>

            <label className="block text-sm font-medium leading-6 text-gray-900">Peso</label>
            <div className="mt-2">
              <input type="text" name="weight" id="weight" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 " />
            </div>

            <label className="block text-sm font-medium leading-6 text-gray-900">Correo electronico</label>
            <div className="mt-2">
              <input type="text" name="last-name" id="last-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 " />
            </div>

            <label className="block text-sm font-medium leading-6 text-gray-900">Contraseña</label>
            <div className="relative mt-2">
              <input type="password" name="first-name" id="password" autoComplete="given-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"><LockIcon /></div>
            </div>

            <div className="profileLabel">
              <label className="block text-sm font-medium leading-6 text-gray-900">Comfirmar contraseña</label>
              <div className="relative mt-2">
                <input type="confirm-password" name="first-name" id="confirm-password" autoComplete="given-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"><LockIcon /></div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button type="cancel" className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white">Cancelar</button>
              <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white">Confirmar</button>
            </div>

          </div>

        </form>
      </section>

      <UserNavBar />
    </div>
  );
}
