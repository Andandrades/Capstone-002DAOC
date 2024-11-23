import React, { useEffect, useState } from "react";
import { NavBarAdmin } from "../../../Components/NavBarAdmin";
import axios from "axios";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import PurchaseCard from "../../../Components/PurchaseCard";
import { format } from "date-fns";

const AdminPurchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [isModalDate, setIsModalDate] = useState(false);

  const [selectedRange, setSelectedRange] = useState();
  const [isLoading, setIsLoading] = useState(false); // Estado para mostrar carga
  const [totalSales, setTotalSales] = useState(0); // Estado para total de ventas

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

      setPurchases(response.data);
      calculateTotalSales(response.data);
      setIsModalDate(false);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCLP = (amount) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(amount);
  };

  const calculateTotalSales = (data) => {
    const total = data.reduce((sum, purchase) => {
      const amount = Number(purchase.amount); // Asegúrate de convertir el valor a número
      return sum + (isNaN(amount) ? 0 : amount); // Si el valor no es un número, suma 0
    }, 0);
    setTotalSales(total);
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
              Seleccionar Rango
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
            {selectedRange?.from && selectedRange?.to && (
              <div className="flex flex-col text-start justify-start items-start w-full px-6 py-3 gap-2">
                <p className="text-gray-600 mt-2 text-center w-full text-xl">
                  Ventas:
                  <span className="font-semibold text-green-500">
                    {formatCLP(totalSales)}
                  </span>{" "}
                </p>
                <div>
                  <span className="font-semibold">
                    Desde {format(selectedRange.from, "dd/MM/yyyy")}
                  </span>
                  <span className="font-semibold">
                    Hasta {format(selectedRange.to, "dd/MM/yyyy")}
                  </span>
                </div>
              </div>
            )}
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
