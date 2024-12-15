import React, { useEffect, useState } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Spinner from "./Spinner";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import UsersProfilePicture from "./UsersProfilePicture";
import { useNavigate } from "react-router-dom";

export const UsersListCard = ({ setUserModal, schedule }) => {
  const [scheduleUsers, setScheduledUsers] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchScheduledUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/scheduleinfo/${schedule.gym_schedule_id}`,{credentials: "include",}
      );
      if (!response.ok) {
        throw new Error("Error al obtener los usuarios agendados");
      }
      const data = await response.json();
      setScheduledUsers(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching scheduled users:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScheduledUsers();
  }, []);

  const handleRutinaClick = (classId) => {
    navigate(`/Admin/Clases/Rutina/${classId}`);
  };

  return (
    <div className="fixed py-32 z-20 inset-0 bg-black px-6 bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white w-full rounded-lg py-6 px-2 relative">
        {loading && (
          <div className="absolute inset-0 z-50 bg-white bg-opacity-70 flex justify-center items-center">
            <Spinner />
          </div>
        )}
        <div className="w-full flex justify-end">
          <HighlightOffIcon
            className="text-black cursor-pointer"
            onClick={() => setUserModal(false)}
          ></HighlightOffIcon>
        </div>
        <div className="flex justify-around items-center flex-row">
          <h1 className="font-semibold">Información Usuarios</h1>
        </div>
        <div>
          {scheduleUsers?.length > 0 ? (
            <div className="bg-gray-100 rounded-lg w-full my-6 min-h-[40vh] overflow-auto">
              {scheduleUsers.map((reservation, index) => (
                <div
                  key={index}
                  className="p-2 flex justify-between bg-white"
                >
                  <div className="flex gap-2 justify-center items-center">
                    <UsersProfilePicture
                      userId={reservation.client_id}
                      height={"30px"}
                      width={"30px"}
                    />
                    <p className="truncate ...">{reservation.client_name}</p>
                  </div>
                  <button
                    onClick={() => handleRutinaClick(reservation.class_id)}
                    className="bg-green-400 px-5 rounded-full"
                  >
                    Rutina
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-100 rounded-lg flex flex-col justify-center items-center w-full my-6 min-h-[40vh]">
              <SearchOffIcon
                className="text-gray-500"
                sx={{ width: "100px", height: "100px" }}
              />
              <span className="">Clase sin reservas</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
