import React, { useEffect, useState } from "react";
import "./PlansStyle.css"; 
import { Plans } from "../../components/PlansCard"; // Importando el Componente

const PlansPage = () => {
  
  const [plans, setPlans] = useState([]);
  const [error, setError] = useState(""); 

  
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        
        const response = await fetch(`${import.meta.env.VITE_API_URL}/plans`, {
          method: "GET",
          credentials: "include", 
        });
        
        
        if (!response.ok) {
          throw new Error("Error al obtener los planes");
        }

        
        const data = await response.json();

        
        setPlans(data);
      } catch (error) {
        console.log(error);
        setError("Error al cargar los planes. Intenta nuevamente.");
      }
    };

    fetchPlans();
  }, []);

  return (
    <div className="plans-container">
      <h2 className="plans-title">Planes</h2>
      <p className="plans-description">
        En esta vista podrías pagar tus planes y tener acceso a tus clases en el gimnasio.
      </p>

      
      {error && <p className="error">{error}</p>}

      
      {plans.length === 0 && !error && <p>Cargando planes...</p>}

      
      {plans.map((plan) => (
        <Plans 
          key={plan.id} 
          name={plan.name}
          description={plan.description} 
          price={plan.price} 
          n_class={plan.n_class} 
          type={plan.type} 
        />
      ))}
    </div>
  );
};

export default PlansPage;