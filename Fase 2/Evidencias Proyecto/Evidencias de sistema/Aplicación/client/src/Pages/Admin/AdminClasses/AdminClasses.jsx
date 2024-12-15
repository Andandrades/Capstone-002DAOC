import { useState, useEffect } from "react";
import { NavBarAdmin } from "../../../Components/NavBarAdmin";
import CreateGymHourModal from "../../../Components/CreateGymHourModal";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { GymHourEditCard } from "../../../Components/GymHourEditCard";
import { DayPicker } from "react-day-picker";

import "react-day-picker/dist/style.css";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useUser } from "../../../Components/API/UserContext";
import Spinner from "../../../Components/Spinner";

const AdminClasses = () => {
  const { userData } = useUser();
  const [scheduleInfo, setScheduleInfo] = useState([]);
  const [dayModal, setDayModal] = useState();
  const [date, setDate] = useState(new Date());
  const [createModal, setCreateModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchGymHours = async (date) => {
    setLoading(true)
    const formattedDate = date.toLocaleDateString('en-CA');

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/gymHoursDate/${formattedDate}`,{credentials: "include",}
      );
      const data = await response.json();
      setScheduleInfo(data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false)
  };

  useEffect(() => {
    fetchGymHours(date);
  }, [date]);

  const openModalDays = () => {
    setDayModal(!dayModal);
  };

  const handleDateSelect = (selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
      setDayModal(false);
      fetchGymHours(selectedDate);
    }
  };

  return (
    <>
      <div className="w-full min-h-[100vh] flex justify-start relative pb-32 flex-col bg-slate-200">
        <div className="w-full text-2xl font-semibold flex justify-center py-10">
          <h1>Administrar Clases</h1>
        </div>
        <div className="w-full flex justify-center">
          <div className="px-6 w-full">
            <button
              onClick={() => openModalDays()}
              className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
            >
              Seleccionar Día
            </button>
          </div>
          <div className="flex justify-end pr-6">
            <button onClick={() => setCreateModal(true)} className="w-auto">
              <AddCircleIcon
                sx={{ color: "#4B69FE", height: "40px", width: "40px" }}
              />
            </button>
          </div>
        </div>
        {loading ? (
          <div className="relative flex justify-center items-center min-h-[200px]">
            <Spinner />
          </div>
        ) : (
          <div className="px-6">
            {scheduleInfo.length > 0 ? (
              scheduleInfo.map((schedue) => (
                <GymHourEditCard
                  refreshGymHours={() => fetchGymHours(date)}
                  key={schedue.gym_schedule_id}
                  schedule={schedue}
                />
              ))
            ) : (
              <div className="w-full flex justify-center text-center pt-10">
                <h1>No se encuentran clases registradas para este día</h1>
              </div>
            )}
          </div>
        )}
        {dayModal ? (
          <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="bg-white p-3 rounded-lg">
              <div className="w-full flex justify-end">
                <HighlightOffIcon
                  className="text-black cursor-pointer"
                  onClick={() => openModalDays()}
                ></HighlightOffIcon>
              </div>
              <DayPicker
                showOutsideDays
                className="text-black scale-90"
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
              />
            </div>
          </div>
        ) : null}
        {createModal ? (
          <CreateGymHourModal
            storedUser={userData.id}
            setCreateModal={setCreateModal}
            refreshGymHours={() => fetchGymHours(date)}
          />
        ) : null}
      </div>
      <NavBarAdmin />
    </>
  );
};

export default AdminClasses;
