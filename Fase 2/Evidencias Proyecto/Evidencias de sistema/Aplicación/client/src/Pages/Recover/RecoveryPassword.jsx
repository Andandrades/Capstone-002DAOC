import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Logo from "../../assets/img/Logo.png";
import { toast } from "react-toastify";

const RecoveryPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token'); 
  const { register, handleSubmit, getValues } = useForm();
  const URL = `${import.meta.env.VITE_API_URL}`;

  const onSubmit = async () => {
    const { password, confirmPassword } = getValues();
    if (password.length < 8) {
      toast.warning("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      toast.warning("Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await fetch(`${URL}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword: password, token: token }),
        credentials : 'include'
      });

      if (response.ok) {
        toast.success("Contraseña actualizada correctamente.");
        navigate("/login");
      } else {
        const data = await response.json();
        toast.error(data.message || "Ocurrió un error inesperado.");
      }
    } catch (error) {
      console.error("Error al cambiar la contraseña:", error);
      toast.error("Ocurrió un error inesperado.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <div className="flex justify-center items-center mb-6 flex-col">
        <img src={Logo} alt="Logo" className="w-50 h-auto" onClick={() => navigate("/")} />
        <h2>Actualizar Contraseña</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Nueva contraseña"
              {...register("password", { required: true })}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Confirmar contraseña"
              {...register("confirmPassword", { required: true })}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 mb-4"
          >
            Cambiar contraseña
          </button>
          <span
            className="text-purple-600 cursor-pointer underline mt-4"
            onClick={() => navigate(`/login`)}
          >
            Volver atrás
          </span>
        </form>
      </div>
    </div>
  );
};

export default RecoveryPassword;