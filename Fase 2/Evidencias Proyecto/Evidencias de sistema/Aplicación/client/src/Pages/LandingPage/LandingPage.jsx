import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import ClassIcon from "@mui/icons-material/Class";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Phone from "../../assets/img/iphone.webp";
import Nutri from "../../assets/img/Nutri.webp";
import Trainer from "../../assets/img/Sports.webp";
import Tourist from "../../assets/img/tourist.svg";
import { obtenerNutri, obtenerPlanes } from "../../Components/API/Endpoints";
import { FisicoComponent } from "../../Components/FisicoComponent";
import { FooterComponent } from "../../Components/FooterComponent";
import { NavBar } from "../../components/NavBar";
import { NutriCard } from "../../Components/NutriCard";
import { Plans } from "../../Components/PlansCard";
import "./LandingPage.css";
import { useUser } from "../../Components/API/UserContext";

const LandingPage = () => {
  const { isAuth, setIsAuth } = useUser;
  const navigate = useNavigate();

  const goto = (url) => {
    navigate(`/${url}`);
  };

  const [plans, setPlans] = useState([]);
  const [dataNutri, setDataNutri] = useState([]);

  //variables para aplicar SmoothScroll al momento de seleccionar una opcion en el navbar
  const sectionRef1 = useRef(null);
  const sectionRef2 = useRef(null);
  const sectionRef3 = useRef(null);
  const sectionRef4 = useRef(null);
  const sectionRef5 = useRef(null);
  const sectionRef6 = useRef(null);
  const sectionRef7 = useRef(null);


  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const fetchPlanes = async () => {
    try {
      const data = await obtenerPlanes();
      setPlans(data);
    } catch (err) {
      console.log(err.message);
    };
  };

  const fetchNutri = async () => {
    try {
      const data = await obtenerNutri();
      setDataNutri(data);
    } catch (err) {
      setError(err.message);
    };
  };

  useEffect(() => {
    fetchPlanes();
    fetchNutri();
  }, []);


  return (
    <>
      <NavBar
        scrollToSection={scrollToSection}
        refs={{
          sectionRef1,
          sectionRef2,
          sectionRef3,
          sectionRef4,
          sectionRef5,
          sectionRef6,
          sectionRef7,
        }}
      />
      <div ref={sectionRef1} className="SoldadoContainer">
        <h1 className="title text-center z-0">Soldado Gym</h1>
      </div>
      <div className="separator" />
      <div
        ref={sectionRef2}
        className="w-full About py-20 h-auto lg:h-[100vh] gap-10 flex flex-col justify-start items-center"
      >
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
      <section
        ref={sectionRef3}
        className="w-full bgColor flex 2xl:h-[100vh] justify-center 2xl:relative items-center box-border gap-8 px-20 py-10 flex-col "
      >
        <div className="w-full flex justify-center items-center 2xl:absolute top-0 py-10">
          <h1 className="text-3xl font-bold uppercase">Servicios</h1>
        </div>
        <div className="flex flex-col 2xl:flex-row justify-center items-center gap-20">
          <div className=" 2xl:h-[500px] p-6 rounded-lg shadow-xl box-border min-w-[300px]">
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

          <div className=" 2xl:h-[500px] p-6 rounded-lg shadow-xl box-border min-w-[300px]">
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
      <FisicoComponent />
      <section
        ref={sectionRef4}
        className="w-full flex 2xl:h-[100vh] h-auto bg-[#151515] justify-center items-center box-border gap-8 px-20 py-10 flex-col"
      >
        <div className="w-full flex justify-center items-center text-center ">
          <h1 className="text-3xl font-bold uppercase text-white">Planes</h1>
        </div>
        <div className="flex flex-col lg:flex-row w-full h-full gap-10 justify-center items-center box-border">
          {plans && plans.length > 0 ? (
            plans.map((plan) => (
              <Plans
                id={plan.plan_id}
                name={plan.name}
                description={plan.description}
                price={plan.price}
                offer_price={plan.offer_price}
                type={plan.type}
                n_class={plan.n_class}
                color={plan.color}
                isAuth={isAuth}
                setIsAuth={setIsAuth}
              />
            ))
          ) : (
            <p className="text-white">No hay planes disponibles. </p>
          )}
        </div>
      </section>
      <div className="separator" />
      <section
        ref={sectionRef7}
        className="w-full flex 2xl:h-[100vh] h-auto bg-[#151515] justify-center items-center box-border gap-8 px-20 py-10 flex-col"
      >
        <div className="w-full flex justify-center items-center text-center ">
          <h1 className="text-3xl font-bold uppercase text-white">Consultas nutricionales</h1>
        </div>
        <div className="flex flex-col lg:flex-row w-full h-full gap-10 justify-center items-center box-border">
          {dataNutri && dataNutri.length > 0 ? (
            dataNutri.map((nutri) => (
              <NutriCard
                id={nutri.id}
                name={nutri.name}
                amount={nutri.price}
                description={nutri.description}
                isAuth={isAuth}
                setIsAuth={setIsAuth}
              />
            ))
          ) : (
            <p className="text-white">No hay Consultas nutricionales disponibles. </p>
          )}
        </div>
      </section>
      <div className="separator"></div>
      <section
        ref={sectionRef5}
        className="lg:h-[100vh] bg-[#252525] h-auto flex flex-col justify-start py-16 lg:py-0 items-center"
      >
        <div className=" w-full flex pb-10 justify-center items-center flex-col">
          <h1 className="text-3xl font-bold text-white uppercase py-10 text-center">
            Donde Encontrarnos
          </h1>
          <img className="w-24" src={Tourist} alt="" />
        </div>
        <iframe
          className="lg:w-[600px] h-[400px] w-5/6 lg:h-[500px] rounded-lg"
          src="https://www.google.com/maps/embed?pb=!1m21!1m12!1m3!1d3299.9288381013075!2d-71.65683056830818!3d-34.199294582292055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m6!3e2!4m0!4m3!3m2!1d-34.198618499999995!2d-71.655!5e0!3m2!1ses-419!2scl!4v1728073012288!5m2!1ses-419!2scl"
          style={{ border: 0 }}
          title="GoogleMapsApi"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
      <section

        className="bgColor lg:h-[100vh] flex justify-center flex-col py-20 lg:flex-row  items-center"
      >
        <div ref={sectionRef6} className=" lg:w-[500px] pt-10 lg:pt-0">
          <h1 className="lg:title text-5xl font-bold w-full text-center lg:text-start">
            Nuestro Sistema
          </h1>
          <div className="w-full px-9 lg:px-0 flex justify-center text-center lg:text-start pt-4">
            <p className="lg:text-lg text-xl">
              Contamos con un{" "}
              <span className="text-green-500 font-semibold">
                sistema moderno
              </span>{" "}
              y eficiente, el cual le permite a nuestros usuarios acceder a{" "}
              <span className="text-green-500 font-semibold">
                nuestros servicios de nutricion y actividad física{" "}
              </span>
            </p>
          </div>
          <div className="w-full flex flex-col lg:flex-row gap-5 justify-center items-center py-4 lg:gap-8">

            <button className="relative h-12 w-40 rounded-full overflow-hidden border border-[#3936C1] text-indigo-600 shadow-2xl transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-[#3936C1] before:duration-300 before:ease-out hover:text-white hover:shadow-indigo-600 hover:before:h-40 hover:before:w-40 hover:before:opacity-80"
              onClick={() => goto('login')}
            >
              <span className="relative z-10">Ingresar</span>
            </button>
            <button className="before:ease relative rounded-full h-12 w-40 overflow-hidden border border-blue-500 text-blue-500 shadow-2xl transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-blue-500 before:duration-300 hover:text-white hover:shadow-blue-500 hover:before:h-64 hover:before:-translate-y-32"
              onClick={() => goto('Register')}
            >
              <span className="relative z-10">Registrarse</span>
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="lg:w-96 lg:h-96 z-0 w-52 h-52 circle bg-slate-700 rounded-full"></div>
          <img className="relative" src={Phone} alt="" />
        </div>
      </section>
      <FooterComponent />
    </>
  );
};

export default LandingPage;
