import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import HouseIcon from '@mui/icons-material/House';
import TodayIcon from '@mui/icons-material/Today';
import PersonIcon from '@mui/icons-material/Person';

export const UserNavBar = () => {
  const navigate = useNavigate();

  const goto = (url) => {
    navigate(`/${url}`);
  };

  return (
    <div className="fixed bottom-0 w-full bg-[#1C1C1C] shadow-inner z-10">
      <Disclosure as="nav">
        <div className="relative flex items-center justify-around p-3">
          <div className="flex flex-col items-center text-gray-400 hover:text-white">
            <button
              type="button"
              onClick={() => goto('Inicio')}
              className="flex flex-col items-center gap-1"
            >
              <HouseIcon />
              <h3 className="text-xs">Menu</h3>
            </button>
          </div>

          <div className="flex flex-col items-center text-gray-400 hover:text-white">
            <button
              type="button"
              onClick={() => goto('schedule')}
              className="flex flex-col items-center gap-1"
            >
              <TodayIcon />
              <h3 className="text-xs">Agendar</h3>
            </button>
          </div>

          <div className="flex flex-col items-center text-gray-400 hover:text-white">
            <button
              type="button"
              onClick={() => goto('classes')}
              className="flex flex-col items-center gap-1"
            >
              <FitnessCenterIcon />
              <h3 className="text-xs">Mis clases</h3>
            </button>
          </div>

          <div className="flex flex-col items-center text-gray-400 hover:text-white">
            <button
              type="button"
              onClick={() => goto('profile')}
              className="flex flex-col items-center gap-1"
            >
              <PersonIcon />
              <h3 className="text-xs">Perfil</h3>
            </button>
          </div>
        </div>
      </Disclosure>
    </div>
  );
};
