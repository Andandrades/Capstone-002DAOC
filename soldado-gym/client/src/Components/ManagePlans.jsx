import React from 'react'
import Menu from "../assets/Certificate.svg";
import { deletePlan } from './API/Endpoints';


export const ManagePlans = ({ id, name, amount, description, n_class }) => {

    const formatPriceWithDots = (amount) => {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const DeletePlan = (id) => {
        deletePlan(id)
    }
    return (
        <div className="flex space-x-4 gap-10 justify-between items-center relative text-white lg:py-6 px-6 rounded-md bg-[#1C1C1C] flex-col w-80 mt-4 mx-auto">
            <img
                className="absolute top-[-15px] right-[0px] m-0 p-0"
                src={Menu}
                alt=""
            />
            <div>
                <div className="flex justify-center flex-col items-center">
                    <h1 className="text-3xl font-bold ">{name}</h1>
                    <h2 className="font-bold   text-[#FFAE3A]">
                        ${formatPriceWithDots(amount)} CLP
                    </h2>
                </div>
                <div className="flex flex-col justify-center items-center font-semibold">
                    <span className="flex mt-5 text-lg">
                        Cantidad de clases : <p className="text-yellow-300">{n_class}</p>{" "}
                    </span>

                </div>
            </div>
            <div className='flex space-x-4'>
                <button className="text-base rounded-full py-2 pl-3 pr-3 text-black font-bold my-5 bg-[#EFDD37]">
                    Modificar
                </button>
                <button className="text-base rounded-full py-2 pl-4 pr-4 text-black font-bold my-5 bg-[#fc0317]"
                    onClick={DeletePlan()}>
                    Eliminar
                </button>
            </div>
        </div>
    );
}
