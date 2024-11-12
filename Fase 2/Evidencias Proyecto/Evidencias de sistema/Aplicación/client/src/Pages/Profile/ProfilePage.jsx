import React from "react";
import userIcon from "../../assets/img/userIcon.webp";
import { Logout } from "../../Components/API/sesion";
import { useUser } from "../../Components/API/UserContext";
import { UserNavBar } from "../../Components/UserNavBar";
import EditIcon from '@mui/icons-material/Edit'; // Importamos el ícono de lápiz (editar)

const ProfilePage = () => {
  const { userData } = useUser();

  const LogoutSesion = () => {
    Logout();
    window.location.reload();
  };

  return (
    <div className="pb-10  flex justify-center bg-[radial-gradient(circle, rgb(255, 255, 255) 8%, rgb(177, 174, 174) 100%)]" >
      <section className="w-11/12 flex flex-col items-center pb-10 rounded-b-3xl shadow-lg ">
        <form className="w-full max-w-2xl bg-white rounded-lg  pt-8 space-y-6 border-2">
          <h1 className="text-4xl font-bold text-black text-center mb-6">Mi Perfil</h1>

          <div className="flex flex-col items-center mb-6 relative">
            <img
              src={userIcon}
              alt="Foto de perfil"
              className="w-24 h-24 rounded-full object-cover ring-4 ring-black"
            />
            <button
              type="button"
              className="absolute top-0 right-0 bg-white p-2 rounded-full shadow-md"
            >
              <EditIcon style={{ fontSize: 20, color: '#4c6ef5' }} /> {/* Ícono de lápiz */}
            </button>
          </div>
          <p className="text-gray-900 mt-2 text-lg font-medium text-center">{userData.name}</p>

          <div className="space-y-6">
            {/* <div className="flex flex-col">
              <label htmlFor="birthdate" className="text-sm font-medium text-gray-700">
                Fecha de nacimiento
              </label>
              <input
                type="date"
                name="birthdate"
                id="birthdate"
                className="text-sm font-medium text-gray-700 bg-indigo-100 border-2 p-2 rounded-md"
              />
            </div> */}

            <div className="flex flex-col">
              <label htmlFor="gender" className="text-sm font-medium text-gray-700">
                Género
              </label>
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
              <label htmlFor="weight" className="text-sm font-medium text-gray-700">
                Peso
              </label>
              <input
                type="text"
                name="weight"
                id="weight"
                value={userData.weith}
                className="text-sm font-medium text-gray-700 bg-indigo-100 border-2 p-2 rounded-md"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="text-sm font-medium text-gray-700 bg-indigo-100 border-2 p-2 rounded-md"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  className="block w-full rounded-md py-2 px-4 bg-indigo-100 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="confirm-password" className="text-sm font-medium text-gray-700">
                Confirmar contraseña
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  autoComplete="current-password"
                  className="block w-full rounded-md py-2 px-4 bg-indigo-100 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-around gap-x-6 pb-8">
              <button
                type="reset"
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:outline-none"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                Confirmar
              </button>
            </div>
          </div>

        </form>

        <button
          className="mt-6 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white justify-center hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          onClick={LogoutSesion}
        >
          Cerrar sesión
        </button>
      </section>
      <UserNavBar />
    </div>
  );
};

export default ProfilePage;
