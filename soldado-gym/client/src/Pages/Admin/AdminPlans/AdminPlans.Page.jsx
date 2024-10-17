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
    }
  };

  useEffect(() => {
    fetchPlanes();
  }, []);

  return (
    <>
      <div className="body">
        <h1 className="text-white">Gestionar Planes activos</h1>
        <button className='bg-[#EFDD37] text-black' onClick={() => setIsModalOpen(true)}>
          Añadir Plan
        </button>

        {plans && plans.length > 0 ? (
          plans.map((plan) => (
            <div className="planes gap-10 justify-center items-center" key={plan.plan_id}>
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
        <NavBarAdmin />
        <AddPlanModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </>
  );
};
