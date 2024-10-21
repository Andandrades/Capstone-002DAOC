import React, { useState } from 'react';
import './AdminUsersManagement.css';
import SportsIcon from '@mui/icons-material/Sports'; // Icono para el menú de Entrenadores
import LocalDiningIcon from '@mui/icons-material/LocalDining'; // Icono para Nutricionistas
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike'; // Icono para Clientes
import FilterListIcon from '@mui/icons-material/FilterList'; // Icono de filtro
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'; // Nuevo ícono para Entrenadores
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew'; // Icono para los clientes
import { NavBarAdmin } from '../../../Components/NavBarAdmin';

const AdminUsersManagement = () => {
  const clients = ['Cliente 1', 'Cliente 2', 'Cliente 3'];
  const nutritionists = ['Nutricionista 1', 'Nutricionista 2'];
  const trainers = ['Entrenador 1', 'Entrenador 2', 'Entrenador 3'];

  const [showClients, setShowClients] = useState(false);
  const [showNutritionists, setShowNutritionists] = useState(false);
  const [showTrainers, setShowTrainers] = useState(false);

  return (
    <div className="roles-container">
      <h1 className="roles-title">Vista de Administración de Roles</h1>

      {/* Menú para Clientes */}
      <div className="roles-menu">
        <h2 onClick={() => setShowClients(!showClients)} className="roles-menuTitle">
          <DirectionsBikeIcon style={{ marginRight: '8px' }} />
          Clientes
          <div className="filter-icon">
            <FilterListIcon />
          </div>
        </h2>
        {showClients && (
          <ul className="roles-list">
            {clients.map((client, index) => (
              <li key={index} className="roles-listItem">
                <span>{client}</span>
                <AccessibilityNewIcon className="accessibility-icon" />
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Menú para Nutricionistas */}
      <div className="roles-menu">
        <h2 onClick={() => setShowNutritionists(!showNutritionists)} className="roles-menuTitle">
          <LocalDiningIcon style={{ marginRight: '7px' }} />
          Nutricionistas
          <div className="filter-icon">
            <FilterListIcon />
          </div>
        </h2>
        {showNutritionists && (
          <ul className="roles-list">
            {nutritionists.map((nutritionist, index) => (
              <li key={index} className="roles-listItem">
                <span>{nutritionist}</span>
                <LocalDiningIcon className="list-icon-right" /> {/* Icono de nutricionista a la derecha */}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Menú para Entrenadores */}
      <div className="roles-menu">
        <h2 onClick={() => setShowTrainers(!showTrainers)} className="roles-menuTitle">
          <SportsIcon style={{ marginRight: '8px' }} />
          Entrenadores
          <div className="filter-icon">
            <FilterListIcon />
          </div>
        </h2>
        {showTrainers && (
          <ul className="roles-list">
            {trainers.map((trainer, index) => (
              <li key={index} className="roles-listItem">
                <span>{trainer}</span>
                <FitnessCenterIcon className="list-icon-right" /> {/* Nuevo icono a la derecha */}
              </li>
            ))}
          </ul>
        )}
      </div>
      <NavBarAdmin />
    </div>
  );
};

export default AdminUsersManagement;






