import React, { useEffect, useState } from "react";
import { NavBarAdmin } from "../../../Components/NavBarAdmin";
import axios from "axios";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import PurchaseCard from "../../../Components/PurchaseCard";

const AdminPurchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [isModalDate, setIsModalDate] = useState(false);

  const [selectedRange, setSelectedRange] = useState();
  const [isLoading, setIsLoading] = useState(false); // Estado para mostrar carga

  const handleSubmit = async () => {
    if (!selectedRange?.from || !selectedRange?.to) {
      alert("Por favor, selecciona un rango de fechas.");
      return;
    }

    try {
      setIsLoading(true);
      // Enviar las fechas al backend
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/getMouthPurchases`,
        {
          startDate: selectedRange.from,
          endDate: selectedRange.to,
        }
      );

      setPurchases(response.data); // Actualizar las compras con los datos del backend
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="min-h-screen flex flex-col pb-40">
        <div className="w-full flex justify-center items-center text-2xl font-semibold py-10">
          <h1>Movimientos y Ganancias</h1>
        </div>
        <div className="w-full flex relative justify-center flex-col">
          <div className="w-full flex justify-center">
            <button
              className="bg-blue-500 text-white py-5 px-5 rounded-md "
              onClick={() => setIsModalDate(!isModalDate)}
            >
              Seleccionar Mes
            </button>
          </div>

          <div className="w-full flex justify-center">
            <div
              className={`transition-all duration-300 overflow-hidden mb-3 ${
                isModalDate ? "max-h-auto p-4" : "max-h-0"
              } bg-gray-50 rounded-b-xl flex justify-center`}
            >
              <div className="bg-slate-100 p-5 rounded-xl">
                <DayPicker
                  mode="range"
                  selected={selectedRange}
                  onSelect={setSelectedRange}
                  defaultMonth={new Date()}
                />
                <div className="w-full flex justify-center">
                <button
                  className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  Filtrar
                </button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center flex-col items-center py-4">
            <h1 className="py-5 text-xl font-bold">Historial de compras</h1>
            <div className="flex justify-center flex-col w-full px-6">
              {purchases ? (
                <>
                  {purchases.map((purch, index) => (
                    <PurchaseCard purch={purch} key={index} />
                  ))}
                </>
              ) : null}
            </div>
          </div>
        </div>
      </section>
      <NavBarAdmin />
    </>
  );
};

export default AdminPurchases;
