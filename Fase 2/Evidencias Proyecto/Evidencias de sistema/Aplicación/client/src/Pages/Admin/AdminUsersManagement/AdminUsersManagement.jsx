import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import SportsIcon from '@mui/icons-material/Sports';
import GroupsIcon from '@mui/icons-material/Groups'; 
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Importar el nuevo icono
import { NavBarAdmin } from '../../../Components/NavBarAdmin';
import { ObtenerClientes, ObtenerEntrenadores, ObtenerNutricionistas, ObtenerAdministradores, EliminarUsuario, CrearUsuario, ActualizarUsuario } from '../../../Components/API/Users';
import UserRoleCard from '../../../Components/UserRoleCard';
import Spinner from '../../../Components/Spinner';
import './AdminUsersManagement.css'; 

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
  const [confirmPassword, setConfirmPassword] = useState('');
  const [editUserName, setEditUserName] = useState('');
  const [editUserEmail, setEditUserEmail] = useState('');
  const [editUserWeight, setEditUserWeight] = useState('');
  const [editUserHeight, setEditUserHeight] = useState('');
  const [loading, setLoading] = useState(false); // Estado para mostrar el Spinner

  // Función para obtener usuarios agrupados por rol
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

  useEffect(() => {
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
      toast.success('Usuario eliminado con éxito');
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      toast.error('El usuario no se ha podido eliminar');
    } finally {
      setLoading(false); // Ocultar el Spinner
      fetchUsersByRole(); // Recargar la query
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
      toast.info('El correo electrónico no es válido');
      return;
    }

    if (newUserPassword !== confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    const newUser = {
      name: newUserName,
      email: newUserEmail,
      password: newUserPassword,
      fk_rol_id: userType === 'clientes' ? 1 : userType === 'nutricionistas' ? 3 : userType === 'entrenadores' ? 2 : 4
    };
    try {
      const response = await CrearUsuario(newUser);
      const createdUser = response.user; // Asegúrate de extraer el usuario de la respuesta
      if (userType === 'clientes') {
        setClients([...clients, createdUser]);
      } else if (userType === 'nutricionistas') {
        setNutritionists([...nutritionists, createdUser]);
      } else if (userType === 'entrenadores') {
        setTrainers([...trainers, createdUser]);
      } else if (userType === 'administradores') {
        setAdministrators([...administrators, createdUser]);
      }
      setNewUserName('');
      setNewUserEmail('');
      setNewUserPassword('');
      setConfirmPassword('');
      setShowAddPopup(false);
      toast.success('Usuario creado con éxito');
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      toast.error('El usuario no se ha podido crear');
    }
  };

  const handleEditClick = (user, type) => {
    setSelectedUser(user);
    setEditUserName(user.name || '');
    setEditUserEmail(user.email || '');
    setEditUserWeight(user.weight || '');
    setEditUserHeight(user.height || '');
    setUserType(type); 
    setShowEditPopup(true); 
  };

  const confirmEditUser = async () => {
    const Payload = {
      name: editUserName,
      email: editUserEmail,
      weight: editUserWeight,
      height: editUserHeight,
      fk_rol_id: selectedUser.fk_rol_id 
    };
    try {
      const response = await ActualizarUsuario(selectedUser.id, Payload);
      const updated = response.user; 
      if (userType === 'clientes') {
        setClients(clients.map(client => (client.id === selectedUser.id ? updated : client)));
      } else if (userType === 'nutricionistas') {
        setNutritionists(nutritionists.map(nutritionist => (nutritionist.id === selectedUser.id ? updated : nutritionist)));
      } else if (userType === 'entrenadores') {
        setTrainers(trainers.map(trainer => (trainer.id === selectedUser.id ? updated : trainer)));
      } else if (userType === 'administradores') {
        setAdministrators(administrators.map(admin => (admin.id === selectedUser.id ? updated : admin)));
      }
      setShowEditPopup(false);
      toast.success('Usuario editado con éxito');
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      toast.error('El usuario no se ha podido editar correctamente');
    } finally {
      setLoading(false); // Ocultar el Spinner
      fetchUsersByRole(); // Recargar la query
    }
  };

  return (
    <>
      <NavBarAdmin />
      {loading ? (
        <Spinner />
      ) : (
      <div className="roles-container">
        <h1 className="roles-title">Administrar roles</h1>

          <UserRoleCard
            title="Clientes"
            color="blue"
            icon={DirectionsBikeIcon}
            users={clients}
            showUsers={showClients}
            setShowUsers={setShowClients}
            handleAddUser={handleAddUser}
            toggleDropdown={toggleDropdown}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
            selectedUser={selectedUser}
          />

          <UserRoleCard
            title="Nutricionistas"
            color="purple"
            icon={LocalDiningIcon}
            users={nutritionists}
            showUsers={showNutritionists}
            setShowUsers={setShowNutritionists}
            handleAddUser={handleAddUser}
            toggleDropdown={toggleDropdown}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
            selectedUser={selectedUser}
          />

          <UserRoleCard
            title="Entrenadores"
            color="red"
            icon={SportsIcon}
            users={trainers}
            showUsers={showTrainers}
            setShowUsers={setShowTrainers}
            handleAddUser={handleAddUser}
            toggleDropdown={toggleDropdown}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
            selectedUser={selectedUser}
          />

          <UserRoleCard
            title="Administradores"
            color="green"
            icon={GroupsIcon}
            users={administrators}
            showUsers={showAdministrators}
            setShowUsers={setShowAdministrators}
            handleAddUser={handleAddUser}
            toggleDropdown={toggleDropdown}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
            selectedUser={selectedUser}
          />
        </div>
      )}

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <p>¿Estás seguro de que deseas borrar a {selectedUser.name}?</p>
            <div className="flex justify-between mt-4">
              <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={confirmDelete}>
                <CheckCircleIcon style={{ color: 'white' }} /> {/* Utilizar el nuevo icono para confirmar */}
                Sí, borrar
              </button>
              <button className="cancel-button" onClick={() => setShowPopup(false)}>
                <CancelIcon style={{ color: 'white' }} /> {/* Utilizar el nuevo icono para cancelar */}
                Cancelar
              </button>
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
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="email"
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
              placeholder="Email del nuevo usuario"
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="password"
              value={newUserPassword}
              onChange={(e) => setNewUserPassword(e.target.value)}
              placeholder="Contraseña del nuevo usuario"
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirmar Contraseña"
              className="w-full p-2 border rounded mb-2"
            />
            <div className="flex justify-between mt-4">
              <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={confirmAddUser}>
                <CheckCircleIcon style={{ color: 'white' }} /> {/* Utilizar el nuevo icono para confirmar */}
                Agregar
              </button>
              <button className="cancel-button" onClick={() => setShowAddPopup(false)}>
                <CancelIcon style={{ color: 'white' }} /> {/* Utilizar el nuevo icono para cancelar */}
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Editar {userType}</h2>
            <input
              type="text"
              value={editUserName}
              onChange={(e) => setEditUserName(e.target.value)}
              placeholder="Nuevo nombre"
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="email"
              value={editUserEmail}
              onChange={(e) => setEditUserEmail(e.target.value)}
              placeholder="Nuevo email"
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="number"
              value={editUserWeight}
              onChange={(e) => setEditUserWeight(e.target.value)}
              placeholder="Nuevo peso"
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="number"
              value={editUserHeight}
              onChange={(e) => setEditUserHeight(e.target.value)}
              placeholder="Nueva altura"
              className="w-full p-2 border rounded mb-2"
            />
            <div className="flex justify-between mt-4">
              <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={confirmEditUser}>
                <CheckCircleIcon style={{ color: 'white' }} /> {/* Utilizar el nuevo icono para confirmar */}
                Confirmar
              </button>
              <button className="cancel-button" onClick={() => setShowEditPopup(false)}>
                <CancelIcon style={{ color: 'white' }} /> {/* Utilizar el nuevo icono para cancelar */}
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </>
  );
};

export default AdminUsersManagement;