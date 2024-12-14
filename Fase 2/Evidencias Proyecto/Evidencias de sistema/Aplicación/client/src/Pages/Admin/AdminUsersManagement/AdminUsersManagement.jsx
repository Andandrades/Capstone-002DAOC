import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import SportsIcon from '@mui/icons-material/Sports';
import GroupsIcon from '@mui/icons-material/Groups';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { NavBarAdmin } from '../../../Components/NavBarAdmin';
import { ObtenerClientes, ObtenerEntrenadores, ObtenerNutricionistas, ObtenerAdministradores, EliminarUsuario, CrearUsuario, ActualizarUsuario } from '../../../Components/API/Users';
import UserRoleCard from '../../../Components/UserRoleCard';
import Spinner from '../../../Components/Spinner';
import './AdminUsersManagement.css';
import { Button } from 'antd';

const AdminUsersManagement = () => {
  const [clients, setClients] = useState([]);
  const [nutritionists, setNutritionists] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [administrators, setAdministrators] = useState([]);
  const [showClients, setShowClients] = useState(false);
  const [showNutritionists, setShowNutritionists] = useState(false);
  const [showTrainers, setShowTrainers] = useState(false);
  const [showAdministrators, setShowAdministrators] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
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
  const [loading, setLoading] = useState(false);

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
      toast.error('Error al obtener los usuarios, por favor intente de nuevo.');
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
    setLoadingButton(true);
    try {
      const response = await EliminarUsuario(selectedUser.id);
      if (response.message === 'Usuario eliminado con éxito') {
        if (userType === 'nutritionist') {
          setNutritionists(nutritionists.filter(nutritionist => nutritionist.id !== selectedUser.id));
        } else if (userType === 'trainer') {
          setTrainers(trainers.filter(trainer => trainer.id !== selectedUser.id));
        } else if (userType === 'administrator') {
          setAdministrators(administrators.filter(admin => admin.id !== selectedUser.id));
        } else if (userType === 'client') {
          setClients(clients.filter(client => client.id !== selectedUser.id));
        }
        toast.success(response.message);
      } else {
        toast.info('El usuario tiene registros no es posible eliminarlo');
      }
      setLoadingButton(false);
      setShowPopup(false);
    } catch {
      setLoadingButton(false);
      toast.info('El usuario tiene registros no es posible eliminarlo');
    } finally {
      setLoadingButton(false);
      setLoading(false);
      fetchUsersByRole();
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
    setLoadingButton(true)
    if (!validateEmail(newUserEmail)) {
      toast.info('El correo electrónico que ingresó no es válido, por favor verifíquelo o ingrese uno nuevo.');
      setLoadingButton(false)
      return;
    }

    if (newUserPassword.length < 8) {
      toast.error('La contraseña debe tener al menos 8 caracteres.');
      setLoadingButton(false)
      return;
    }

    if (newUserPassword !== confirmPassword) {
      toast.error('Las contraseñas no coinciden. Por favor, vuelva a poner las contraseñas');
      setLoadingButton(false)
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
      const createdUser = response.user;
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
      setLoadingButton(false)
      toast.success('El usuario se ha creado con éxito');
    } catch (error) {
      setLoadingButton(false)
      console.error('Error al crear el usuario:', error);
      toast.error('El usuario no se ha podido crear correctamente');
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
    setLoadingButton(true)
    const Payload = {
      name: editUserName,
      email: editUserEmail,
      weight: editUserWeight,
      height: editUserHeight,
      fk_rol_id: selectedUser.fk_rol_id
    };

    // Verificar si hay cambios
    const hasChanges = (
      editUserName !== selectedUser.name ||
      editUserEmail !== selectedUser.email ||
      editUserWeight !== selectedUser.weight ||
      editUserHeight !== selectedUser.height
    );

    if (!hasChanges) {
      toast.warn('Por favor, realice cambios antes de guardar.');
      setLoadingButton(false)
      return;
    }

    try {
      const response = await ActualizarUsuario(selectedUser.id, Payload);
      if (response.message === 'Usuario actualizado con éxito') {
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
        toast.success('El usuario se ha editado con éxito');
      } else {
        toast.success('El usuario se ha editado con éxito');
      }
      setLoadingButton(false)
      setShowEditPopup(false);
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      setLoadingButton(false)
      toast.error('Error al editar al usuario, por favor intente de nuevo.');
    } finally {
      setLoading(false);
      setLoadingButton(false)
      fetchUsersByRole();
    }
  };

  return (
    <>
      <NavBarAdmin />
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
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <p>¿Estás seguro de que deseas borrar a {selectedUser.name}?</p>
            <div className="flex justify-between mt-4">
              <Button className="bg-green-500 text-white p-5 rounded" loading={loadingButton} onClick={confirmDelete}>
                <CheckCircleIcon style={{ color: 'white' }} />
                Sí, borrar
              </Button>
              <Button className="bg-red-500 text-white p-5 rounded" onClick={() => setShowPopup(false)}>
                <CancelIcon style={{ color: 'white' }} />
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}

      {showAddPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2 className='mb-4'>Agregar nuevo {userType}</h2>
            <label htmlFor="userName">Nombre</label>
            <input
              id='userName'
              type="text"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              placeholder="Nombre del nuevo usuario"
              className="w-full p-2 border rounded mb-2"
            />
            <label htmlFor="email">Email</label>
            <input
              id='email'
              type="email"
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
              placeholder="Email del nuevo usuario"
              className="w-full p-2 border rounded mb-2"
            />
            <label htmlFor="password">Contraseña</label>
            <input
              id='password'
              type="password"
              value={newUserPassword}
              onChange={(e) => setNewUserPassword(e.target.value)}
              placeholder="Contraseña del nuevo usuario"
              className="w-full p-2 border rounded mb-2"
            />
            <label htmlFor="confirm">Confirmar contraseña</label>
            <input
              id='confirm'
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirmar Contraseña"
              className="w-full p-2 border rounded mb-2"
            />
            <div className="flex justify-around mt-4">
              <Button className="!bg-green-500 !text-white p-5 rounded" loading={loadingButton} onClick={confirmAddUser}>
                <CheckCircleIcon style={{ color: 'white' }} />
                Agregar
              </Button>
              <Button className="!bg-red-500 !text-white p-5 rounded" onClick={() => setShowAddPopup(false)}>
                <CancelIcon style={{ color: 'white' }} />
                Cancelar
              </Button>
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
              <Button className="!bg-green-500 !text-white p-5 rounded" loading={loadingButton} onClick={confirmEditUser}>
                <CheckCircleIcon className='color-white-500' />
                Confirmar
              </Button>
              <Button className="!bg-red-500 !text-white p-5 rounded" onClick={() => setShowEditPopup(false)}>
                <CancelIcon className='color-white-500' />
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </>
  );
};

export default AdminUsersManagement;