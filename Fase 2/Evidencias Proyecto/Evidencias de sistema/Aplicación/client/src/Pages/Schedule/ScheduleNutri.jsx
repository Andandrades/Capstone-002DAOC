import { useEffect, useState } from "react";
import { UserNavBar } from "../../Components/UserNavBar";
import { NutriHourCard } from "../../Components/NutriHourCard";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "./ScheduleNutriStyle.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Spinner from "../../Components/Spinner";


const ScheduleNutri = ({ userId }) => {

  const [date, setDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [scheduled, setIsScheduled] = useState(false);
  const [loading, setLoading] = useState(true);

  const today = new Date()

  //Obtener Horas por Fecha (Por Default es la fecha del dia de la consulta)
  const getHours = async () => {
    if (!date) return
    const formattedDate = date.toLocaleDateString('en-CA');
    try {
      const resultado = await fetch(
        `${import.meta.env.VITE_API_URL}/nutriScheduleDate/${formattedDate
        }`,

        {
          method: "GET",
          credentials : 'include'
        }

      );
      const data = await resultado.json();
      const sortedAppointments = data.sort((a, b) => {
        return a.start_hour.localeCompare(b.start_hour); // Comparar cadenas de hora
      });
      setAppointments(sortedAppointments);

    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getHours();
  }, []);


  useEffect(() => {
    getHours();
  }, [date, scheduled]);

  const openModal = async () => {
    setIsOpen(!isOpen);
  };

  const handleDateSelect = (selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
      setIsOpen(false);
    }
  };

  return (
    <section className="w-full flex justify-start relative flex-col bgImageNutri">
      <div className="z-10 mb-40  text-white">
        <div className="w-full flex justify-center mt-12 text-center">
          <h1 className="text-3xl font-bold">Nutricionista</h1>
        </div>
        <div className="px-6 mt-10 ">
          <button
            onClick={() => openModal()}
            className="bg-button-primary text-white py-3 rounded-full"
          >
            Seleccionar Fecha
          </button>
        </div>
        <div className=" w-full flex justify-center py-5 font-semibold text-lg">
          <h1>{`Horas del dia: ${date.toLocaleDateString()}`}</h1>
        </div>
        {loading ? (
          <div className="relative flex justify-center items-center min-h-[200px]">
            <Spinner />
          </div>
        ) : (
          <div className="w-full px-6 flex mt-4 flex-col gap-5 justify-start">
            {appointments.length > 0 ? (
              appointments.map((appoint) => (
                <NutriHourCard
                  key={appoint.nutri_schedule_id}
                  appointments={appoint}
                  userId={userId}
                  setIsScheduled={setIsScheduled}
                  scheduled={scheduled}
                />
              ))
            ) : (
              <div className="w-full bg-white mt-5 p-5 rounded flex justify-center items-center gap-8">
                <HelpOutlineIcon
                  sx={{ fill: "#f1c21b", width: "40px", height: "40px" }}
                />
                <p className="font-semibold text-gray-500">
                  No hay consultas disponibles.
                </p>
              </div>
            )}
          </div>
        )}
        {isOpen ? (
          <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div>
              <div className="bg-white p-4 rounded-lg">
                <div className="w-full flex justify-end">
                  <HighlightOffIcon
                    className="text-black"
                    onClick={() => openModal()}
                  ></HighlightOffIcon>
                </div>
                <DayPicker
                  showOutsideDays
                  className="text-black scale-90"
                  mode="single"
                  selected={date}
                  onSelect={handleDateSelect}
                  fromDate={today}
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <UserNavBar />
    </section>
  );
};

export default ScheduleNutri;
