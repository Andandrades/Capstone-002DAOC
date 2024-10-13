import React, { useEffect, useState } from 'react';
import { ManagePlans } from '../../../Components/ManagePlans';
import { NavBarAdmin } from '../../../Components/NavBarAdmin';
import "./AdminPlans.css";
export const AdminPlans = () => {

  const [plans, setPlans] = useState([]);


  const fetchPlans = async () => {
    try {
      const response = await fetch('http://localhost:3000/plans'); 
      const data = await response.json();
      console.log(data);
      setPlans(data);
    } catch (error) {
      console.error("Error fetching plans:", error);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);
  return (
    
    <div className="ManagePlans flex flex-col lg:flex-row w-full h-full gap-10 justify-center items-center box-border">

    {plans && plans.length > 0 ? (
            plans.map((plan) => (
              <ManagePlans
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
    <NavBarAdmin/>
    </div>
  )
}
