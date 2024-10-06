import React from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import HouseIcon from '@mui/icons-material/House';
import TodayIcon from '@mui/icons-material/Today';
import PersonIcon from '@mui/icons-material/Person';
import "./css/ProfileNavBar.css";

export const ProfileNavBar = () => {



  return (

    <div className="navbar">
      <Disclosure as="nav" >
        <div >
          <div className="relative flex h-16 items-center ">

            <div className="ButtonNavBar" >
              <button type="button"
              className="relative rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-1 focus:ring-white  focus:ring-offset-gray-800" >
                <HouseIcon />
              </button>
              <h3>Menu</h3>
            </div>

            <div className="ButtonNavBar" >
              <button type="button" 
              className="relative rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-1 focus:ring-white  focus:ring-offset-gray-800" >
                <TodayIcon />
              </button>
              <h3>Agendar</h3>
            </div>

            <div className="ButtonNavBar" >
              <button type="button" 
              className="relative rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-1 focus:ring-white  focus:ring-offset-gray-800" >
                <span className="absolute -inset-1.5" />
                <FitnessCenterIcon />
              </button>
              <h3>Mis clases</h3>
            </div>


            {/* Informacion del perfil */}
            <div className="ButtonNavBar" >
              <Menu as="div" >
                <div>
                  <MenuButton 
              className="relative rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-1 focus:ring-white  focus:ring-offset-gray-800" >                  
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Abrir menu de usuario</span>
                    <PersonIcon />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <MenuItem>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                      Tu perfil
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                      Cerrar sesión
                    </a>
                  </MenuItem>
                </MenuItems>
              </Menu>
              <h3>Perfil</h3>

            </div>
            {/* termino informacion del perfil */}
          </div>

        </div>

      </Disclosure>
    </div>
  )
}




