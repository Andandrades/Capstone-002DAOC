// src/pages/Roles.page.jsx
import React, { useState } from 'react';
import './Roles.Style.css';
import { NavBarAdmin } from '../../../Components/NavBarAdmin'

const RolesPage = () => {
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
        <h2 onClick={() => setShowClients(!showClients)} className="roles-menuTitle">Clientes</h2>
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
        <h2 onClick={() => setShowNutritionists(!showNutritionists)} className="roles-menuTitle">Nutricionistas</h2>
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
        <h2 onClick={() => setShowTrainers(!showTrainers)} className="roles-menuTitle">Entrenadores</h2>
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

export default RolesPage;
