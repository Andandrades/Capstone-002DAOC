import React from 'react';
import { Menu} from '@headlessui/react'
import { useNavigate } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import TodayIcon from '@mui/icons-material/Today';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import RunCircleIcon from '@mui/icons-material/RunCircle';
import './css/ProfileNavBar.css';
import { Logout } from './API/sesion';
import { useUser } from './API/UserContext';


export const NavBarAdmin = () => {
  const navigate = useNavigate();
  const { userData,fetchAuthData } = useUser();
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
    <div className="navbar z-10 fixed  shadow-inner">
     <Disclosure as="nav">
        <div className="relative flex h-16 items-center justify-around">
          <div className="flex flex-col items-center text-gray-400 hover:text-white">
            <button
              type="button"
              onClick={() => goto('Admin/Clases')}
              className="flex flex-col items-center gap-1"
            >
              <TodayIcon />
              <h3 className="text-xs">Clases</h3>
            </button>
          </div>

          <div className="flex flex-col items-center text-gray-400 hover:text-white">
            <button
              type="button"
              onClick={() => goto('Admin/Usuarios')}
              className="flex flex-col items-center gap-1"
            >
              <PersonIcon />
              <h3 className="text-xs">Usuarios</h3>
            </button>
          </div>

          <div className="flex flex-col items-center text-gray-400 hover:text-white">
            <button
              type="button"
              onClick={() => goto('Admin/Planes')}
              className="flex flex-col items-center gap-1"
            >
              <FitnessCenterIcon />
              <h3 className="text-xs">Planes</h3>
            </button>
          </div>

          <div className="flex flex-col items-center text-gray-400 hover:text-white">
            <button
              type="button"
              onClick={() => goto('Admin')}
              className="flex flex-col items-center gap-1"
            >
              <FavoriteIcon />
              <h3 className="text-xs">Consultas</h3>
            </button>
          </div>

          <div className="flex flex-col items-center text-gray-400 hover:text-white">
            <button
              type="button"
              onClick={() => goto('Admin/Ejercicios')}
              className="flex flex-col items-center gap-1"
            >
              <RunCircleIcon />
              <h3 className="text-xs">Ejercicios</h3>
            </button>
          </div>

          <div className="flex flex-col items-center text-gray-400 hover:text-white">
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button type="button" className="flex flex-col items-center gap-1" >
                <PersonIcon />
                <h3 className="text-xs">Perfil</h3>
              </Menu.Button>

              <Menu.Items className="absolute right-0 bottom-full mb-2 w-32 origin-bottom-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                          onClick={() => goto('admin/ganancias')}
                        >
                          Ganancias
                        </span>
                      ) : null
                    )}
                  </Menu.Item>

                  <Menu.Item >
                    {({ active }) => (
                      <span 
                      className={`${active ? 'bg-blue-500 text-white' : 'text-gray-900'} group flex rounded-md items-center w-full px-2 py-2 text-sm cursor-pointer`}
                      onClick={() =>LogoutSesion()}>
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
