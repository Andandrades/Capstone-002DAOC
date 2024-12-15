import React from 'react';
import { Menu } from '@headlessui/react'
import { useNavigate } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import TodayIcon from '@mui/icons-material/Today';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import RunCircleIcon from '@mui/icons-material/RunCircle';
import { Logout } from './API/sesion';
import { useUser } from './API/UserContext';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Logo from "../assets/img/Logo.png";

const AdminSideMenu = () => {
  const navigate = useNavigate();
  const { userData, fetchAuthData } = useUser();
  const RoleCliente = 1;

  const goto = (url) => {
    navigate(`/${url}`);
  };

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
    <div className="bg-[#1C1C1C] z-10 min-w-60 min-h-screen h-full px-2 shadow-inner">
      <Disclosure as="menu">
        <div className="flex flex-col items-center justify-center  w-64 p-6">
          <img src={Logo} alt="Logo" className="w-32 h-32 mb-4"  onClick={() => goto("")}/>
          <h1 className="text-center text-2xl font-bold text-gray-400">Soldado Gym</h1>
        </div>
        <div className="relative flex min-h-screen w-full flex-col items-center justify-start gap-2  pt-10">
          <div className="flex flex-col pl-2 items-start py-3 w-full text-gray-400 hover:text-white hover:bg-[#272727] transition-all ease-in-out">
            <button
              type="button"
              onClick={() => goto('Admin/Clases')}
              className="flex items-center w-full gap-1"
            >
              <TodayIcon />
              <h3 className="text-base">Clases</h3>
            </button>
          </div>

          <div className="flex flex-col pl-2 items-start py-3 w-full text-gray-400 hover:text-white hover:bg-[#272727] transition-all ease-in-out">
            <button
              type="button"
              onClick={() => goto('Admin/Usuarios')}
              className="flex w-full items-center gap-1"
            >
              <PersonIcon />
              <h3 className="text-base">Usuarios</h3>
            </button>
          </div>

          <div className="flex flex-col pl-2 items-start py-3 text-gray-400 hover:text-white w-full hover:bg-[#272727] transition-all ease-in-out">
            <button
              type="button"
              onClick={() => goto('Admin/Planes')}
              className="flex w-full items-center gap-1"
            >
              <FitnessCenterIcon />
              <h3 className="text-base">Planes</h3>
            </button>
          </div>

          <div className="flex flex-col pl-2 items-start py-3 text-gray-400 hover:text-white w-full hover:bg-[#272727] transition-all ease-in-out">
            <button
              type="button"
              onClick={() => goto('Admin')}
              className="flex  w-full  items-center gap-1"
            >
              <FavoriteIcon />
              <h3 className="text-base">Consultas</h3>
            </button>
          </div>

          <div className="flex flex-col pl-2 items-start py-3 text-gray-400 hover:text-white w-full hover:bg-[#272727] transition-all ease-in-out">
            <button
              type="button"
              onClick={() => goto('Admin/Ejercicios')}
              className="flex  w-full  items-center gap-1"
            >
              <RunCircleIcon />
              <h3 className="text-base">Ejercicios</h3>
            </button>
          </div>
          <div className="flex flex-col pl-2 items-start py-3 text-gray-400 active:bg-slate-100 hover:text-white w-full hover:bg-[#272727] transition-all ease-in-out">
            <button
              type="button"
              onClick={() => goto('admin/AdminDashboard')}
              className="flex  w-full  items-center gap-1"
            >
              <DashboardIcon />
              <h3 className="text-base">Dashboard</h3>
            </button>
          </div>

          <div className="flex flex-col pl-2 items-start py-3 text-gray-400 hover:text-white w-full hover:bg-[#272727] transition-all ease-in-out">
            <Menu as="div" className="relative  w-full inline-block text-left">
              <Menu.Button type="button" className="flex items-center w-full gap-1" >
                <PersonIcon />
                <h3 className="text-base">Perfil</h3>
              </Menu.Button>

              <Menu.Items className="absolute right-[-50] bottom-[-100] mb-2 w-32 bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        className={`${active ? 'bg-blue-500 text-white' : 'text-gray-900'} group flex rounded-md items-center w-full px-2 py-2 text-sm cursor-pointer`}
                        onClick={() => goto('profile')}>
                        Ver mi perfil
                      </a>
                    )}
                  </Menu.Item>

                  <Menu.Item as="a">
                    {({ active }) => (
                      userData.role !== RoleCliente ? (
                        <span
                          className={`${active ? 'bg-blue-500 text-white' : 'text-gray-900'} group flex rounded-md items-center w-full px-2 py-2 text-sm cursor-pointer`}
                          onClick={() => goto('admin')}
                        >
                          Menú de administrador
                        </span>
                      ) : null
                    )}
                  </Menu.Item>
                  <Menu.Item as="a">
                    {({ active }) => (
                      userData.role !== RoleCliente ? (
                        <span
                          className={`${active ? 'bg-blue-500 text-white' : 'text-gray-900'} group flex rounded-md items-center w-full px-2 py-2 text-sm cursor-pointer`}
                          onClick={() => goto('admin/AdminDashboard')}
                        >
                          Dashboard
                        </span>
                      ) : null
                    )}
                  </Menu.Item>

                  <Menu.Item >
                    {({ active }) => (
                      <span
                        className={`${active ? 'bg-blue-500 text-white' : 'text-gray-900'} group flex rounded-md items-center w-full px-2 py-2 text-sm cursor-pointer`}
                        onClick={() => LogoutSesion()}>
                        Cerrar sesión
                      </span>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Menu>
          </div>

        </div>
      </Disclosure>
    </div>
  );
};

export default AdminSideMenu