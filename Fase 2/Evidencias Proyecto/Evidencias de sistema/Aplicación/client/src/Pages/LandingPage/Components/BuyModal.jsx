import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { iniciarTransaccion } from '../../../Components/API/WebPayApi';
import { useUser } from '../../../Components/API/UserContext';

const BuyModal = (props) => {
  const { isOpen, onClose, name, amount, description, n_class,isPlan } = props;
  const { userId ,isAuth, setIsAuth} = useUser();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
      onClose();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (response.status === 200) {
        const authCheckResponse = await fetch(`${import.meta.env.VITE_API_URL}/checkauth`, {
          method: "GET",
          credentials: "include",
        });

        if (!authCheckResponse.ok) {
          throw new Error('Error en la verificación de autenticación');
        }

        const authData = await authCheckResponse.json();
        setIsAuth(authData.isAuth);
        localStorage.setItem("isAuth", JSON.stringify(true));
      } else {
        setError("Credenciales inválidas");
        console.log(response.body);
      }
    } catch (err) {
      setError("Error en el servidor");
      console.log(err);
    }
  };

  const iniciarTransaccionHandler = async () => {
    try {
      const response = await iniciarTransaccion({
        amount,
        name,
        description,
        returnUrl: `${window.location.origin}/confirmar-pago`,
        userId
      });
      if (response && response.url) {
        window.location.href = `${response.url}?token_ws=${response.token}`;
      }
    } catch (error) {
      console.log("Error al iniciar transacción:", error)
    }
  };

  return (
    <>
      {isAuth ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 modal-backdrop"
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

            <div className="modal-content text-center">
              <h2 className="text-xl font-bold mb-4 text-black">{isPlan ? "Detalles del plan" : "Detalles de la consulta"}</h2>
              <p className="text-lg font-semibold text-black">{name}</p>
              {isPlan && <p className="text-sm text-gray-600">Cantidad de clases: {n_class}</p>}
              <p className="text-black">{description}</p>
              <p className="text-lg font-semibold text-green-500">${amount} CLP</p>

              <button
                className="mt-5 bg-yellow-500 text-black font-bold py-2 px-4 rounded-full"
                onClick={iniciarTransaccionHandler}
              >
                Proceder al Pago
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 modal-backdrop"
          onClick={handleBackdropClick}
        >
          <div
            className="bg-white w-full max-w-lg mx-auto p-6 rounded-lg shadow-xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black focus:outline-none"
              onClick={onClose}
            >
              &times;
            </button>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Soldados Gym</h2>
              <p className="mt-2 text-gray-600">Para continuar con la compra, por favor inicia sesión o regístrate.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col">
                <input
                  type="email"
                  placeholder="Email"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex flex-col">
                <input
                  type="password"
                  placeholder="Contraseña"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Iniciar sesión
              </button>

              <button
                type="button"
                className="w-full py-2 mt-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                onClick={() => navigate('/Register')}
              >
                Registrarse
              </button>

              <p className="mt-4 text-sm text-center text-gray-600">
                ¿Olvidaste tu contraseña?{' '}
                <span className="text-blue-600 cursor-pointer hover:underline">Recupérala aquí</span>
              </p>
            </form>
            {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
          </div>
        </div>
      )}
    </>
  );
};

export default BuyModal;