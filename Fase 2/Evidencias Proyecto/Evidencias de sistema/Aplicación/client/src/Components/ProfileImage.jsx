import {useState, useEffect} from "react";
import { useUser } from '../Components/API/UserContext';  
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";

export const ProfileImage = () => {

    const {userData} = useUser();


  const [imageUrl, setImageUrl] = useState(null);

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
  }, [userData]);
  return (
    <>
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
    </>
  );
};
