import React, { useState, useEffect } from 'react';
import './AdminUsersManagement.css';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import SportsIcon from '@mui/icons-material/Sports';
import AddBoxIcon from '@mui/icons-material/AddBox';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import GroupsIcon from '@mui/icons-material/Groups'; 
import { NavBarAdmin } from '../../../Components/NavBarAdmin';
import { ObtenerClientes, ObtenerEntrenadores, ObtenerNutricionistas, ObtenerAdministradores, EliminarUsuario, CrearUsuario, ActualizarUsuario } from '../../../Components/API/Users';

const AdminUsersManagement = () => {
  const [clients, setClients] = useState([]);
  const [nutritionists, setNutritionists] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [administrators, setAdministrators] = useState([]); 

  const [showClients, setShowClients] = useState(false);
  const [showNutritionists, setShowNutritionists] = useState(false);
  const [showTrainers, setShowTrainers] = useState(false);
  const [showAdministrators, setShowAdministrators] = useState(false); 

  const [showPopup, setShowPopup] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false); 
  const [selectedUser, setSelectedUser] = useState(null);
  const [userType, setUserType] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserWeight, setNewUserWeight] = useState('');
  const [newUserHeight, setNewUserHeight] = useState('');
  const [editUserName, setEditUserName] = useState('');
  const [editUserEmail, setEditUserEmail] = useState('');
  const [editUserPassword, setEditUserPassword] = useState('');
  const [editUserWeight, setEditUserWeight] = useState('');
  const [editUserHeight, setEditUserHeight] = useState('');

  // Función para obtener usuarios agrupados por rol
  useEffect(() => {
    const fetchUsersByRole = async () => {
      try {
        const clientsData = await ObtenerClientes();
        const trainersData = await ObtenerEntrenadores();
        const nutritionistsData = await ObtenerNutricionistas();
        const administratorsData = await ObtenerAdministradores();
        setClients(clientsData.map(user => user));
        setNutritionists(nutritionistsData.map(user => user));
        setTrainers(trainersData.map(user => user));
        setAdministrators(administratorsData.map(user => user));
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

  const confirmDelete = async () => {
    try {
      await EliminarUsuario(selectedUser.id);
      if (userType === 'nutritionist') {
        setNutritionists(nutritionists.filter(nutritionist => nutritionist.id !== selectedUser.id));
      } else if (userType === 'trainer') {
        setTrainers(trainers.filter(trainer => trainer.id !== selectedUser.id));
      } else if (userType === 'administrator') {
        setAdministrators(administrators.filter(admin => admin.id !== selectedUser.id));
      } else if (userType === 'client') {
        setClients(clients.filter(client => client.id !== selectedUser.id));
      }
      setShowPopup(false);
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
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

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const confirmAddUser = async () => {
    if (!validateEmail(newUserEmail)) {
      alert('Verifique que el correo que escribio es valido.');
      return;
    }

    const newUser = {
      name: newUserName,
      email: newUserEmail,
      password: newUserPassword,
      fk_rol_id: userType === 'client' ? 1 : userType === 'nutritionist' ? 3 : userType === 'trainer' ? 2 : 4,
      weight: newUserWeight,
      height: newUserHeight
    };
    try {
      const createdUser = await CrearUsuario(newUser);
      if (userType === 'client') {
        setClients([...clients, createdUser]);
      } else if (userType === 'nutritionist') {
        setNutritionists([...nutritionists, createdUser]);
      } else if (userType === 'trainer') {
        setTrainers([...trainers, createdUser]);
      } else if (userType === 'administrator') {
        setAdministrators([...administrators, createdUser]);
      }
      setNewUserName('');
      setNewUserEmail('');
      setNewUserPassword('');
      setNewUserWeight('');
      setNewUserHeight('');
      setShowAddPopup(false);
    } catch (error) {
      console.error('Error al crear el usuario:', error);
    }
  };

  const handleEditClick = (user, type) => {
    setSelectedUser(user);
    setEditUserName(user.name || '');
    setEditUserEmail(user.email || '');
    setEditUserPassword(user.password || '');
    setEditUserWeight(user.weight || '');
    setEditUserHeight(user.height || '');
    setUserType(type); 
    setShowEditPopup(true); 
  };

  const confirmEditUser = async () => {
    if (!validateEmail(editUserEmail)) {
      alert('Ingresa un correo electrónico válido.');
      return;
    }

    const updatedUser = {
      name: editUserName,
      email: editUserEmail,
      password: editUserPassword,
      weight: editUserWeight,
      height: editUserHeight,
      fk_rol_id: selectedUser.fk_rol_id 
    };
    try {
      const updated = await ActualizarUsuario(selectedUser.id, updatedUser);
      if (userType === 'client') {
        setClients(clients.map(client => (client.id === selectedUser.id ? updated : client)));
      } else if (userType === 'nutritionist') {
        setNutritionists(nutritionists.map(nutritionist => (nutritionist.id === selectedUser.id ? updated : nutritionist)));
      } else if (userType === 'trainer') {
        setTrainers(trainers.map(trainer => (trainer.id === selectedUser.id ? updated : trainer)));
      } else if (userType === 'administrator') {
        setAdministrators(administrators.map(admin => (admin.id === selectedUser.id ? updated : admin)));
      }
      setShowEditPopup(false);
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
    }
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
                  <span>{client.name}</span>
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
                  <span>{nutritionist.name}</span>
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
                  <span>{trainer.name}</span>
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
                <li key={admin.id} className="roles-listItem">
                  <span>{admin.name}</span>
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
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <p>¿Estás seguro de que deseas borrar a {selectedUser.name}?</p>
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
            <h2>Agregar nuevo {userType}</h2>
            <input
              type="text"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              placeholder="Nombre del nuevo usuario"
            />
            <input
              type="email"
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
              placeholder="Email del nuevo usuario"
            />
            <input
              type="password"
              value={newUserPassword}
              onChange={(e) => setNewUserPassword(e.target.value)}
              placeholder="Contraseña del nuevo usuario"
            />
            <input
              type="number"
              value={newUserWeight}
              onChange={(e) => setNewUserWeight(e.target.value)}
              placeholder="Peso del nuevo usuario"
            />
            <input
              type="number"
              value={newUserHeight}
              onChange={(e) => setNewUserHeight(e.target.value)}
              placeholder="Altura del nuevo usuario"
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
            <h2>Editar {userType}</h2>
            <input
              type="text"
              value={editUserName}
              onChange={(e) => setEditUserName(e.target.value)}
              placeholder="Nuevo nombre"
            />
            <input
              type="email"
              value={editUserEmail}
              onChange={(e) => setEditUserEmail(e.target.value)}
              placeholder="Nuevo email"
            />
            <input
              type="password"
              value={editUserPassword}
              onChange={(e) => setEditUserPassword(e.target.value)}
              placeholder="Nueva contraseña"
            />
            <input
              type="number"
              value={editUserWeight}
              onChange={(e) => setEditUserWeight(e.target.value)}
              placeholder="Nuevo peso"
            />
            <input
              type="number"
              value={editUserHeight}
              onChange={(e) => setEditUserHeight(e.target.value)}
              placeholder="Nueva altura"
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