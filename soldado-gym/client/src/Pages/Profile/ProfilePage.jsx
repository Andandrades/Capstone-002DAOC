import React from "react";
import { ProfileNavBar } from "../../Components/ProfileNavBar";

import "./ProfileStyle.css"

export const ProfilePage = () => {
  return (
    <>
    
      <div className="profile-container">
        <div className="header">
          <div className="user-icon">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="image"
            />
          </div>
          <div className="edit-icon">
            ✏️
          </div>
        </div>
        <h2 className="name">Juan Perez</h2>
        <div className="info-section">
          <div className="info-row">
            <span>Correo:</span>
            <span className="info-text">example.mail@gmail.com</span>
            <button className="edit-button">
              ✏️
            </button>
          </div>
          <div className="info-row">
            <span>Edad:</span>
            <span className="info-text">21 Años</span>
            <button className="edit-button">
              ✏️
            </button>
          </div>
          <div className="info-row">
            <span>Contraseña:</span>
            <span className="info-text">************</span>
            <button className="edit-button">
              ✏️
            </button>
          </div>
        </div>
      </div>

      <ProfileNavBar/>
    </>
  );
}


