import React, { useState } from 'react';
import './AdminUsersManagement.css';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import SportsIcon from '@mui/icons-material/Sports';
import AddBoxIcon from '@mui/icons-material/AddBox';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { NavBarAdmin } from '../../../Components/NavBarAdmin';

const AdminUsersManagement = () => {
  const [clients, setClients] = useState(['Cliente 1', 'Cliente 2', 'Cliente 3']);
  const [nutritionists, setNutritionists] = useState(['Nutricionista 1', 'Nutricionista 2']);
  const [trainers, setTrainers] = useState(['Entrenador 1', 'Entrenador 2', 'Entrenador 3']);

  const [showClients, setShowClients] = useState(false);
  const [showNutritionists, setShowNutritionists] = useState(false);
  const [showTrainers, setShowTrainers] = useState(false);

  const [showDropdowns, setShowDropdowns] = useState({
    clients: null,
    nutritionists: null,
    trainers: null,
  });

  const [showPopup, setShowPopup] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false); // agregar usuario
  const [selectedUser, setSelectedUser] = useState('');
  const [userType, setUserType] = useState('');
  const [newUserName, setNewUserName] = useState(''); // usuario Nuevos

  const handleDeleteClick = (user, type) => {
    setSelectedUser(user);
    setUserType(type);
    setShowPopup(true);
  };

  const confirmDelete = () => {
    if (userType === 'nutritionist') {
      setNutritionists(nutritionists.filter(nutritionist => nutritionist !== selectedUser));
    } else if (userType === 'trainer') {
      setTrainers(trainers.filter(trainer => trainer !== selectedUser));
    }
    setShowPopup(false);
  };

  const toggleDropdown = (userType, index) => {
    setShowDropdowns(prevState => ({
      ...prevState,
      [userType]: prevState[userType] === index ? null : index,
    }));
  };

  const handleAddUser = (type) => {
    setUserType(type);
    setShowAddPopup(true);
  };

  const confirmAddUser = () => {
    if (userType === 'client') {
      setClients([...clients, newUserName]);
    } else if (userType === 'nutritionist') {
      setNutritionists([...nutritionists, newUserName]);
    } else if (userType === 'trainer') {
      setTrainers([...trainers, newUserName]);
    }
    setNewUserName('');
    setShowAddPopup(false);
  };

  return (
    <>
      <div className="roles-container">
        <h1 className="roles-title">Administrar roles</h1>

        {/* Clientes */}
        <div className="roles-menu">
          <h2 onClick={() => setShowClients(!showClients)} className="roles-menuTitle" style={{ color: 'blue' }}>
            <DirectionsBikeIcon style={{ marginRight: '8px' }} />
            Clientes
            <AddBoxIcon style={{ marginLeft: '8px', color: 'green', cursor: 'pointer' }} onClick={() => handleAddUser('client')} />
          </h2>
          {showClients && (
            <ul className="roles-list">
              {clients.map((client, index) => (
                <li key={index} className="roles-listItem">
                  <span>{client}</span>
                  <div className="dropdown">
                    <button className="dropdown-button" onClick={() => toggleDropdown('clients', index)}>
                      <KeyboardDoubleArrowDownIcon />
                    </button>
                    {showDropdowns.clients === index && (
                      <div className="dropdown-content">
                        <button className="edit-button" onClick={() => alert('Editar funcionalidad en desarrollo')}>Editar</button>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Nutricionistas */}
        <div className="roles-menu">
          <h2 onClick={() => setShowNutritionists(!showNutritionists)} className="roles-menuTitle" style={{ color: 'purple' }}>
            <LocalDiningIcon style={{ marginRight: '8px' }} />
            Nutricionistas
            <AddBoxIcon style={{ marginLeft: '8px', color: 'green', cursor: 'pointer' }} onClick={() => handleAddUser('nutritionist')} />
          </h2>
          {showNutritionists && (
            <ul className="roles-list">
              {nutritionists.map((nutritionist, index) => (
                <li key={index} className="roles-listItem">
                  <span>{nutritionist}</span>
                  <div className="dropdown">
                    <button className="dropdown-button" onClick={() => toggleDropdown('nutritionists', index)}>
                      <KeyboardDoubleArrowDownIcon />
                    </button>
                    {showDropdowns.nutritionists === index && (
                      <div className="dropdown-content">
                        <button className="delete-button" onClick={() => handleDeleteClick(nutritionist, 'nutritionist')}>Borrar</button>
                        <button className="edit-button" onClick={() => alert('Editar funcionalidad en desarrollo')}>Editar</button>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Entrenadores */}
        <div className="roles-menu">
          <h2 onClick={() => setShowTrainers(!showTrainers)} className="roles-menuTitle" style={{ color: 'red' }}>
            <SportsIcon style={{ marginRight: '8px' }} />
            Entrenadores
            <AddBoxIcon style={{ marginLeft: '8px', color: 'green', cursor: 'pointer' }} onClick={() => handleAddUser('trainer')} />
          </h2>
          {showTrainers && (
            <ul className="roles-list">
              {trainers.map((trainer, index) => (
                <li key={index} className="roles-listItem">
                  <span>{trainer}</span>
                  <div className="dropdown">
                    <button className="dropdown-button" onClick={() => toggleDropdown('trainers', index)}>
                      <KeyboardDoubleArrowDownIcon />
                    </button>
                    {showDropdowns.trainers === index && (
                      <div className="dropdown-content">
                        <button className="delete-button" onClick={() => handleDeleteClick(trainer, 'trainer')}>Borrar</button>
                        <button className="edit-button" onClick={() => alert('Editar funcionalidad en desarrollo')}>Editar</button>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <p>¿Estás seguro de que deseas borrar a {selectedUser}?</p>
            <div className="popup-buttons">
              <button className="popup-button confirm-button" onClick={confirmDelete}>Sí, borrar</button>
              <button className="popup-button cancel-button" onClick={() => setShowPopup(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {showAddPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <p>Agregar nuevo {userType === 'client' ? 'cliente' : userType === 'nutritionist' ? 'nutricionista' : 'entrenador'}</p>
            <input
              type="text"
              placeholder="Nombre del nuevo usuario"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
            />
            <div className="popup-buttons">
              <button className="popup-button confirm-button" onClick={confirmAddUser}>Agregar</button>
              <button className="popup-button cancel-button" onClick={() => setShowAddPopup(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      <NavBarAdmin /> 
    </>
  );
};

export default AdminUsersManagement;

