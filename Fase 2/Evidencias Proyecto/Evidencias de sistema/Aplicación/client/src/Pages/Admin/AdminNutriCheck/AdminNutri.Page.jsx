import React, { useEffect, useState } from 'react';
import { ManageNutri } from './Components/ManageNutri';
import { NavBarAdmin } from '../../../Components/NavBarAdmin';
import "./AdminNutri.css";
import { obtenerNutri } from '../../../Components/API/Endpoints';
import AddPlanModal from './Components/AddNutriModal';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

export const AdminNutri = () => {
  const [data, setData] = useState([]);
  const [fetchPlans, setFetchPlans] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchPlanes = async () => {
    try {
      const data = await obtenerNutri();
      setData(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPlanes();
    setFetchPlans(false);
  }, [fetchPlans]);

  return (

    <div className="body h-screen ">

      <section>
        <div className="bg[#001C1C] flex flex-col justify-start items-center pt-6">
        <h1 className="text-2xl font-bold text-white text-center">Gestionar Consultas nutricionales</h1>
        <button className="text-base rounded-full py-2 w-3/4 text-black font-bold my-5 bg-[#EFDD37]"
            onClick={() => setIsModalOpen(true)}>
            Añadir consulta
          </button>
        </div>
        <div className="planes">
          {data && data.length > 0 ? (
            data.map((data) => (
              <div className="gap-10 justify-center items-center" key={data.id}>
                <ManageNutri
                  id={data.id}
                  name={data.name}
                  description={data.description}
                  amount={data.price}
                  fetchPlans={setFetchPlans}
                />
              </div>
            ))
          ) : (
            <div className="w-full bg-white mt-5 p-5 rounded flex justify-center items-center gap-8">
            <HelpOutlineIcon sx={{fill : "#f1c21b" , width : "40px" , height : "40px"}}/>
            <p className="font-semibold text-gray-500">No se han encontrado consultas nutricionales!.</p>
          </div>
          )}
        </div>
      </section>
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
