import React, { useState } from "react";
import BuyModal from "../Pages/LandingPage/Components/BuyModal";
import Certificate from "../assets/Certificate";

export const Plans = (props) => {
  const { id, name, description, price, offer_price, type, n_class, color, isAuth, setIsAuth } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const StringedAmount = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const StringedOfferPrice = offer_price ? offer_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : null;

  const transationAmmount = offer_price !== null && offer_price !== undefined ? offer_price : price;

  const PlanInfo = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-96 relative text-white py-7 px-6 rounded-md bg-[#1C1C1C] w-[300px] h-[600px]">
      <div className="absolute top-[-15px] right-[-15px] m-0 p-0">
        <Certificate fill={color} />
      </div>
      <div className="flex flex-col items-center text-center">
        <h1 className="text-3xl font-bold">{name}</h1>
        {offer_price ? (
          <>
            <h2 className="font-bold text-[20px] line-through text-[#FF6666] mt-2">
              ${StringedAmount} CLP
            </h2>
            <h2 className="font-bold text-[40px] mt-2 text-[#EFDD37]">
              ${StringedOfferPrice} CLP
            </h2>
          </>
        ) : (
          <h2 className="font-bold text-[40px] mt-2 text-[#EFDD37]">
            ${StringedAmount} CLP
          </h2>
        )}

        <div className="flex flex-col items-center font-semibold mt-5">
          <span className="w-60 text-[15px] md:text-sm mt-2 pb-2">
            Tipo de plan: <span className="text-yellow-300">{type}</span>
          </span>
          <span className="text-lg">
            Cantidad de clases: <span className="text-yellow-300">{n_class}</span>
          </span>

          <span className="w-60 text-[15px] md:text-sm mt-4">{description}</span>

        </div>
      </div>
      <button
        className="text-base px-4 rounded-full py-2 text-black font-bold bg-[#EFDD37] mt-5"
        onClick={PlanInfo}
      >
        Elegir Plan
      </button>

      <BuyModal
        isOpen={isModalOpen}
        onClose={closeModal}
        id={id}
        name={name}
        amount={transationAmmount}
        description={description}
        isPlan={true}
        n_class={n_class}
        isAuth={isAuth}
        setIsAuth={setIsAuth}
      />
    </div>
  );
};
