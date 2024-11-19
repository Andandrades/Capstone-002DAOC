import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import TodayIcon from '@mui/icons-material/Today';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
//import HiveIcon from '@mui/icons-material/Hive';
import RunCircleIcon from '@mui/icons-material/RunCircle';
import './css/ProfileNavBar.css';


export const NavBarAdmin = () => {
  const navigate = useNavigate();

  const goto = (url) => {
    navigate(`/${url}`); 
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
        </div>
      </Disclosure>
    </div>
  );
};
