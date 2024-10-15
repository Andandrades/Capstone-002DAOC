import React, { useEffect, useState } from 'react';
import { ManagePlans } from '../../../Components/ManagePlans';
import { NavBarAdmin } from '../../../Components/NavBarAdmin';
import "./AdminPlans.css";
import { obtenerPlanes } from '../../../Components/Endpoints/Endpoints';
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

    <div className="body flex flex-col gap-10 justify-center items-center">

      {plans && plans.length > 0 ? (
        plans.map((plan) => (
          <ManagePlans
            id={plan.plan_id}
            key={plan.plan_id}
            name={plan.name}
            n_class={plan.n_class}
            amount={plan.price}
            description={plan.description}
          />
        ))
      ) : (
        <p className="text-white">No hay planes disponibles. </p>
      )}
      <NavBarAdmin />
    </div>
  )
}
