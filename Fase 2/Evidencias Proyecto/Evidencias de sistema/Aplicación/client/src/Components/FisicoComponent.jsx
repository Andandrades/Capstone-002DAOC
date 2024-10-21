import React, { useState } from "react";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import RunCircleIcon from '@mui/icons-material/RunCircle';
import Antes from '../assets/img/Antes.webp'; 
import Despues from '../assets/img/Despues.webp'; 
import './css/FisicoComponent.css';

export const FisicoComponent = () => {
    const [mostrarAntes, setMostrarAntes] = useState(true);

    const toggleImagen = () => {
        setMostrarAntes(!mostrarAntes);
    };

    return (
        <div className="resultados-container">
            <div className="texto">
                <h1 className="text-3xl font-bold uppercase text-center text-color bg-gray-120">Resultados</h1>
                <p>
                    Nuestro objetivo es mejorar la salud y el estado físico de nuestros clientes
                </p>
            </div>
            <div className="icono-superior-derecha">
                    <RunCircleIcon style={{ fontSize: '2.5rem', color: '#e5e51a' }} />
                </div>
            <div className="tarjeta">
                

                
                <img 
                    src={mostrarAntes ? Antes : Despues} 
                    alt={mostrarAntes ? "Antes" : "Después"} 
                />
                
                
                <div className="nombre-icono">
                    <h3>David Fuentes</h3>
                    <FitnessCenterIcon style={{ fontSize: '2rem', color: '#e5e51a' }} />
                </div>
                
                <button className="boton" onClick={toggleImagen}>Ver Cambio</button> 
            </div>
        </div>
    );
};










