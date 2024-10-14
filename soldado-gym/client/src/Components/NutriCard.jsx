import React from "react";
import Menu from "../assets/Certificate.svg";
  
export const NutriCard = ({ name, amount, description, n_class }) => {

  const formatPriceWithDots = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div className=" flex min-h-96 gap-10 lg:min-h-96 justify-between items-center relative text-white py-7 lg:py-6 px-6 rounded-md bg-[#1C1C1C] flex-col">

      <div>
        <div className="flex justify-center flex-col items-center">
          <h1 className="text-3xl font-bold ">{name}</h1>
          <h2 className="font-bold text-[40px] mt-2 text-[#FFAE3A]">
            ${formatPriceWithDots(amount)} CLP
          </h2>
        </div>
        <div className="flex flex-col justify-center items-center font-semibold">
         
          <span className="w-60 text-[15px] md:text-sm lg:min-h-25 md:w-72 mt-10">{description}</span>

        </div>
      </div>
      <div className="">
        <button className=" text-base px-4 rounded-full py-2 text-black font-bold  bg-[#EFDD37]">
          Reservar
        </button>
      </div>
    </div>
  );
}
