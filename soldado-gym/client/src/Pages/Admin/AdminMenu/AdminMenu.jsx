import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PersonIcon from '@mui/icons-material/Person';
import TodayIcon from '@mui/icons-material/Today';
import React from 'react';
import { NavBarAdmin } from '../../../Components/NavBarAdmin';
import "./AdminMenu.css";
export const AdminMenu = () => {
    return (
        <>
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Barra de Actividades</title>
                <link rel="stylesheet" href="styles.css" />
            </head>
            <div className="menu">

                <h1 className="mb-3 text-gray-700 center">Inicia tus actividades</h1>
                <div className="h-[3px] rounded-full w-full bg-blue-500 mb-3"></div>


                <div className="menu-item-right">
                    <div className="icon-container">
                        <TodayIcon alt="Icono de Usuarios" />
                    </div>
                    <span>Ver Clases</span>
                </div>
                <div className="menu-item-left">
                    <div className="icon-container">
                        <PersonIcon alt="Icono de Horario" />
                    </div>
                    <span>Usuarios</span>
                </div>
                <div className="menu-item-right">
                    <div className="icon-container">
                        <FitnessCenterIcon alt="Icono de Usuarios" />
                    </div>
                    <span>Planes</span>
                </div>


                <div className="menu-item-left">
                    <div className="icon-container">
                        <FitnessCenterIcon alt="Icono de Planes" />
                    </div>
                    <p>Configuraciones </p>

                </div>

            </div>
            <NavBarAdmin />
        </>
    )
};
