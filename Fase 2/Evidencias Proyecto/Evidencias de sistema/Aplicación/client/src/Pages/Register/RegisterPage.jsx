import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import registrate from "../../assets/img/Registrate.webp";
import { Register } from "../../Components/API/Endpoints";
import { sendEmail } from "../../Components/API/EmailSender";
import { toast } from "react-toastify";
import ConfirmRegisterTemplate from "../../assets/emailTemplate/confirmRegisterTemplate";
import { renderToStaticMarkup } from "react-dom/server";
import "./RegisterStyle.css";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Función para generar el HTML del correo
  const generateEmailHTML = (props) => {
    const emailComponent = <ConfirmRegisterTemplate {...props} />;
    return renderToStaticMarkup(emailComponent);
  };

  // Función para manejar el registro
  const onSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.info("Las contraseñas no coinciden.");
      return;
    }

    const payload = {
      name: name,
      email: email,
      password: password,
      fk_rol_id: 1,
    };

    Register(payload)
      .then(async (response) => {
        console.log("response", response);
        toast.success(`Usuario registrado correctamente: ${response.message}`);

        // Generar el contenido del correo
        const emailHTML = generateEmailHTML({
          nombre: "hola",
          email: "@gmail.cl" ,
        });

        // Configuración del correo
        const emailPayload = {
          data: { email },
          subject: "¡Bienvenido a Soldado Gym!",
          html: emailHTML,
        };

        try {
          // Enviar el correo de confirmación
          await sendEmail(emailPayload);
          toast.success("Correo de confirmación enviado.");
        } catch (error) {
          console.error("Error al enviar el correo de confirmación:", error);
          toast.error("No se pudo enviar el correo de confirmación.");
        }

        // Redirigir al login después de 2 segundos
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      })
      .catch(error => {
        console.log("error", error);
        toast.error(`Error al registrarte: ${error.message}`);
      });
  };

  return (
    <div className="register-container flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <form onSubmit={onSubmit} className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <div className="logo mb-4">
          <img src={registrate} alt="Registro" className="mx-auto w-24 h-auto" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">Registrarse</h2>

        <div className="input-group mb-4">
          <label htmlFor="name" className="block text-gray-700 mb-2">Nombre de usuario</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="input-group mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="input-group mb-4">
          <label htmlFor="password" className="block text-gray-700 mb-2">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="input-group mb-6">
          <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">Confirmar Contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button type="submit" className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-200 btn-primary">
          Registrarse
        </button>
        <button type="button" className="w-full mt-4 text-indigo-500 py-2 hover:underline" onClick={() => navigate('/login')}>
          Volver
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
