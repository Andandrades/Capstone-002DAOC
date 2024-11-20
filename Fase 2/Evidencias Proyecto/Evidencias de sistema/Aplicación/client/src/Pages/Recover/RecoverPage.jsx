import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Logo from "../../assets/img/Logo.png";
import { sendEmail } from '../../Components/API/EmailSender';
import { toast } from "react-toastify";
import ChangePasswordTemplate from '../../assets/emailTemplate/ChangePasswordTemplate';
import { renderToStaticMarkup } from "react-dom/server";

const RecoverPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const generateEmailHTML = (props) => {
    const emailComponent = <ChangePasswordTemplate {...props} />;
    return renderToStaticMarkup(emailComponent);
  };

  const onSubmit = async (data) => {

    const emailHTML = generateEmailHTML({
      nombre: "Juan",
      resetLink: "https://miaplicacion.com/reset-password?token=abc123",
    });

    const payload = {
      data,
      subject: "Recuperar contraseña Soldado",
      html: emailHTML
    };

    try {
      await sendEmail(payload);
      toast.success("Se ha enviado un correo para recuperar la contraseña.");
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      toast.error("Sucedió algo inesperado.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <div className="flex justify-center items-center mb-6 flex-col">
          <img src={Logo} alt="Logo" className="w-50 h-auto" />
          <h2>Ingrese su E-mail </h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "El correo es obligatorio.", // Mensaje cuando el campo está vacío
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Por favor, ingresa un correo válido." // Mensaje cuando el correo no es válido
                }
              })}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 mb-4"
          >
            Recuperar contraseña
          </button>
          <span
            className="text-purple-600 cursor-pointer underline mt-4 text-gray-600"
            onClick={() => navigate(`/login`)}
          >
            Volver atrás
          </span>
        </form>
      </div>
    </div>
  );
};

export default RecoverPage;
