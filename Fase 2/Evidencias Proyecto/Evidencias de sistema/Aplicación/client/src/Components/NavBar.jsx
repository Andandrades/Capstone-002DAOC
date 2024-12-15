import { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";

import "./css/NavBar.css";

export const NavBar = ({ scrollToSection, refs }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  return (
    <>
      <nav className="NavbarContainer">
        <button className="flex justify-end" onClick={toggleSidebar}>
          <MenuIcon
            id="icon"
            sx={{
              width: "40px",
              height: "40px",
              borderRadius: "50px",
              padding: "4px",
              color: "white",
            }}
          />
        </button>
      </nav>

      <div
        className={`fixed top-0 left-0 w-64 h-full bg-[#232323]  text-white transform ${isOpen ? "translate-x-0 z-50" : "-translate-x-full z-50"
          } transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4">
          <h2 className="text-4xl mb-10 mt-4 text-white font-bold text-center">Menú</h2>
          <ul className="flex justify-center items-center text-[20px] flex-col">
            <li
              onClick={() => {
                toggleSidebar();
                scrollToSection(refs.sectionRef1);
              }}
              className="mb-2 hover:scale-105 transition-all cursor-pointer ease-in-out"
            >
              Inicio
            </li>
            <li
              onClick={() => {
                toggleSidebar();
                scrollToSection(refs.sectionRef2);
              }}
              className="mb-2 hover:scale-105 transition-all cursor-pointer ease-in-out"
            >
              Quienes Somos
            </li>
            <li
              onClick={() => {
                toggleSidebar();
                scrollToSection(refs.sectionRef3);
              }}
              className="mb-2 hover:scale-105 transition-all cursor-pointer ease-in-out"
            >
              Servicios
            </li>
            <li
              onClick={() => {
                toggleSidebar();
                scrollToSection(refs.fisicoChange);
              }}
              className="mb-2 hover:scale-105 transition-all cursor-pointer ease-in-out"
            >
              Cambios fisicos
            </li>
            <li
              onClick={() => {
                toggleSidebar();
                scrollToSection(refs.sectionRef4);
              }}
              className="mb-2 hover:scale-105 transition-all cursor-pointer ease-in-out"
            >
              Planes
            </li>
            <li
              onClick={() => {
                toggleSidebar();
                scrollToSection(refs.sectionRef7);
              }}
              className="mb-2 hover:scale-105 transition-all cursor-pointer ease-in-out"
            >
              Consultas
            </li>
            <li
              onClick={() => {
                toggleSidebar();
                scrollToSection(refs.sectionRef5);
              }}
              className="mb-2 hover:scale-105 transition-all cursor-pointer ease-in-out"
            >
              Donde Encontrarnos
            </li>
            <li
              onClick={() => {
                toggleSidebar();
                scrollToSection(refs.sectionRef6);
              }}
              className="mb-2 hover:scale-105 transition-all cursor-pointer ease-in-out"
            >
              Nuestro Sistema
            </li>
          </ul>
        </div>
      </div>

      {/* Fondo oscuro opcional cuando el sidebar está abierto */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};
