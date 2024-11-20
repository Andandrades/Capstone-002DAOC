import CreateIcon from '@mui/icons-material/Create';
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Logout } from "../../Components/API/sesion";
import { useUser } from "../../Components/API/UserContext";
import { ProfileImage } from "../../Components/ProfileImage";
import { UserNavBar } from "../../Components/UserNavBar";

const ProfilePage = () => {
  const { userData } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();


  const handleChangeFile = async (e) => {
    e.preventDefault();

    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      alert("Por favor, seleccione un archivo");
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

  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);



  const goToHome = () => {
    navigate("/inicio");
  };

  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Las contraseñas no coinciden.",
      });
    }
  };

  return (
    <div className="pb-10 flex justify-center bg-[radial-gradient(circle, rgb(255, 255, 255) 8%, rgb(177, 174, 174) 100%)]">
      <section className="w-11/12 flex flex-col items-center pb-10 rounded-b-3xl shadow-lg">
        <form
          className="w-full max-w-2xl bg-white rounded-lg pt-8 space-y-6 border-2"
          onSubmit={handleSubmit(onSubmit)}
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
            {userData.name}
          </p>

          <div className="flex flex-col justify-center w-[90%] mx-auto space-y-1">

            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={userData.email}
              {...register("email")}
              className="text-sm font-medium text-gray-700 bg-indigo-100 border-2 p-2 rounded-md"
            />
            {errors.email && (
              <span className="text-red-600 text-sm">
                {errors.email.message}
              </span>
            )}

            <label
              htmlFor="weight"
              className="text-sm font-medium text-gray-700"
            >
              Peso
            </label>
            <input
              type="text"
              name="weight"
              id="weight"
              defaultValue={1}
              {...register("weight", { required: "El peso es obligatorio" })}
              className="text-sm font-medium text-gray-700 bg-indigo-100 border-2 p-2 rounded-md"
            />
            {errors.weight && (
              <span className="text-red-600 text-sm">
                {errors.weight.message}
              </span>
            )}


            <label
              htmlFor="height"
              className="text-sm font-medium text-gray-700"
            >
              Altura
            </label>
            <input
              type="text"
              name="height"
              id="height"
              {...register("height", { required: "La altura es obligatoria" })}
              className="text-sm font-medium text-gray-700 bg-indigo-100 border-2 p-2 rounded-md"
            />
            {errors.height && (
              <span className="text-red-600 text-sm">
                {errors.height.message}
              </span>
            )}
            <label
              htmlFor="password"
              className="text-sm  font-medium text-gray-700"
            >
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="new-password"
              {...register("password", {
                required: "La contraseña es obligatoria",
              })}
              className="block w-full rounded-md py-2 px-4 bg-indigo-100 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600"
            />
            {errors.password && (
              <span className="text-red-600 text-sm">
                {errors.password.message}
              </span>
            )}
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-gray-700"
            >
              Confirmar contraseña
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              autoComplete="new-password"
              {...register("confirmPassword", {
                required: "Debe confirmar la contraseña",
              })}
              className="block w-full rounded-md py-2 px-4 bg-indigo-100 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600"
            />
            {errors.confirmPassword && (
              <span className="text-red-600 text-sm">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          {/* Botones de Cancelar y Confirmar */}
          <div className="mt-6 flex items-center justify-around gap-x-6 pb-8">
            <button
              type="reset"
              className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:outline-none"
              onClick={goToHome}
            >
              Volver al menú
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              Confirmar
            </button>
          </div>
        </form>
      </section>
      <UserNavBar />
    </div>
  );
};

export default ProfilePage;