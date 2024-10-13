import React, { useState } from "react";

// Importamos las imágenes locales
import Antes from '../assets/img/Antes.webp';
import Despues from '../assets/img/Despues.webp';

export const FisicoComponent = () => {
  // Estado para manejar la imagen
  const [image, setImage] = useState(Antes);

  // Función para cambiar la imagen
  const handleImageChange = () => {
    const newImage = image === Antes ? Despues : Antes;
    setImage(newImage);
  };

  // Función para manejar el mouse enter (hover)
  const handleMouseEnter = () => {
    console.log("Mouse entered");
  };

  // Función para manejar el mouse leave (cuando el mouse sale)
  const handleMouseLeave = () => {
    console.log("Mouse left");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <button
        className="relative border-2 border-gray-300 w-72 h-112 cursor-pointer transition-all duration-300 ease-in-out text-center bg-white rounded-lg shadow-md hover:transform hover:scale-105 hover:shadow-lg"
        onClick={handleImageChange}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-label="Cambiar imagen del cambio físico"
      >        
        <div className="flex justify-center items-center h-5/6">
            
          <img
            src={image}
            alt="Cambio físico"
            className="w-full h-full object-cover rounded-t-lg"
          />
        </div>
        <div className="p-4 pb-12"> {/* Añadimos padding-bottom para separar el botón */}
          <h2 className="text-lg font-semibold">David Fuentes</h2>
          <p className="text-gray-600 text-sm">
            Ver el cambio físico de David. Haz clic para ver el progreso.
          </p>
        </div>
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 text-white px-4 py-2 rounded-full text-xs font-bold uppercase transition duration-300 ease-in-out hover:bg-opacity-80 hover:scale-110">
          <span>Ver cambio</span>
        </div>
      </button>
    </div>
  );
};

export default FisicoComponent;