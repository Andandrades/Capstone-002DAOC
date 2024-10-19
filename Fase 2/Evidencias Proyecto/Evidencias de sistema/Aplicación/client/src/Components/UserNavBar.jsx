import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import HouseIcon from '@mui/icons-material/House';
import TodayIcon from '@mui/icons-material/Today';
import PersonIcon from '@mui/icons-material/Person';
import './css/ProfileNavBar.css';

export const UserNavBar = () => {
  const navigate = useNavigate();

  const goto = (url) => {
    navigate(`/${url}`); 
  };

  return (
    <div className="navbar z-10 fixed bottom-0">
      <Disclosure as="nav">
        <div>
          <div className="relative flex h-16 items-center">
            <div className="ButtonNavBar">
              <button
                type="button"
                onClick={() => goto('Inicio')} 
                className="relative rounded-full text-gray-400 hover:text-white" >
                <HouseIcon />
                <h3>Menu</h3>
              </button>
            </div>

            <div className="ButtonNavBar">
              <button
                type="button"
                onClick={() => goto('schedule')}
                className="relative rounded-full text-gray-400 hover:text-white"
              >
                <TodayIcon />
                <h3>Agendar</h3>
              </button>
            </div>

            <div className="ButtonNavBar">
              <button
                type="button"
                onClick={() => goto('classes')} 
                className="relative rounded-full text-gray-400 hover:text-white"
              >
                <span className="absolute -inset-1.5" />
                <FitnessCenterIcon />
                <h3>Mis clases</h3>
              </button>
            </div>

            <div className="ButtonNavBar">
              <button
                type="button"
                onClick={() => goto('profile')} 
                className="relative rounded-full text-gray-400 hover:text-white"
              >
                <span className="absolute -inset-1.5" />
                <PersonIcon />
                <h3>Perfil</h3>
              </button>
            </div>
          </div>
        </div>
      </Disclosure>
    </div>
  );
};
