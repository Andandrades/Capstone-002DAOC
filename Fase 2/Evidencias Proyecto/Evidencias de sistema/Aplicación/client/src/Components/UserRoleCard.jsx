import React from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import './css/UserRoleCard.css'; 

const UserRoleCard = ({ title, color, icon: Icon, users, showUsers, setShowUsers, handleAddUser, toggleDropdown, handleEditClick, handleDeleteClick, selectedUser }) => (
  <div className="roles-menu">
    <h2 onClick={() => setShowUsers(!showUsers)} className="roles-menuTitle" style={{ color }}>
      <span className="flex items-center">
        <Icon className="mr-2" />
        {title}
      </span>
      <AddBoxIcon className="text-green-500 cursor-pointer" onClick={() => handleAddUser(title.toLowerCase())} />
    </h2>
    {showUsers && (
      <ul className="roles-list">
        {users && users.length > 0 ? (
          users.map((user, index) => (
            user && user.name && (
              <li key={index} className="roles-listItem">
                <span>{user.name}</span>
                <div className="dropdown">
                  <button className="dropdown-button" onClick={() => toggleDropdown(user, title.toLowerCase())}>
                    <KeyboardDoubleArrowDownIcon />
                  </button>
                  {selectedUser === user && (
                    <div className="dropdown-content">
                      <button className="edit-button" onClick={() => handleEditClick(user, title.toLowerCase())}>Editar</button>
                      {title.toLowerCase() !== 'clientes' && (
                        <button className="delete-button" onClick={() => handleDeleteClick(user, title.toLowerCase())}>Borrar</button>
                      )}
                    </div>
                  )}
                </div>
              </li>
            )
          ))
        ) : (
          <p className="text-white">No hay usuarios</p>
        )}
      </ul>
    )}
  </div>
);

export default UserRoleCard;