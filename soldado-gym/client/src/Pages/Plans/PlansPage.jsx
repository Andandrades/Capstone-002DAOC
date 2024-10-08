import React from "react";
import "./PlansStyle.css"; 
import { Plans } from "../../Components/PlansCard";

const PlansPage = () => {
  return (
    <div className="plans-container">
      <h2 className="plans-title">Planes</h2>
      <p className="plans-description">
        En esta vista podrías pagar tus planes y tener acceso a tus clases en el gimnasio.
      </p>

      {/* Cuadrados con los planes usando el componente Plans */}
      <Plans 
        name="Una clase" 
        amount={7500} 
        description="La clase se realizará el mismo día en que se efectúe el pago."
        n_class={1} 
      />
      <Plans 
        name="Plan Estandar" 
        amount={40000} 
        description="Puedes agendar tu horario a elección."
        n_class={10} 
      />
      <Plans 
        name="Plan Duo" 
        amount={30000} 
        description="Paga la suscripción duo y añade a una persona a tu plan."
        n_class={8} 
      />
      <Plans 
        name="Plan Semanal" 
        amount={15000} 
        description="Puedes agendar tu hora a elección."
        n_class={7} 
      />
    </div>
  );
};

export default PlansPage;