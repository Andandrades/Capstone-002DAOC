import { useEffect, useState } from "react";
import { UserNavBar } from "../../Components/UserNavBar";
import { NutriHourCard } from "../../Components/NutriHourCard";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import "./ScheduleNutriStyle.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";


const ScheduleNutri = ({ userId }) => {

  const [date, setDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [scheduled, setIsScheduled] = useState(false);

  //Obtener Horas por Fecha (Por Default es la fecha del dia de la consulta)
  const getHours = async () => {
    if (!date) return;

    try {
      const resultado = await fetch(
        `${import.meta.env.VITE_API_URL}/nutriScheduleDate/${
          date.toISOString().split("T")[0]
        }`,
        {
          method: "GET",
        }
      );

      const data = await resultado.json();
      // Ordenar las citas por hora (asumiendo que `start_hour` está en formato "HH:mm")
      const sortedAppointments = data.sort((a, b) => {
        return a.start_hour.localeCompare(b.start_hour); // Comparar cadenas de hora
      });
      setAppointments(sortedAppointments);
    } catch (error) {
      console.log(error);
    }
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
    <section className="w-full h-screen flex justify-start relative flex-col bgImageNutri">
      <div className="z-20 text-white">
        <div className="w-full flex justify-center mt-12 text-center">
          <h1 className="text-3xl font-bold">Nutricionista</h1>
        </div>
        <div className="px-6 mt-10">
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
            <p>No encontrado</p>
          )}
        </div>
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
