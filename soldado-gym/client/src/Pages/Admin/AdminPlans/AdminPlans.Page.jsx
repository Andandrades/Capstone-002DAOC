import React, { useEffect, useState } from 'react';
import { ManagePlans } from '../../../Components/ManagePlans';
import { NavBarAdmin } from '../../../Components/NavBarAdmin';
import "./AdminPlans.css";
import { obtenerPlanes } from '../../../Components/API/Endpoints';
import { AddPlanModal } from './Components/AddPlanModal';

export const AdminPlans = () => {

  const [plans, setPlans] = useState([]);


  const fetchPlanes = async () => {
    try {
      const data = await obtenerPlanes();
      setPlans(data);
    } catch (err) {
      console.log(err)
    } finally {
    }
  };

  useEffect(() => {
    fetchPlanes();
  }, []);

  return (
    <>
    <div className="body">
      <h1 className='Text[#000] '>Gestionar Planes activos</h1>
      <button className='bg-[#EFDD37]' >
        Añadir Plan
      </button>


      {plans && plans.length > 0 ? (
        plans.map((plan) => (
          <div className="planes  gap-10 justify-center items-center">
            <ManagePlans
              id={plan.plan_id}
              key={plan.plan_id}
              name={plan.name}
              n_class={plan.n_class}
              amount={plan.price}
              description={plan.description}
            />
          </div>
        ))
      ) : (
        <p className="text-white">No hay planes disponibles. </p>
      )}
      <NavBarAdmin />
      <AddPlanModal/>
    </div>
    </>
  )
}
