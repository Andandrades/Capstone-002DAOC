import { useState, useEffect } from "react";
import { NavBar } from "../../components/NavBar";
import { Plans } from "../../components/Plans";
import Trainer from "../../assets/img/Sports.webp";
import Nutri from "../../assets/img/Nutri.webp";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import ClassIcon from "@mui/icons-material/Class";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

import "./LandingPage.css";

export const LandingPage = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch("http://localhost:3000/plans");
        const data = await response.json();
        console.log(data);
        setPlans(data);
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };

    fetchPlans();
  }, []);

  return (
    <>
      <NavBar />
      <div className="SoldadoContainer ">
        <h1 className="title">Soldado Gym</h1>
      </div>
      <div className="separator" />
      <div className="w-full About py-20 h-auto gap-10 flex flex-col justify-start items-center">
        <div className="w-3/4 md:w-2/4  flex-col flex items-start md:px-10 gap-3">
          <h1 className="text-white font-bold text-5xl uppercase">
            Quienes somos
          </h1>
          <span className="text-gray-300 text-xl">
            En nuestra plataforma, combinamos nutrición y actividad física en un
            espacio creado por profesionales, enfocado en mejorar la salud y
            bienestar de nuestra comunidad a través de atención personalizada y
            en constante crecimiento.
          </span>
        </div>
        <div className="flex justify-center flex-col lg:flex-row items-center gap-20">
          <div className="p-10 h-[600px] sm:h-[500px] transition-all ease-in-out hover:scale-105 w-[300px] md:w-[400px] flex justify-center items-center flex-col bg-[#ffffff] rounded-lg shadow-sm">
            <img src={Trainer} className="h-[250px]" alt="" />
            <h1 className="text-3xl font-semibold ">David Fuentes</h1>
            <p className="w-auto pt-2">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Assumenda corporis ea veritatis recusandae natus optio est
            </p>
          </div>
          <div className="p-10 h-[600px] md:h-[500px] w-[300px] md:w-[400px] flex justify-center items-center flex-col bg-[#ffffff] rounded-lg shadow-sm">
            <img src={Nutri} className="h-[250px]" alt="" />
            <h1 className="text-3xl font-semibold ">Sol Nuñez</h1>
            <p className="w-auto pt-2">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Assumenda corporis ea veritatis recusandae natus optio est
            </p>
          </div>
        </div>
      </div>
      <section className="w-full flex 2xl:h-[100vh] justify-center 2xl:relative items-center box-border gap-8 px-20 py-10 flex-col ">
        <div className="w-full flex justify-center items-center 2xl:absolute top-0 py-10">
          <h1 className="text-3xl font-bold uppercase">Servicios</h1>
        </div>
        <div className="flex flex-col 2xl:flex-row justify-center items-center gap-20">
          <div className=" border 2xl:h-[500px] p-6 rounded-lg shadow-xl box-border min-w-[300px]">
            <div className=" px-2 py-1 text-center rounded-xl">
              <h1 className="text-3xl md:text-5xl font-semibold ">Gimnasio</h1>
              <div className="w-full h-[3px] rounded-xl bg-blue-900"></div>
            </div>
            <ul className=" my-8 list-none max-w-[500px] flex flex-col gap-2 border p-4 rounded-md shadow-md">
              <li className="text-base md:text-xl flex justify-start items-center gap-2">
                {" "}
                <ChecklistRtlIcon sx={{ color: "#3936C1" }} />{" "}
                <p className="text-lg">Evaluacion física</p>
              </li>
              <span className="text-sm px-8 text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repudiandae, nisi illo! Quaerat
              </span>
              <li className="text-base md:text-xl flex justify-start items-center gap-2">
                {" "}
                <ClassIcon sx={{ color: "#3936C1" }} />{" "}
                <p className="text-lg">Clases Personalizadas</p>
              </li>
              <span className="text-sm px-8 text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repudiandae, nisi illo! Quaerat
              </span>
              <li className="text-base md:text-xl flex justify-start items-center gap-2">
                {" "}
                <FitnessCenterIcon sx={{ color: "#3936C1" }} />
                <p className="text-lg">
                  Clases guiadas por profesores de actividad física
                </p>
              </li>
              <span className="text-sm px-8 text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repudiandae, nisi illo! Quaerat
              </span>
            </ul>
          </div>

          <div className=" border 2xl:h-[500px] p-6 rounded-lg shadow-xl box-border min-w-[300px]">
            <div className=" px-2 py-1 text-center rounded-xl">
              <h1 className="text-3xl md:text-5xl font-semibold ">
                Nutricionista
              </h1>
              <div className="w-full h-[3px] rounded-xl bg-blue-900"></div>
            </div>
            <ul className=" my-8 list-none max-w-[500px] flex flex-col gap-2 border p-4 rounded-md shadow-md">
              <li className="text-base md:text-xl flex justify-start items-center gap-2">
                {" "}
                <ChecklistRtlIcon sx={{ color: "#3936C1" }} />{" "}
                <p>Primera Visita</p>
              </li>
              <span className="text-sm px-8 text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repudiandae, nisi illo! Quaerat
              </span>
              <li className="text-base md:text-xl flex justify-start items-center gap-2">
                {" "}
                <ClassIcon sx={{ color: "#3936C1" }} /> <p>Seguimiento</p>
              </li>
              <span className="text-sm px-8 text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repudiandae, nisi illo! Quaerat
              </span>
              <li className="text-base md:text-xl flex justify-start items-center gap-2">
                {" "}
                <FitnessCenterIcon sx={{ color: "#3936C1" }} />
                <p>Mantenimiento</p>
              </li>
              <span className="text-sm px-8 text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repudiandae, nisi illo! Quaerat
              </span>
            </ul>
          </div>
        </div>
      </section>
      <div className="separator" />
      <section className="w-full flex 2xl:h-[100vh] h-auto bg-[#151515] justify-center items-center box-border gap-8 px-20 py-10 flex-col">
        <div className="w-full flex justify-center items-center ">
          <h1 className="text-3xl font-bold uppercase text-white">Planes</h1>
        </div>
        <div className="flex flex-col lg:flex-row w-full h-full gap-10 justify-center items-center box-border">
          {plans && plans.length > 0 ? (
            plans.map((plan) => (
              <Plans
                key={plan.plan_id}
                name={plan.name}
                n_class={plan.n_class}
                amount={plan.price}
                description={plan.description}
              />
            ))
          ) : (
            <p>No plans available</p>
          )}
        </div>
      </section>
    </>
  );
};
