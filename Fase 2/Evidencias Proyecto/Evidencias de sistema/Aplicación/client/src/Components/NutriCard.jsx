import React, { useState } from "react";
import BuyModal from "../Pages/LandingPage/Components/BuyModal";

export const NutriCard = ({ name, amount, description, offer_price }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const StringedAmount = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const StringedOfferPrice = offer_price ? offer_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : null;
  const transationAmmount = offer_price !== null && offer_price !== undefined ? offer_price : amount;

  const NutriInfo = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="flex flex-col items-center justify-between relative text-white py-7 px-6 rounded-md bg-[#1C1C1C] w-[300px] h-[650px]">
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-3xl font-bold ">{name}</h1>
            {offer_price ? (
              <>
                <h2 className="font-bold text-[20px] line-through text-[#FF6666] mt-2">
                  ${StringedAmount} CLP

                </h2>
                <h2 className="font-bold text-[40px] mt-2 text-[#0036C1]">
                  ${StringedOfferPrice} CLP
                </h2>
              </>
            ) : (
              <h2 className="font-bold text-[40px] mt-2 text-[#0036C1]">
                ${StringedAmount} CLP
              </h2>
            )}
          </div>
          <div className="flex flex-col justify-center items-center font-semibold">
            <span className="w-60 text-[15px] md:text-sm lg:min-h-25 md:w-72 mt-2 text-center">{description}</span>
          </div>
        <div >
          <button className=" text-base px-4 rounded-full py-2 text-black font-bold  bg-[#0036C1]"
            onClick={NutriInfo}>
            Reservar
          </button>
        </div>
      </div>
      <BuyModal
        isOpen={isModalOpen}
        onClose={closeModal}
        name={name}
        amount={transationAmmount}
        description={description}
        isPlan={false}
        IsConsulta={true}
      />
    </>
  );
}
