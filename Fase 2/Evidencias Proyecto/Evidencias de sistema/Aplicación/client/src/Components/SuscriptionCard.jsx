import React, { useRef } from "react";

import Garant from "../assets/Guarantee.svg"
import Bookmark from "../assets/Bookmark.svg"
import Plus from "../assets/Plus.svg"
import { useNavigate } from "react-router-dom";

export const SuscriptionsCard = ({ suscriptionData }) => {
    const navigate = useNavigate();
    const Navigate = () => {
        navigate("/", { state: { scrollToPlans: true } });
    };
    return (
        <div className="w-full">
            {suscriptionData ? (
                <div className="flex flex-col relative bg-white px-4 py-6 rounded-lg text-[20px]">
                    <img src={Garant} className="absolute top-[-10px] left-[-10px]" alt="" />
                    <h1 className="mb-3">{suscriptionData.name}</h1>
                    <div className="h-[3px] rounded-full w-full bg-button-primary mb-3"></div>
                    <ul className="px-2">
                        <li className="flex justify-start gap-2 items-center">
                            <img src={Bookmark} alt="" className="w-[34px]" />
                            Clases del plan: {suscriptionData.n_class}
                        </li>
                        <li className="flex justify-start gap-2 items-center">
                            <img src={Plus} alt="" />
                            Clases restantes: {suscriptionData.remaining_classes}

                        </li>

                    </ul>
                    {suscriptionData.remaining_classes === 0 ? (
                        <button className="w-full bg-button-primary mt-5 py-2 rounded-lg"
                            onClick={Navigate}
                        >
                            <p className="text-white">Renovar plan</p>
                        </button>
                    ) : (
                        <button className="w-full bg-button-primary mt-5 py-2 rounded-lg">
                            <p className="text-white">Más Información</p>
                        </button>
                    )}
                </div>
            ) : (
                <div className="flex justify-center items-center bg-white px-4 py-6 rounded-lg text-[20px] border border-gray-300">
                    <p>No hay planes disponibles</p>
                </div>
            )}
        </div>
    );
};
