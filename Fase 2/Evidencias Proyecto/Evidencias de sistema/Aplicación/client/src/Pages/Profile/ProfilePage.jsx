import CreateIcon from '@mui/icons-material/Create';
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ProfileImage from "../../Components/ProfileImage";
import { UserNavBar } from "../../Components/UserNavBar";
import { ActualizarUsuario } from '../../Components/API/Users';
import { useUser } from '../../Components/API/UserContext';
import { changePassword } from '../../Components/API/sesion';
import { Button } from 'antd';

const ProfilePage = () => {
  const { register: registerProfile, handleSubmit: handleSubmitProfile, formState: { errors: errorsProfile } } = useForm();
  const { register: registerSecurity, handleSubmit: handleSubmitSecurity, formState: { errors: errorsSecurity } } = useForm();
  const [loadingButton, setLoadingButton] = useState(false);

  const [showSecurity, setShowSecurity] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const { userData } = useUser();
  const userDataString = localStorage.getItem("userData");
  const LocaluserData = userDataString ? JSON.parse(userDataString) : null;
  const handleChangeFile = async (e) => {
    e.preventDefault();
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      alert("Por favor, seleccione un archivo");
      return;
    }
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Solo se permiten imágenes (JPG, PNG, GIF).");
      return;
    }
    const formData = new FormData();
    formData.append("profile_picture", selectedFile);
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/uploadProfilePicture/${userData.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Imagen subida exitosamente");
      setRefresh(!refresh);
    } catch (error) {
      console.error(error);
      toast.error("Hubo un problema al subir la imagen");
    }
  };

  const ChangePassword = async (e) => {
    setLoadingButton(true);
    const { password, oldPassword, confirmPassword } = e
    if (password !== confirmPassword) {
      setLoadingButton(false);
      return (toast.info("Contraseña nueva y Comfirmar contraseña nueva no coinciden"))
    }
    try {
      await changePassword(oldPassword, password);
      setLoadingButton(false);
      toast.success("Contraseña cambiada con éxito");
    } catch (error) {
      setLoadingButton(false);
      if (error.message === "La contraseña actual es incorrecta") {
        toast.error("La contraseña actual es incorrecta.")
      }
    }
  };

  const onSubmit = (data) => {
    setLoadingButton(true);
    const Payload = { name: userData.name, email: userData.email, weight: data.weight, height: data.height,gender: data.Gender, fk_rol_id: userData.role };
    try {
      ActualizarUsuario(userData.id, Payload);
      setLoadingButton(false);
      toast.success("Datos actualizados correctamente.")
    } catch {
      setLoadingButton(false);
      toast.error("sucedio un error inesperado al intentar actualizar tus datos.")
    }
  };

  const toggleSecuritySection = () => {
    setShowSecurity((prev) => !prev);
  };



  const SecurityForm = ({ register, errors }) => (
    <div className="mt-4 space-y-4  p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-gray-800">Configuración de Seguridad</h3>
      <form onSubmit={handleSubmitSecurity(ChangePassword)} className="space-y-4">
        <label htmlFor="oldPassword" className="text-sm font-medium text-gray-700">
          Contraseña actual
        </label>
        <input
          type="password"
          name="oldPassword"
          id="oldPassword"
          {...registerSecurity("oldPassword", {
            required: "La contraseña original es obligatoria",
          })}
          className="block w-full rounded-md py-2 px-4 bg-indigo-100 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600"
        />
        <label htmlFor="password" className="text-sm font-medium text-gray-700">
          Contraseña nueva
        </label>
        <input
          type="password"
          name="password"
          id="password"
          {...registerSecurity("password", {
            required: "La contraseña es obligatoria",
          })}
          className="block w-full rounded-md py-2 px-4 bg-indigo-100 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600"
        />
        <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
          Confirmar contraseña nueva
        </label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          {...registerSecurity("confirmPassword", {
            required: "Debe confirmar la contraseña",
          })}
          className="block w-full rounded-md py-2 px-4 bg-indigo-100 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600"
        />


        <div className="mt-6 flex items-center justify-around gap-x-6 pb-8">
          <Button
            type="primary"
            htmlType="submit"
            loading={loadingButton}
            className="w-full !bg-purple-600 !text-white p-6 rounded-lg mb-4">
            Cambiar contraseña
          </Button>
        </div>
      </form>
    </div>
  );


  return (
    <div className="flex flex-col items-center">
      <div className="pb-10 flex justify-center bg-slate-200 8%, rgb(177, 174, 174) 100%)] pt-5 w-screen ">
        <section className="flex flex-col items-center pb-10 rounded-b-3xl shadow-lg w-[90%]  ">
          <form
            className="w-full bg-white rounded-lg pt-8 space-y-6 border-2  "
            onSubmit={handleSubmitProfile(onSubmit)}
          >
            <h1 className="text-4xl font-bold text-black text-center mb-6">
              Mi Perfil
            </h1>
            <div className="flex flex-col items-center justify-center relative">
              <div className="flex flex-col items-center justify-center fotoPerfil relative">
                <div className="rounded-full bg-gray-300 shadow-[24px_24px_72px_#bebebe,-24px_-24px_72px_#ffffff] flex items-center justify-center p-4">
                  <ProfileImage key={refresh} height={"100px"} width={"100px"} />
                </div>
                <div className="absolute bottom-0 right-0">
                  <label
                    htmlFor="file-input"
                    className="cursor-pointer bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <CreateIcon />
                  </label>
                  <input
                    type="file"
                    id="file-input"
                    accept="image/*"
                    className="hidden"
                    onChange={handleChangeFile}
                  />
                </div>
              </div>
            </div>
            <p className="text-gray-900 mt-2 text-lg font-medium text-center">
              {LocaluserData.name}
            </p>
            <div className="flex flex-col justify-center w-[90%]  mx-auto space-y-4">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={LocaluserData.email}
                {...registerProfile("email")}
                className="text-sm font-medium text-gray-700 bg-indigo-100 border-2 p-2 rounded-md"
              />
              {errorsProfile.email && (
                <span className="text-red-600 text-sm">{errorsProfile.email.message}</span>
              )}

              <label htmlFor="weight" className="text-sm font-medium text-gray-700">
                Peso
              </label>
              <input
                type="number"
                name="weight"
                id="weight"
                defaultValue={LocaluserData.weight}
                {...registerProfile("weight", { required: "El peso es obligatorio" })}
                className="text-sm font-medium text-gray-700 bg-indigo-100 border-2 p-2 rounded-md"
              />
              {errorsProfile.weight && (
                <span className="text-red-600 text-sm">{errorsProfile.weight.message}</span>
              )}

              <label htmlFor="height" className="text-sm font-medium text-gray-700">
                Altura
              </label>
              <input
                type="number"
                name="height"
                id="height"
                defaultValue={LocaluserData.height}
                {...registerProfile("height", { required: "La altura es obligatoria" })}
                className="text-sm font-medium text-gray-700 bg-indigo-100 border-2 p-2 rounded-md"
              />
              {errorsProfile.height && (
                <span className="text-red-600 text-sm">{errorsProfile.height.message}</span>
              )}
              <label htmlFor="height" className="text-sm font-medium text-gray-700">
                Genero
              </label>
              <select
                {...registerProfile("Gender", { required: "El género es obligatorio" })}
                className="text-sm font-medium text-gray-700 bg-indigo-100 border-2 p-2 rounded-md"
                defaultValue={LocaluserData?.gender || ""}
                >
                <option value="" disabled>Selecciona un género</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
                <option value="X">Otro</option>
              </select>
              {errorsProfile.Gender && (
                <span className="text-red-600 text-sm">{errorsProfile.Gender.message}</span>
              )}

            </div>
            <div className="mt-6 flex items-center justify-around gap-x-6 pb-8">

              <Button
                type="primary"
                htmlType="submit"
                loading={loadingButton}
                className="w-[75%] !bg-purple-600 !text-white p-6 rounded-lg mb-4">
                Actualizar datos
              </Button>
            </div>
          </form>

          <div className="w-full max-w-2xl mx-auto mt-10 bg-white rounded-lg p-6 border-2 shadow-lg">
            <button
              type="button"
              onClick={toggleSecuritySection}
              className="w-full text-left text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Seguridad
            </button>

            {showSecurity && <SecurityForm register={registerSecurity} errors={errorsSecurity} />}
          </div>
        </section>
      </div>
      <UserNavBar />
    </div>
  );
};

export default ProfilePage;
