import React, { useState, useEffect } from 'react';
import './AdminUsersManagement.css';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import SportsIcon from '@mui/icons-material/Sports';
import AddBoxIcon from '@mui/icons-material/AddBox';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import GroupsIcon from '@mui/icons-material/Groups'; // Icono del administrador
import { NavBarAdmin } from '../../../Components/NavBarAdmin';
import axios from 'axios';

const AdminUsersManagement = () => {
  const [clients, setClients] = useState([]);
  const [nutritionists, setNutritionists] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [administrators, setAdministrators] = useState([]); // Nuevo estado para administradores

  const [showClients, setShowClients] = useState(false);
  const [showNutritionists, setShowNutritionists] = useState(false);
  const [showTrainers, setShowTrainers] = useState(false);
  const [showAdministrators, setShowAdministrators] = useState(false); // Mostrar/ocultar administradores

  const [showDropdowns, setShowDropdowns] = useState({
    clients: null,
    nutritionists: null,
    trainers: null,
    administrators: null, // Dropdown de administradores
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
        setAdministrators(response.data.administrators.map(user => user.name)); // Administradores
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
    if (userType === 'client') {
      setClients(clients.filter(client => client !== selectedUser));
    } else if (userType === 'nutritionist') {
      setNutritionists(nutritionists.filter(nutritionist => nutritionist !== selectedUser));
    } else if (userType === 'trainer') {
      setTrainers(trainers.filter(trainer => trainer !== selectedUser));
    } else if (userType === 'administrator') {
      setAdministrators(administrators.filter(admin => admin !== selectedUser));
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
    } else if (userType === 'administrator') {
      setAdministrators([...administrators, newUserName]);
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
    } else if (userType === 'administrator') {
      setAdministrators(administrators.map(admin => (admin === selectedUser ? editUserName : admin)));
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
                        <button className="delete-button" onClick={() => handleDeleteClick(client, 'client')}>Borrar</button>
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

        {/* Administradores */}
        <div className="roles-menu">
          <h2 onClick={() => setShowAdministrators(!showAdministrators)} className="roles-menuTitle" style={{ color: 'green' }}>
            <GroupsIcon style={{ marginRight: '8px' }} />
            Administradores
            <AddBoxIcon style={{ marginLeft: '8px', color: 'green', cursor: 'pointer' }} onClick={() => handleAddUser('administrator')} />
          </h2>
          {showAdministrators && (
            <ul className="roles-list">
              {administrators.map((admin, index) => (
                <li key={index} className="roles-listItem">
                  <span>{admin}</span>
                  <div className="dropdown">
                    <button className="dropdown-button" onClick={() => toggleDropdown(admin, 'administrator')}>
                      <KeyboardDoubleArrowDownIcon />
                    </button>
                    {selectedUser === admin && (
                      <div className="dropdown-content">
                        <button className="delete-button" onClick={() => handleDeleteClick(admin, 'administrator')}>Borrar</button>
                        <button className="edit-button" onClick={() => handleEditClick(admin, 'administrator')}>Editar</button>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Popups */}
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup">
              <h3>¿Estás seguro de que deseas borrar a {selectedUser}?</h3>
              <div className="popup-buttons">
                <button className="confirm-button" onClick={confirmDelete}>Confirmar</button>
                <button className="cancel-button" onClick={() => setShowPopup(false)}>Cancelar</button>
              </div>
            </div>
          </div>
        )}

        {showAddPopup && (
          <div className="popup-overlay">
            <div className="popup">
              <h3>Agregar nuevo {userType}</h3>
              <input
                type="text"
                placeholder="Nombre del usuario"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
              />
              <div className="popup-buttons">
                <button className="confirm-button" onClick={confirmAddUser}>Agregar</button>
                <button className="cancel-button" onClick={() => setShowAddPopup(false)}>Cancelar</button>
              </div>
            </div>
          </div>
        )}

        {showEditPopup && (
          <div className="popup-overlay">
            <div className="popup">
              <h3>Editar nombre de {selectedUser}</h3>
              <input
                type="text"
                placeholder="Nuevo nombre"
                value={editUserName}
                onChange={(e) => setEditUserName(e.target.value)}
              />
              <div className="popup-buttons">
                <button className="confirm-button" onClick={confirmEditUser}>Guardar</button>
                <button className="cancel-button" onClick={() => setShowEditPopup(false)}>Cancelar</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
};

export default AdminUsersManagement;




