import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Logo from "../../assets/img/Logo.png";
import { sendEmail } from '../../Components/API/EmailSender';
import { toast } from "react-toastify";
import ChangePasswordTemplate from '../../assets/emailTemplate/ChangePasswordTemplate';
import { renderToStaticMarkup } from "react-dom/server";
import { requestPasswordReset } from '../../Components/API/sesion';
import { Button } from 'antd';

const RecoverPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loadingButton, setLoadingButton] = useState(false);

  const url = process.env.FRONTEND_URL;

  const generateEmailHTML = (props) => {
    const emailComponent = <ChangePasswordTemplate {...props} />;
    return renderToStaticMarkup(emailComponent);
  };

  const goto = (url) => {
    navigate(`/${url}`);
  };

  const onSubmit = async (data) => {
    setLoadingButton(true);
    try {
      const response = await requestPasswordReset((data.email));
      try {
        const emailHTML = generateEmailHTML({
          nombre: "Juan",
          resetLink: `${url}/RecoveryPassword?token=${response}`,
        });
        const payload = {
          data,
          subject: "Recuperar contraseña Soldado",
          html: emailHTML
        };
        await sendEmail(payload);
        setLoadingButton(false);
        toast.success("Se ha enviado un correo para recuperar la contraseña.");
      } catch (error) {
        setLoadingButton(false);
        console.error("Error al enviar el correo:", error);
        toast.error("Sucedió algo inesperado.");
      }
    } catch {
      setLoadingButton(false);
      toast.error("El email no existe en el sistema.");
    }
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <div className="flex justify-center items-center pb-5 ">
          <img src={Logo} alt="Logo" className="w-50 h-auto" onClick={() => goto("")} />
        </div>
        <h4 className='w-full text-black m-4'>Recuperar contraseña </h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "El correo es obligatorio.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Por favor, ingresa un correo válido."
                }
              })}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
          <Button
            type="primary"
            htmlType="submit"
            loading={loadingButton}
            className="w-full !bg-purple-600 !text-white p-6 rounded-lg mb-4">
            Recuperar contraseña
          </Button>
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