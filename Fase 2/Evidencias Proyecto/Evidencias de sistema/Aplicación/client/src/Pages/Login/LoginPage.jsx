import React, { useState } from "react";
import Registrate from "../../assets/img/Registrate.webp";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../Components/API/UserContext";

const LoginPage = () => {
  const { fetchAuthData } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const goto = (url) => {
    navigate(`/recover`);
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

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Error en el servidor");
        return;
      }

      fetchAuthData();
    } catch (err) {
      setError("Error de conexión con el servidor");
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <div className="flex justify-center items-center mb-6">
          <img src={Registrate} alt="Logo" className="w-48 h-auto" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Soldados Gym</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 mb-4"
          >
            Iniciar sesión
          </button>

          <button
            type="button"
            onClick={() => goto("Register")}
            className="w-full border-2 border-purple-600 text-purple-600 py-3 rounded-lg hover:bg-gray-100"
          >
            Registrarse
          </button>

          <p className="mt-4 text-gray-600">
            ¿Olvidaste tu contraseña?{" "}
            <span
              onClick={() => goto()}
              className="text-purple-600 cursor-pointer underline"
            >
              Recupérala aquí
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;