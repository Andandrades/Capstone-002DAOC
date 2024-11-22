import React, { useEffect, useState } from 'react';
import { GetAvalibleNutriSchedule } from '../../../Components/API/Endpoints';
import { useUser } from '../../../Components/API/UserContext';
import { IniciarConsulta } from '../../../Components/API/WebPayApi';
import { BuyLoginmodal } from '../../../Components/BuyLoginmodal';

const BuyConsultationModal = ({ onClose, id, name, amount, description }) => {
  const { userData, isAuth } = useUser();
  const [step, setStep] = useState(1);
  const [AvailableTimes, setAvailableTimes] = useState([]);
  const [idConsulta, setIdConsulta] = useState('');
  const [fechaConsulta, setFechaConsulta] = useState(''); // Estado para la hora seleccionada
  const [isLoading, setIsLoading] = useState(false);

  const fetchTimes = async () => {
    try {
      const times = await GetAvalibleNutriSchedule();
      setAvailableTimes(times);
    } catch (error) {
      console.error("Error al obtener horarios:", error);
    }
  };

  useEffect(() => {
    fetchTimes();
  }, []);

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
      onClose();
    }
  };

  const iniciarTransaccionHandler = async () => {
    setIsLoading(true);
    try {
      const response = await IniciarConsulta({
        amount,
        id,
        name,
        returnUrl: `${window.location.origin}/confirmar-pago`,
        userId: userData.id,
        nutriScheduleId: idConsulta
      });

      if (response && response.url) {
        window.location.href = `${response.url}?token_ws=${response.token}`;
      }
    } catch (error) {
      console.error("Error al iniciar transacción:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="modal-content text-center ">
      <h2 className="text-xl font-bold mb-4 text-black">Seleccionar Fecha</h2>
      <p className="text-black mb-4">{description}</p>
      <div className="mb-4">
        <label htmlFor="FechaConsulta" className="text-black">Seleccionar Fecha y Hora</label>
        <select
          id="FechaConsulta"
          value={idConsulta}
          onChange={(e) => {
            setIdConsulta(e.target.value); 
            setFechaConsulta(e.target.options[e.target.selectedIndex].text);
          }}
          className="border border-gray-300 rounded-md p-2 w-full"
        >
          {AvailableTimes?.map((timeObj, index) => {
            const formatted = `${new Date(timeObj.date).toLocaleDateString()} - ${timeObj.start_hour}`;

            return timeObj.available && (
              <option key={index} value={timeObj.nutri_schedule_id}>
                {formatted}
              </option>
            );
          })}
        </select>
      </div>

      <button
        className={`mt-5 bg-blue-500 text-white font-bold py-2 px-4 rounded-full ${fechaConsulta && fechaConsulta ? '' : 'opacity-50 cursor-not-allowed'}`}
        onClick={() => {
          setStep(2);
        }}
        disabled={!fechaConsulta}
      >
        Continuar
      </button>
    </div>
  );


  const renderStep2 = () => (
    <div className="modal-content text-center">
      <h2 className="text-xl font-bold mb-4 text-black">Confirmar Compra</h2>
      <p className="text-lg font-semibold text-black">{name}</p>
      <p className="text-sm text-gray-600 mb-4">
        Fecha seleccionada: {fechaConsulta || "sd"}
      </p>
      <p className="text-black">{description}</p>
      <p className="text-lg font-semibold text-green-500">${amount} CLP</p>
      <button
        className={`mt-5 bg-yellow-500 text-black font-bold py-2 px-4 rounded-full ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={iniciarTransaccionHandler}
        disabled={isLoading}
      >
        {isLoading ? "Procesando..." : "Proceder al Pago"}
      </button>
    </div>
  );

  return (
    <>
      {!isAuth ? (
        <BuyLoginmodal onClose={onClose} />
      ) : (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 modal-backdrop px-8"
          onClick={handleBackdropClick}
        >
          <div
            className="modal-dialog bg-gray-200 w-full max-w-lg mx-auto p-5 rounded-md shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black focus:outline-none"
              onClick={onClose}
            >
              &times;
            </button>
            {step === 1 ? renderStep1() : renderStep2()}
          </div>
        </div>
      )}
    </>
  );
};

export default BuyConsultationModal;
