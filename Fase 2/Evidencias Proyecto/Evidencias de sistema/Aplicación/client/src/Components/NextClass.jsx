import External from "../assets/External.svg";
import Clock from "../assets/Clock.svg";
import Verify from "../assets/Verified.svg";
import Profile from "../assets/User.svg";
import { useUser } from "./API/UserContext";
import { useNavigate } from "react-router-dom";

export const NextClass = ({ Data, buttonNavigate, tipo}) => {
    const navigate = useNavigate();
    const { userData } = useUser();
    const {schedule_date} =  Data;
    if (!Data || !Data.schedule_date) {
        return (
            <div className="flex justify-center items-center bg-white px-4 py-6 rounded-lg text-[20px] border border-gray-300 flex-col">
                <p>No hay {tipo} pendientes.</p>
                <button className="w-full bg-button-primary mt-5 py-2 rounded-lg" onClick={() => { navigate(buttonNavigate) }}>
                    <p className="text-white">ver horarios de clases</p>
                </button>
            </div>
        );
    }

    const scheduledDate = new Date(Data.schedule_date);
    const day = scheduledDate.getDate();
    const month = scheduledDate.toLocaleString('es-ES', { month: 'long' });

    return (
        <div className="w-full">
            {Data && Object.keys(Data).length > 0 ? (
                <div className="w-full flex justify-between bg-white rounded-xl">
                    <div className="px-3 w-[20%] bg-green-400 flex rounded-l-xl justify-center items-center flex-col ">
                        <span className="font-bold text-xl">{day}</span>
                        <span className="text-[14px]">{month}</span>
                    </div>
                    <div className="flex justify-start w-[65%] pl-3 py-1 flex-col">
                        <h1 className="font-bold text-center">Inicio: {Data.start_hour}</h1>

                        <div className="w-full">
                            <ul className="flex justify-around pt-4">
                                <li className="flex flex-col justify-center items-center">
                                    <img src={Profile} className="w-[20px]" alt="userIcon" />
                                    <p className="text-[12px]">{userData?.name || 'Usuario'}</p>
                                </li>
                                <li className="flex flex-col justify-center items-center">
                                    <img src={Clock} className="w-[20px]" alt="Clock" />
                                    <p className="text-[12px]">1 Hora</p>
                                </li>
                                <li className="flex flex-col justify-center items-center">
                                    <img src={Verify} className="w-[20px]" alt="Verified" />
                                    <p className="text-[12px]">{Data.actual_cap} Reservas</p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="w-[15%] flex justify-center items-center bg-button-primary rounded-r-xl">
                        <img className="w-[30px]" src={External} alt="External" />
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center bg-white px-4 py-6 rounded-lg text-[20px] border border-gray-300 flex-col">
                    <p>No se encontraron siguientes clases</p>
                </div>

            )}
        </div>
    );
};
