import { useEffect, useState } from "react";
import { SideMenu } from "../../Components/SideMenu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";
import CancelIcon from "@mui/icons-material/Cancel";
import { toast } from "react-toastify";

const NutriProfile = ({ userInfo }) => {
  const [userData, setUserData] = useState({
    id: userInfo.id,
    name: userInfo.name,
    email: userInfo.email,
    weight: userInfo.weight,
    height: userInfo.height,
  });

  const [imageUrl, setImageUrl] = useState(null);

  const [totalConsultas, setTotalConsultas] = useState(0);
  const [consultasTomadas, setConsultasTomadas] = useState(0);

  const [isModalTotalOpen, setIsModalTotalOpen] = useState(false);
  const [isModalTomadasOpen, setIsModalTomadasOpen] = useState(false);

  const [archivo, setArchivo] = useState(null);

  const [apoints, setApoints] = useState([]);

  const handleChangeFile = (e) => {
    setArchivo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!archivo) {
      alert("Por Favor, seleccione un archivo");
    }

    const formData = new FormData();

    formData.append("profile_picture", archivo);

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

      toast.success("Imagen subida existosamente");
    } catch (error) {
      console.error(error);
      toast.error("Hubo Un problema al subir la imagen");
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

  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/getProfilePicture/${userData.id}`,
          { responseType: "blob" } // Asegúrate de que la respuesta es un blob (imagen)
        );
        // Crear un URL a partir del Blob
        const imageBlob = response.data;
        const imageObjectUrl = URL.createObjectURL(imageBlob);
        setImageUrl(imageObjectUrl);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchProfilePicture();
  }, [userData.id]);

  return (
    <div className="flex min-h-screen">
      <SideMenu />
      <div className="min-h-full flex w-full justify-start flex-col px-6 pt-32 pb-10 ">
        <div className="w-full pt-20 flex px-6 bg-gray-100 relative flex-col h-full justify-start items-center">
          <div className="absolute top-[-10%] left-[50%] transform -translate-x-1/2">
            {imageUrl ? (
              <img
                className=" rounded-full"
                src={imageUrl}
                alt="Profile"
                style={{ width: "150px", height: "150px" }}
              />
            ) : (
              <AccountCircleIcon
                className="text-gray-400"
                sx={{ width: "140px", height: "140px" }}
              />
            )}
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="file"
              accept="image/*"
              onChange={handleChangeFile}
            ></input>
            <button type="submit">Subir foto</button>
          </form>
          {userInfo ? (
            <div className="text-center">
              <h1 className="text-4xl">{userInfo.name}</h1>
              <p className="text-gray-600 text-base">{userInfo.email}</p>
            </div>
          ) : (
            <div className="animate-pulse 2 text-center">
              <div className="h-10 bg-gray-400 rounded-full w-48 mb-4"></div>
              <div className="h-4 bg-gray-400 rounded-full w-32"></div>
            </div>
          )}
          <div className="w-full mt-5 rounded-md bg-gray-200 h-full p-6">
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
