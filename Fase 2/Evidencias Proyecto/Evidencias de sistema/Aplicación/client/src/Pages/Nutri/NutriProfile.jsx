import { useEffect, useState } from "react";
import { SideMenu } from "../../Components/SideMenu";
import axios from "axios";
import CancelIcon from "@mui/icons-material/Cancel";
import { toast } from "react-toastify";
import ProfileImage from "../../Components/ProfileImage";
import CreateIcon from '@mui/icons-material/Create';
import './NutriMenu.css'

const NutriProfile = ({ userInfo }) => {
  const [userData, setUserData] = useState({
    id: userInfo.id,
    name: userInfo.name,
    email: userInfo.email,
    weight: userInfo.weight,
    height: userInfo.height,
  });

  const [totalConsultas, setTotalConsultas] = useState(0);
  const [consultasTomadas, setConsultasTomadas] = useState(0);

  const [isModalTotalOpen, setIsModalTotalOpen] = useState(false);
  const [isModalTomadasOpen, setIsModalTomadasOpen] = useState(false);

  const [refresh, setRefresh] = useState(false);

  const [apoints, setApoints] = useState([]);

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
      const respuesta = await axios.put(
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

  useEffect(() => {
    console.log(apoints);
  }, [apoints]);

  useEffect(() => {
    const fetchConsultas = async () => {
      try {
        const respuesta = await axios.get(
          `${import.meta.env.VITE_API_URL}/nutriSchedule`
        );
        const consultas = respuesta.data;

        setApoints(consultas);

        setTotalConsultas(consultas.length);

        const consultasNoDisponibles = consultas.filter(
          (consulta) => !consulta.available
        );
        setConsultasTomadas(consultasNoDisponibles.length);
      } catch (error) {
        console.error(error);
      }
    };

    fetchConsultas();
  }, []);

  return (
    <div className="flex min-h-screen">
      <SideMenu />
      <div className="min-h-full flex w-full justify-start flex-col px-6 pt-32 pb-10 ">
        <div className="w-full pt-20 pb-10 flex px-6 gap-6 bg-slate-100 rounded-lg relative flex-col h-full justify-start items-center">
          <div className="absolute top-[-10%] left-[50%] transform -translate-x-1/2 fotoPerfil">
            <ProfileImage key={refresh} width={'150px'} height={'150px'} />
            <div className="absolute bottom-0 right-0">
              <label
                htmlFor="file-input"
                className="cursor-pointer bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
              >
                <CreateIcon/>
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
          {userInfo ? (
            <div className="text-center">
              <h1 className="text-4xl font-medium">{userInfo.name}</h1>
              <p className="text-gray-600 text-lg">{userInfo.email}</p>
            </div>
          ) : (
            <div className="animate-pulse 2 text-center">
              <div className="h-10 bg-gray-400 rounded-full w-48 mb-4"></div>
              <div className="h-4 bg-gray-400 rounded-full w-32"></div>
            </div>
          )}
          <div className="w-full mt-5 rounded-md bg-gray-200 flex-1 p-6">
            <div className="flex h-full space-x-4">
              <div
                onClick={() => setIsModalTotalOpen(true)}
                className="bg-blue-500 transition-all ease-in-out duration-150 hover:scale-[1.01] cursor-pointer text-white gap-1 text-center items-center flex justify-center flex-col flex-1 p-4 rounded-md"
              >
                <h2 className="text-3xl font-bold">Total de consultas:</h2>
                {totalConsultas && (
                  <p className="text-3xl font-semibold">{totalConsultas}</p>
                )}
              </div>
              <div className="bg-blue-500 transition-all ease-in-out duration-150 hover:scale-[1.01] cursor-pointer text-white gap-1 text-center items-center flex justify-center flex-col flex-1 p-4 rounded-md">
                <h2 className="text-3xl font-bold">Consultas pendientes</h2>
                <p className="text-3xl font-semibold">{consultasTomadas}</p>
              </div>
            </div>
          </div>
          <div className="w-full flex-1 flex bg-white">
            <h1>Hello</h1>
          </div>
        </div>
      </div>
      {isModalTotalOpen && (
        <div className="fixed z-20 inset-0 px-40 py-10 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="w-full h-full bg-white rounded-md p-6">
            <div className="w-full flex justify-end">
              <CancelIcon
                className="cursor-pointer text-blue-500"
                onClick={() => setIsModalTotalOpen(false)}
                sx={{ width: "50px", height: "50px" }}
              />
            </div>
            <div className="py-3">
              <h1 className="text-2xl font-semibold">Clases Totales</h1>
            </div>
            <div className="p-6 bg-slate-100 flex-1 max-h-[500px] overflow-y-auto">
              {apoints.length > 0
                ? apoints.map((apoint) => (
                    <div className="" key={apoint.nutri_schedule_id}>
                      <h1>{apoint.start_hour}</h1>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default NutriProfile;
