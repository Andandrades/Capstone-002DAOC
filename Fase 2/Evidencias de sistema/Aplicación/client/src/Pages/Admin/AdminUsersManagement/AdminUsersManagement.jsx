import React, { useState } from 'react';
import './AdminUsersManagement.css';
import { NavBarAdmin } from '../../../Components/NavBarAdmin';
import SportsIcon from '@mui/icons-material/Sports'; // Icono para Entrenadores
import BlenderIcon from '@mui/icons-material/Blender'; // Icono para Nutricionistas
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike'; // Icono para Clientes
import FilterListIcon from '@mui/icons-material/FilterList'; // Icono de filtro para la derecha

const AdminUsersManagement = () => {
  // Datos de ejemplo
  const clients = ['Cliente 1', 'Cliente 2', 'Cliente 3'];
  const nutritionists = ['Nutricionista 1', 'Nutricionista 2'];
  const trainers = ['Entrenador 1', 'Entrenador 2', 'Entrenador 3'];

  // Estado para manejar el despliegue de cada menú
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
              <li key={index} className="roles-listItem">{client}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Menú para Nutricionistas */}
      <div className="roles-menu">
        <h2 onClick={() => setShowNutritionists(!showNutritionists)} className="roles-menuTitle">
          <BlenderIcon style={{ marginRight: '8px' }} />
          Nutricionistas
          <div className="filter-icon">
            <FilterListIcon />
          </div>
        </h2>
        {showNutritionists && (
          <ul className="roles-list">
            {nutritionists.map((nutritionist, index) => (
              <li key={index} className="roles-listItem">{nutritionist}</li>
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
              <li key={index} className="roles-listItem">{trainer}</li>
            ))}
          </ul>
        )}
      </div>

      <NavBarAdmin />
    </div>
  );
};

export default AdminUsersManagement;




