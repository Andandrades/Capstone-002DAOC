import React, { useEffect, useState } from 'react';
import { ManagePlans } from '../../../Components/ManagePlans';
import { NavBarAdmin } from '../../../Components/NavBarAdmin';
import "./AdminPlans.css";
import { obtenerPlanes } from '../../../Components/API/Endpoints';
import AddPlanModal from './Components/AddPlanModal';

export const AdminPlans = () => {
  const [plans, setPlans] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchPlanes = async () => {
    try {
      const data = await obtenerPlanes();
      setPlans(data);
    } catch (err) {
      console.log(err);
    }};

  useEffect(() => {
    fetchPlanes();
  }, []);

  return (

    <div className="body ">
      <section className="w-screen flex flex-col justify-start items-center">
        <div className="my-6 z-10">
          <h1 className="text-4xl font-bold text-white">Gestionar planes</h1>
        </div>
        <button className='bg-[#EFDD37] text-black py-4' onClick={() => setIsModalOpen(true)}>
          Añadir Plan
        </button>

        <div className="planes">
          {plans && plans.length > 0 ? (
            plans.map((plan) => (
              <div className="gap-10 justify-center items-center" key={plan.plan_id}>
                <ManagePlans
                  id={plan.plan_id}
                  name={plan.name}
                  n_class={plan.n_class}
                  amount={plan.price}
                  description={plan.description}
                />
              </div>
            ))
          ) : (
            <p className="text-white">No hay planes disponibles.</p>
          )}
        </div>
      </section>
      <div className="pad pb-10"></div>
      <NavBarAdmin />
      <AddPlanModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};
