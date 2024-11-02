import React, { useState } from 'react'
import menu from "../../../../assets/Certificate.svg";
import { deleteNutri } from '../../../../Components/API/Endpoints';
import ModifyNutriModal from './ModifyNutriModal';

export const ManageNutri = ({ id, name, amount,description, fetchPlans }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);


    const formatPriceWithDots = (amount) => {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const DeleteNutri= (id) => {
        deleteNutri(id).then(response => {
            fetchPlans(true)
        })
    }
    const ModifyPlan = (id) => {
        setIsModalOpen(true);

    }
    return (
        <>
            <div className="flex gap-10 justify-between items-center relative text-white lg:py-6 px-6 rounded-md bg-[#1C1C1C] flex-col w-80 mt-4 mx-auto pb-9">
                <img
                    className="absolute top-[-15px] right-[0px] m-0 p-0"
                    src={menu}
                    alt=""
                    fill="blue"
                />
                <div>
                    <div className="flex flex-col justify-center items-center font-semibold pt-6">
                        <h1 className="text-3xl font-bold text-center ">{name}</h1>
                        <h2 className="font-bold   text-[#FFAE3A]  pt-6">
                            ${formatPriceWithDots(amount)} CLP
                        </h2>
                    </div>
                </div>
                <div className="flex space-x-4">
                    <button className="text-base rounded-full py-2 pl-4 pr-4 text-black font-bold bg-[#EFDD37]"
                        onClick={() => { ModifyPlan() }}>
                        Modificar
                    </button>
                    <button className="text-base rounded-full py-2 pl-4 pr-4 text-black font-bold bg-[#fc0317]"
                        onClick={() => { DeleteNutri(id) }}>
                        Eliminar
                    </button>
                </div>

            </div>
            <ModifyNutriModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                id ={id}
                name={name}
                price={amount}
                description={description}
                fetchPlans={fetchPlans}
            />
        </>
    );
}
