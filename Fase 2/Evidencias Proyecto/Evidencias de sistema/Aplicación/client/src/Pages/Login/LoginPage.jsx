import React, { useState } from "react";
import Logo from "../../assets/img/Logo.png";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../Components/API/UserContext";
import { toast } from "react-toastify";

const LoginPage = () => {
  const { fetchAuthData } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const goto = (url) => {
    navigate(`/${url}`);
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
        toast.error("Usuario o contraseña invalidos.");
        return;
      }

      fetchAuthData();
    } catch (err) {
      toast.error("Usuario o contraseña invalidos.");
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <div className="flex justify-center items-center ">
          <img src={Logo  } alt="Logo" className="w-50 h-auto" onClick={() => goto("")} />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 ">Soldados Gym</h2>
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
              onClick={() => goto("recover")}
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
