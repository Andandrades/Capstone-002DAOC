import LockIcon from '@mui/icons-material/Lock';
import React from "react";
import userIcon from "../../assets/img/userIcon.webp";
import { Logout } from "../../Components/API/sesion";
import { useUser } from "../../Components/API/UserContext";
import { UserNavBar } from "../../Components/UserNavBar";

const ProfilePage = () => {
  const { userData } = useUser();

  const LogoutSesion = () => {
    Logout();
    window.location.reload();
  };

  return (
    <div className=" pb-10 ">
      <section className="w-full flex flex-col items-center pb-10  rounded-b-3xl shadow-lg">
        <h1 className="text-4xl font-bold text-white mb-6">Mi Perfil</h1>

        <form className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-xl space-y-6 border-2">
          <div className="flex flex-col items-center mb-6">
            <img src={userIcon} alt="Foto de perfil" className="w-24 h-24 rounded-full object-cover ring-4 ring-indigo-500" />
            <p className="text-gray-900 mt-2 text-lg font-medium">{userData.name}</p>
            <button
              type="button"
              className="mt-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-indigo-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-indigo-50 transition-all">
              Cambiar foto
            </button>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col">
              <label htmlFor="birthdate" className="text-sm font-medium text-gray-700">Edad</label>
              <input
                type="date"
                name="birthdate"
                id="birthdate"
                className="text-sm font-medium text-gray-700 bg-indigo-100 border-2  p-2 rounded-md"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="gender" className="text-sm font-medium text-gray-700">Género</label>
              <select
                id="gender"
                name="gender"
                autoComplete="gender"
                className="text-sm font-medium text-gray-700 bg-indigo-100 border-2 p-2 rounded-md"
              >
                <option>Masculino</option>
                <option>Femenino</option>
                <option>Prefiero no decirlo</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="weight" className="text-sm font-medium text-gray-700">Peso</label>
              <input
                type="text"
                name="weight"
                id="weight"
                className="text-sm font-medium text-gray-700 bg-indigo-100 border-2 p-2 rounded-md"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">Correo electrónico</label>
              <input
                type="email"
                name="email"
                id="email"
                className="text-sm font-medium text-gray-700 bg-indigo-100 border-2 p-2 rounded-md"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">Contraseña</label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  className="block w-full rounded-md  py-2 px-4 bg-indigo-100 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <LockIcon />
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="confirm-password" className="text-sm font-medium text-gray-700">Confirmar contraseña</label>
              <div className="relative">
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  autoComplete="current-password"
                  className="block w-full rounded-md  py-2 px-4 bg-indigo-100 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <LockIcon />
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-around gap-x-6">
              <button
                type="reset"
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:outline-none">
                Cancelar
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none">
                Confirmar
              </button>
            </div>
          </div>
        </form>

        <button
          className="mt-6 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none" onClick={LogoutSesion} >
          Cerrar sesión
        </button>
      </section>
      <UserNavBar />
    </div>
  );
}

export default ProfilePage;
