import React, { useState } from 'react'
import menu from "../../../../assets/Certificate.svg";
import { deletePlan } from '../../../../Components/API/Endpoints';
import ModifyPlanModal from '../../AdminPlans/Components/ModifyPlanModal';
import { toast } from 'react-toastify';
import { Button } from 'antd';

export const ManagePlans = ({ id, name, amount, offer_price, n_class, description, fetchPlans }) => {

    const [loadingButton, setLoadingButton] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const formatPriceWithDots = (amount) => {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const DeletePlan = async (id) => {
        setLoadingButton(true)
        try {
            const response = await deletePlan(id);
            if (response) {
                fetchPlans(true);
                toast.success('Plan eliminado exitosamente.');
            } else {
                toast.error('Ha ocurrido un error, Intentalo nuevamente.');
            }
            setLoadingButton(false)

        } catch (error) {
            setLoadingButton(false)
            console.error("Error al eliminar el plan:", error);
            toast.error('El plan no se puede eliminar, usuarios tienen ese plan...');
        }
    };

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
                    <Button className="text-base rounded-full py-2 pl-4 pr-4 text-black font-bold bg-[#EFDD37]"
                        onClick={() => { ModifyPlan() }}>
                        Modificar
                    </Button>
                    <Button
                        type="submit"
                        className="text-base rounded-full py-2 pl-4 pr-4 text-black font-bold bg-[#FF0000]"
                        loading={loadingButton}
                        onClick={() => { DeletePlan(id) }}
                    >
                        Eliminar
                    </Button>
                </div>

            </div >
            <ModifyPlanModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                id={id}
                name={name}
                description={description}
                offer_price={offer_price}
                amount={amount}
                n_class={n_class}
                fetchPlans={fetchPlans}

            />
        </>
    );
}
