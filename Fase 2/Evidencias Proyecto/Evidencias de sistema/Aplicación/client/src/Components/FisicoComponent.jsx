import React, { useState } from "react";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import RunCircleIcon from '@mui/icons-material/RunCircle';
import Antes from '../assets/img/Antes.webp';
import Despues from '../assets/img/Despues.webp';

export const FisicoComponent = () => {
    const [mostrarAntes, setMostrarAntes] = useState(true);

    const toggleImagen = () => {
        setMostrarAntes(!mostrarAntes);
    };

    return (
        <div className="flex flex-col items-center mx-auto space-y-5 pt-5">
            <h1 className="text-3xl font-bold uppercase text-center py-2">
                Resultados
            </h1>
            <p className="text-center text-gray-700">
                Nuestro objetivo es mejorar la salud y el estado físico de nuestros clientes
            </p>
            <div className="bg-gray-100 rounded-lg shadow-lg p-4 w-[350px] pb-8 ">
                <img
                    className=" object-cover h-[400px] m-auto rounded-lg"
                    src={!mostrarAntes ? Antes : Despues}
                    alt={!mostrarAntes ? "Antes" : "Después"}
                />
                <div className="flex justify-between items-center text-gray-800 p-5">
                    <h3 className="font-bold text-lg">Roberto Castañas M.</h3>
                    <FitnessCenterIcon className="text-yellow-400 text-4xl" />
                </div>
                <button
                    className="w-full py-2 px-4 bg-yellow-400 text-white font-bold rounded hover:bg-yellow-500 transition"
                    onClick={toggleImagen}
                >
                    {mostrarAntes ? "Ver el antes" : "Ver resultado"}
                </button>
            </div>
        </div>

    );
};










