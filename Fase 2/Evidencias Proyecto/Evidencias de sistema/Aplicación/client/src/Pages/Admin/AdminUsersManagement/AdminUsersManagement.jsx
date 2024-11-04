import React, { useState, useEffect } from 'react';
import './AdminUsersManagement.css';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import SportsIcon from '@mui/icons-material/Sports';
import AddBoxIcon from '@mui/icons-material/AddBox';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { NavBarAdmin } from '../../../Components/NavBarAdmin';
import axios from 'axios';

const AdminUsersManagement = () => {
  const [clients, setClients] = useState([]);
  const [nutritionists, setNutritionists] = useState([]);
  const [trainers, setTrainers] = useState([]);

  const [showClients, setShowClients] = useState(false);
  const [showNutritionists, setShowNutritionists] = useState(false);
  const [showTrainers, setShowTrainers] = useState(false);

  const [showDropdowns, setShowDropdowns] = useState({
    clients: null,
    nutritionists: null,
    trainers: null,
  });

  const [showPopup, setShowPopup] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false); 
  const [selectedUser, setSelectedUser] = useState('');
  const [userType, setUserType] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [editUserName, setEditUserName] = useState('');

  useEffect(() => {
    const fetchUsersByRole = async () => {
      try {
        const response = await axios.get('/api/usersByRole');
        setClients(response.data.clients.map(user => user.name));
        setNutritionists(response.data.nutritionists.map(user => user.name));
        setTrainers(response.data.trainers.map(user => user.name));
      } catch (error) {
        console.error('Error al obtener los usuarios por rol:', error);
      }
    };

    fetchUsersByRole();
  }, []);

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

  const toggleDropdown = (user, type) => {
    if (selectedUser === user) {
      setSelectedUser(null);
      setUserType('');
    } else {
      setSelectedUser(user);
      setUserType(type);
    }
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

  const handleEditClick = (user, type) => {
    setSelectedUser(user);
    setEditUserName(user);
    setUserType(type); 
    setShowEditPopup(true); 
  };

  const confirmEditUser = () => {
    if (userType === 'client') {
      setClients(clients.map(client => (client === selectedUser ? editUserName : client)));
    } else if (userType === 'nutritionist') {
      setNutritionists(nutritionists.map(nutritionist => (nutritionist === selectedUser ? editUserName : nutritionist)));
    } else if (userType === 'trainer') {
      setTrainers(trainers.map(trainer => (trainer === selectedUser ? editUserName : trainer)));
    }
    setShowEditPopup(false); 
  };

  return (
    <>
      <NavBarAdmin />
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
                    <button className="dropdown-button" onClick={() => toggleDropdown(client, 'client')}>
                      <KeyboardDoubleArrowDownIcon />
                    </button>
                    {selectedUser === client && (
                      <div className="dropdown-content">
                        <button className="edit-button" onClick={() => handleEditClick(client, 'client')}>Editar</button>
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
                    <button className="dropdown-button" onClick={() => toggleDropdown(nutritionist, 'nutritionist')}>
                      <KeyboardDoubleArrowDownIcon />
                    </button>
                    {selectedUser === nutritionist && (
                      <div className="dropdown-content">
                        <button className="delete-button" onClick={() => handleDeleteClick(nutritionist, 'nutritionist')}>Borrar</button>
                        <button className="edit-button" onClick={() => handleEditClick(nutritionist, 'nutritionist')}>Editar</button>
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
                    <button className="dropdown-button" onClick={() => toggleDropdown(trainer, 'trainer')}>
                      <KeyboardDoubleArrowDownIcon />
                    </button> 
                    {selectedUser === trainer && (
                      <div className="dropdown-content">
                        <button className="delete-button" onClick={() => handleDeleteClick(trainer, 'trainer')}>Borrar</button>
                        <button className="edit-button" onClick={() => handleEditClick(trainer, 'trainer')}>Editar</button>
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
            <p>Agregar nuevo {userType}</p>
            <input
              type="text"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              placeholder="Nombre del nuevo usuario"
            />
            <div className="popup-buttons">
              <button className="popup-button confirm-button" onClick={confirmAddUser}>Agregar</button>
              <button className="popup-button cancel-button" onClick={() => setShowAddPopup(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {showEditPopup && ( // Popup de edición
        <div className="popup-overlay">
          <div className="popup">
            <p>Editar {userType}</p>
            <input
              type="text"
              value={editUserName}
              onChange={(e) => setEditUserName(e.target.value)}
              placeholder="Nuevo nombre"
            />
            <div className="popup-buttons">
              <button className="popup-button confirm-button" onClick={confirmEditUser}>Confirmar</button>
              <button className="popup-button cancel-button" onClick={() => setShowEditPopup(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminUsersManagement;
