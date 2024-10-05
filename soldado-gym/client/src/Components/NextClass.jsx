import External from "../assets/External.svg"
import Clock from "../assets/Clock.svg"
import Verify from "../assets/Verified.svg"
import Profile from "../assets/User.svg"

export const NextClass = () => {
    return (
        <div className="w-full flex justify-between bg-white rounded-xl">
            <div className=" px-3 w-[20%] bg-green-400 flex rounded-l-xl justify-center items-center flex-col h-full">
                <span className="font-bold text-xl">18</span>
                <span className="text-[14px]">Octubre</span>
            </div>
            <div className=" flex justify-start w-[65%] pl-3 py-1 flex-col">
                <h1 className="font-bold">12:00 PM</h1>
                <div className="w-full">
                    <ul className="flex justify-around pt-4">
                        <li className="flex flex-col justify-center items-center"> <img src={Profile} className="w-[20px]" alt="userIcon" />  <p className="text-[12px]">10 Cupos</p></li>
                        <li className="flex flex-col justify-center items-center"> <img src={Clock} className="w-[20px]" alt="userIcon" />  <p className="text-[12px]">1 Hora</p></li>
                        <li className="flex flex-col justify-center items-center"> <img src={Verify} className="w-[20px]" alt="userIcon" />  <p className="text-[12px]">6 Reservas</p></li>
                    </ul>
                </div>
            </div>

            <div className="w-[15%] flex justify-center items-center bg-button-primary rounded-r-xl">
                <img className="w-[30px]" src={External} alt="" />
            </div>
        </div>
    )
}