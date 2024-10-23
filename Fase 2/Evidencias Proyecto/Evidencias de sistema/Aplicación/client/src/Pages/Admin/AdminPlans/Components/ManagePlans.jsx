import React, { useState } from 'react'
import menu from "../../../../assets/Certificate.svg";
import { deletePlan } from '../../../../Components/API/Endpoints';
import ModifyPlanModal from '../../AdminPlans/Components/ModifyPlanModal';

export const ManagePlans = ({ id, name, amount, n_class,description, fetchPlans }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);


    const formatPriceWithDots = (amount) => {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const DeletePlan = (id) => {
        deletePlan(id).then(response => {
            console.log('Plan modificado:', response);
            fetchPlans(true)
        })
    }
    const ModifyPlan = (id) => {
        setIsModalOpen(true);

    }
    return (
        <>
            <div className="flex space-x-4 gap-10 justify-between items-center relative text-white lg:py-6 px-6 rounded-md bg-[#1C1C1C] flex-col w-80 mt-4 mx-auto pb-9">
                <img
                    className="absolute top-[-15px] right-[0px] m-0 p-0"
                    src={menu}
                    alt=""
                    fill="blue"
                />
                <div>
                    <div className="flex flex-col justify-center items-center font-semibold pt-6">
                        <h1 className="text-3xl font-bold text-aling-center ">{name}</h1>
                        <h2 className="font-bold   text-[#FFAE3A]  pt-6">
                            ${formatPriceWithDots(amount)} CLP
                        </h2>
                    </div>
                    <div className="flex flex-col justify-center items-center font-semibold">
                        <span className="flex mt-2 text-lg">
                            Cantidad de clases : <p className="text-yellow-300">{n_class}</p>{" "}
                        </span>

                    </div>
                </div>
                <div className="flex space-x-4">
                    <button className="text-base rounded-full py-2 pl-4 pr-4 text-black font-bold bg-[#EFDD37]"
                        onClick={() => { ModifyPlan() }}>
                        Modificar
                    </button>
                    <button className="text-base rounded-full py-2 pl-4 pr-4 text-black font-bold bg-[#fc0317]"
                        onClick={() => { DeletePlan(id) }}>
                        Eliminar
                    </button>
                </div>

            </div>
            <ModifyPlanModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                id={id}
                name={name}
                description= {description}
                amount= {amount}
                n_class= {n_class}
                fetchPlans= {fetchPlans}

            />
        </>
    );
}
