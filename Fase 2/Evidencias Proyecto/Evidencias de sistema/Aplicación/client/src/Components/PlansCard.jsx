import React, { useState } from "react";
import BuyModal from "../Pages/LandingPage/Components/BuyModal";
import Certificate from "../assets/Certificate";

export const Plans = (props) => {
  const { id, name, amount, description,color, n_class, isAuth, setIsAuth } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const StringedAmount = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  const PlanInfo = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex min-h-96 gap-10 lg:min-h-96 justify-between items-center relative text-white py-7 lg:py-6 px-6 rounded-md bg-[#1C1C1C] flex-col">
     
     <div className="absolute top-[-15px] right-[-15px] m-0 p-0">
      <Certificate fill={color}/>
      </div>
      <div>
        <div className="flex justify-center flex-col items-center">
          <h1 className="text-3xl font-bold ">{name}</h1>
          <h2 className="font-bold text-[40px] mt-2 text-[#FFAE3A]">
            ${StringedAmount} CLP
          </h2>
        </div>
        <div className="flex flex-col justify-center items-center font-semibold">
          <span className="flex mt-5 text-lg">
            Cantidad de clases : <p className="text-yellow-300">{n_class}</p>
          </span>
          <span className="w-60 text-[15px] md:text-sm lg:min-h-25 md:w-72 mt-10">{description}</span>
        </div>
      </div>
      <div className="">
        <button
          className="text-base px-4 rounded-full py-2 text-black font-bold bg-[#EFDD37]"
          onClick={PlanInfo}
        >
          Elegir Plan
        </button>
      </div>

      <BuyModal
        isOpen={isModalOpen}
        onClose={closeModal}
        id={id}
        name={name}
        amount={amount}
        description={description}
        isPlan={true}
        n_class={n_class}
        isAuth={isAuth}
        setIsAuth={setIsAuth}
      />
    </div>
  );
};
