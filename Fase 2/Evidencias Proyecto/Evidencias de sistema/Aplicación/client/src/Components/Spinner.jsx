import React from 'react';

function Spinner() {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-opacity-50 flex-col">
      <div className="relative w-16 h-16 border-4 border-yellow-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      <div>
        <p>Cargando...</p>
      </div>
    </div>
  );
}

export default Spinner;
