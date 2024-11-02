import React, { useEffect, useState } from 'react';
import { ManagePlans } from '../AdminPlans/Components/ManagePlans';
import { NavBarAdmin } from '../../../Components/NavBarAdmin';
import { obtenerPlanes } from '../../../Components/API/Endpoints';
import AddPlanModal from './Components/AddPlanModal';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const AdminPlans = () => {
  const [plans, setPlans] = useState([]);
  const [fetchPlans, setFetchPlans] = useState(true);
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
    setFetchPlans(false);
  }, [fetchPlans]);

  return (

    <div className="bg-[#333] min-h-screen flex flex-col justify-between mb-10">

      <div >
        <div className="bg-[#333] flex flex-col justify-start items-center pt-6">
          <h1 className="text-3xl font-bold text-white text-center">Gestionar planes</h1>
          <button className="text-base rounded-full py-2 w-3/4 text-black font-bold my-5 bg-[#EFDD37]"
            onClick={() => setIsModalOpen(true)}>
            Añadir Plan
          </button>
        </div>
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
                  fetchPlans={setFetchPlans}
                />
              </div>
            ))
          ) : (
            <div className="w-full bg-white mt-5 p-5 rounded flex justify-center items-center gap-8">
              <HelpOutlineIcon sx={{ fill: "#f1c21b", width: "40px", height: "40px" }} />
              <p className="font-semibold text-gray-500">No se han encontrado planes!.</p>
            </div>
          )}
        </div>
      </div>
      <div className="pad pb-10"></div>
      <NavBarAdmin />
      <AddPlanModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        fetchPlans={setFetchPlans}
      />
    </div >
  );
};

export default AdminPlans;