import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import TodayIcon from '@mui/icons-material/Today';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import HiveIcon from '@mui/icons-material/Hive';
import RunCircleIcon from '@mui/icons-material/RunCircle';
import './css/ProfileNavBar.css';


export const NavBarAdmin = () => {
  const navigate = useNavigate();

  const goto = (url) => {
    navigate(`/${url}`); 
  };

  return (
    <div className="navbar z-10 fixed bottom-0 overflow-x-auto whitespace-nowrap scrollbar-hide shadow-inner">
      <Disclosure as="nav">
        <div>
          <div className="relative flex h-16 items-center justify-evenly gap-5 px-4">
            <div className="ButtonNavBar">
              <button
                type="button"
                onClick={() => goto('Admin/Clases')}
                className="relative rounded-full text-gray-400 hover:text-white"
              >
                <TodayIcon />
                <h3>Clases</h3>
              </button>
            </div>

            <div className="ButtonNavBar">
              <button
                type="button"
                onClick={() => goto('Admin/Usuarios')} 
                className="relative rounded-full text-gray-400 hover:text-white"
              >
                <span className="absolute -inset-1.5" />
                <PersonIcon />
                <h3>Usuarios</h3>
              </button>
            </div>
            <div className="ButtonNavBar">
              <button
                type="button"
                onClick={() => goto('Admin/Planes')} 
                className="relative rounded-full text-gray-400 hover:text-white"
              >
                <span className="absolute -inset-1.5" />
                <FitnessCenterIcon />
                <h3>Planes</h3>
              </button>
            </div>
            <div className="ButtonNavBar">
              <button
                type="button"
                onClick={() => goto('Admin')} 
                className="relative rounded-full text-gray-400 hover:text-white" >
                <FavoriteIcon />
                <h3>Consultas</h3>
              </button>
            </div>
            <div className="ButtonNavBar">
              <button
                type="button"
                onClick={() => goto('Admin/Ejercicios')} 
                className="relative rounded-full text-gray-400 hover:text-white"
              >
                <span className="absolute -inset-1.5" />
                <RunCircleIcon />
                <h3>Ejercicios</h3>
              </button>
            </div>
            
          </div>
        </div>
      </Disclosure>
    </div>
  );
};
