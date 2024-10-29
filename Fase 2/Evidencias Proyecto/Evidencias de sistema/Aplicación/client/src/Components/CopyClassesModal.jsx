import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CopyClassesModal = ({ originalDay }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedDays([...selectedDays, value]);
    } else {
      setSelectedDays(selectedDays.filter((day) => day !== value));
    }
  };

  const handleCopyClasses = async () => {
    if (selectedDays.length === 0) {
      setMessage('Selecciona al menos un día para copiar las clases.');
      return;
    }
    
    setIsLoading(true);
    setMessage('');

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/gymHoursCopy`, {
        originalDay,
        targetDays: selectedDays
      });
      
      setMessage(response.data.message || 'Clases copiadas con éxito');
      setSelectedDays([]); // Limpiar selección
    } catch (error) {
      setMessage('Error copiando las clases: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Botón para abrir el modal */}
      <button onClick={() => setShowModal(true)}>Copiar clases</button>

      {/* Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Selecciona los días para copiar</h2>
            
            {/* Checkbox para los días */}
            <label><input type="checkbox" value="M" onChange={handleCheckboxChange} /> Martes</label>
            <label><input type="checkbox" value="X" onChange={handleCheckboxChange} /> Miércoles</label>
            <label><input type="checkbox" value="J" onChange={handleCheckboxChange} /> Jueves</label>
            <label><input type="checkbox" value="V" onChange={handleCheckboxChange} /> Viernes</label>
            <label><input type="checkbox" value="S" onChange={handleCheckboxChange} /> Sábado</label>
            <label><input type="checkbox" value="D" onChange={handleCheckboxChange} /> Domingo</label>

            {/* Botón de Aceptar */}
            <button onClick={handleCopyClasses} disabled={isLoading}>
              {isLoading ? 'Copiando...' : 'Aceptar'}
            </button>

            {/* Mensaje de éxito o error */}
            {message && <p>{message}</p>}

            {/* Botón para cerrar el modal */}
            <button onClick={() => setShowModal(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </>
  );
};

export default CopyClassesModal;
