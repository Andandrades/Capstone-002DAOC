import React from 'react'
import Menu from "../assets/Certificate.svg";


export const ManagePlans = ({ name, amount, description, n_class }) => {

    const formatPriceWithDots = (amount) => {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };
    return (
        <div className=" flex min-h-96 gap-10 lg:min-h-96 justify-between items-center relative text-white py-7 lg:py-6 px-6 rounded-md bg-[#1C1C1C] flex-col w-100 mt-4">
            <img
                className="absolute top-[-15px] right-[-15px] m-0 p-0"
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
            <div >
                <button className=" text-base px-4 rounded-full py-2 text-black font-bold my-5 bg-[#EFDD37]"
                onClick={console.log(name)}>
                    Modificar 
                </button>
                <button className=" text-base px-4 rounded-full py-2 text-black font-bold my-5 bg-[#fc0317]"
                onClick={"s"}>
                    Eliminar
                </button>
            </div>
        </div>
    );
}
