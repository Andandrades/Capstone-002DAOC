import { useState, useEffect } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";

//Componente para cargar la imagen de perfil de usuarios los cuales no son el usuario logeado
const UsersProfilePicture = ({ userId, width, height }) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/getProfilePicture/${userId}`,
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

    if (userId) {
      fetchProfilePicture();
    }
  }, [userId]);

  return (
    <>
      {imageUrl ? (
        <img
          className="rounded-full"
          src={imageUrl}
          alt="Profile"
          style={{ width: width, height: height }}
        />
      ) : (
        <AccountCircleIcon
          className="text-gray-400"
          sx={{ width: width, height: height }}
        />
      )}
    </>
  );
};

export default UsersProfilePicture;
