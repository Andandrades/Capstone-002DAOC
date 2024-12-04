import React, { useEffect, useState } from "react";
import { NavBarAdmin } from "../../../Components/NavBarAdmin";
import AdminSideMenu from "../../../Components/AdminSideMenu";
import { Card, Metric, Text, AreaChart , BarChart } from "@tremor/react";
import { es } from "date-fns/locale";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

import axios from "axios";
import GroupIcon from "@mui/icons-material/Group";
import AdminDashBoardUsersList from "./AdminDashBoardUsersList";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { RiTimeLine, RiCalendarTodoFill } from "@remixicon/react";
import AdminDashboardSales from "./AdminDashboardSales";

const AdminDashboard = () => {
  const URL = `${import.meta.env.VITE_API_URL}`;

  const formatToCLP = (value) => {
    if (isNaN(value)) {
      return "0 CLP"; // Si el valor no es un número válido, devolvemos un valor por defecto
    }

    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(value);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleString("es-CL", options);
  };

  //Datos de usuarios
  const [users, setUsers] = useState({
    totalUsers: 0,
    newUsers: 0,
    activeUsers: 0,
  });
  //Datos de transacciones
  const [transactions, setTransactions] = useState({});
  const [transactionsHistory, setTransactionsHistory] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalSellsOpen, setIsModaSellsOpen] = useState(false);
  const [startDate, setStartDate] = useState(null); // Fecha de inicio seleccionada

  // Obtener la fecha de hoy (endDate siempre será hoy)
  const today = new Date();
  const endDate = today.toISOString().split("T")[0];
  const newDate = new Date(today);
  newDate.setMonth(today.getMonth() - 6);
  const startDateDefault = newDate.toISOString().split("T")[0];

  useEffect(() => {
    setStartDate(startDateDefault);
  }, [startDateDefault]);

  const [loading, setLoading] = useState(true);
  const [dateSelector, setdateSelector] = useState(false);

  const handleCloseModal = () => setIsModalOpen(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      //Datos de usuarios
      const resultado = await axios.get(`${URL}/dashboard/usersData`);
      setUsers(resultado.data);

      const resultadoTransacciones = await axios.get(
        `${URL}/dashboard/transactionsData`
      );
      setTransactions(resultadoTransacciones.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchVentasPorMes = async () => {
    if (startDate) {
      try {
        const response = await axios.get(
          `${URL}/dashboard/transactionsPerMonth`,
          {
            params: {
              start_date: startDate,
              end_date: endDate, // La fecha de fin es siempre el día de hoy
            },
          }
        );
        setTransactionsHistory({
          ventasPorMes: response.data,
        });
      } catch (error) {
        console.error("Error al obtener las ventas por mes:", error);
      }
    }
  };

  // Actualiza la fecha de inicio cuando se seleccione una nueva en el calendario
  const handleDateChange = (date) => {
    if (date) {
      setStartDate(date);
      setdateSelector(false);
    }
  };

  // Llamar a la API cada vez que se cambie la fecha de inicio
  useEffect(() => {
    if (startDate) {
      fetchVentasPorMes();
    }
  }, [startDate]);

  const maxValue = Math.max(
    ...(transactionsHistory.ventasPorMes || []).map((item) =>
      Number(item.ventas_totales_por_mes)
    )
  );

  return (
    <>
      <div className="flex lg:mb-0 mb-32">
        <div className="hidden lg:block">
          <AdminSideMenu />
        </div>
        <div className="min-h-screen w-screen flex-col">
          <div className=" p-4">
            <h1 className="text-xl">Dashboard</h1>
          </div>
          <div className="w-full grid-cols-1 lg:grid-cols-2 gap-5 grid pt-5">
            <Card
              onClick={() => setIsModalOpen(true)}
              className="mx-auto max-w-xs cursor-pointer bg-indigo-700 text-white flex-col flex hover:scale-[1.02] rounded-md transition-all ease-in-out"
            >
              <div className="flex justify-start mb-4 items-center gap-2">
                <div className="bg-slate-200 rounded-full p-2">
                  <GroupIcon className=" text-indigo-700" />
                </div>
                <h1 className="text-2xl font-bold">Usuarios</h1>
              </div>
              <div className=" w-full text-start">
                <h1 className="font-medium text-2xl">
                  Totales: {users.totalUsers}
                </h1>
              </div>
              <div className=" w-full text-start">
                <h1 className="font-medium">
                  Usuarios activos: {users.activeUsers}
                </h1>
              </div>
              <div className=" w-full text-start">
                <h1 className="font-medium">
                  Usuarios nuevos esta semana: {users.newUsers}
                </h1>
                {users.newUsers > 0 ? (
                  <TrendingUpIcon
                    className="text-green-500"
                    sx={{ fontSize: "30px" }}
                  />
                ) : (
                  <TrendingDownIcon />
                )}
              </div>
            </Card>
            <Card
              onClick={() => setIsModaSellsOpen(true)}
              className="mx-auto max-w-xs cursor-pointer bg-green-600 text-white flex-col flex hover:scale-[1.02] rounded-md transition-all ease-in-out"
            >
              {!loading ? (
                <>
                  <div className="flex justify-start mb-4 items-center gap-2">
                    <div className="bg-slate-200 rounded-full p-2">
                      <AttachMoneyIcon className=" text-green-700" />
                    </div>
                    <h1 className="text-2xl font-bold">Ventas</h1>
                  </div>
                  <div className=" w-full text-start">
                    <h1 className="font-medium text-2xl">
                      Ventas Totales:{" "}
                      {
                        transactions.ventasUltimos31Dias
                          .total_transactions_31_days
                      }
                    </h1>
                  </div>
                  <div className=" w-full text-start">
                    <h1 className="font-medium text-2xl">
                      Ganancias:{" "}
                      {formatToCLP(
                        transactions.ventasUltimos31Dias.total_sales_31_days
                      )}
                    </h1>
                  </div>
                  <div className=" w-full text-start flex justify-start pt-2 text-gray-200">
                    <RiTimeLine />
                    <span className="">Ultimos 31 dias</span>
                  </div>
                </>
              ) : null}
            </Card>
          </div>
          <div className="flex lg:flex-row flex-col px-5">
            <div className="w-full lg:w-1/2">
              <h1 className="pt-5 text-xl px-5">
                Cantidad de ingresos por mes
              </h1>
              <div className="w-full relative flex justify-end pr-5">
                <button
                  onClick={() => setdateSelector(!dateSelector)}
                  className=" bg-blue-500 text-white p-1 rounded-md m-5"
                >
                  <RiCalendarTodoFill />
                </button>
                {dateSelector ? (
                  <div className="absolute bg-white top-[80%] shadow-lg z-30">
                    <DayPicker
                      selected={startDate}
                      onDayClick={handleDateChange}
                      disabled={{ after: today }}
                      defaultMonth={startDateDefault}
                      locale={es}
                    />
                  </div>
                ) : null}
              </div>
              <AreaChart
                data={transactionsHistory.ventasPorMes}
                index="month"
                className="px-4"
                categories={["ventas_totales_por_mes"]}
                valueFormatter={(value) =>
                  new Intl.NumberFormat("es-CL", {
                    style: "currency",
                    currency: "CLP",
                  }).format(value)
                }
                yAxisWidth={100}
                maxValue={maxValue}
                showAnimation={true}
              />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col justify-between">
              <div className="p-5">
                <h1 className="text-xl">Cantidad de ventas</h1>
              </div>
              <BarChart
              data={transactions.ventasPorProducto}
              index="plan_name"
              categories={["cantidad_de_ventas"]} 
              showAnimation={true}

              />
            </div>
          </div>
        </div>
      </div>

      <div className="block lg:hidden">
        <NavBarAdmin />
      </div>
      {isModalOpen && (
        <AdminDashBoardUsersList
          handleCloseModal={handleCloseModal}
          formatDate={formatDate}
        />
      )}
      {isModalSellsOpen && (
        <AdminDashboardSales
          handleCloseModal={() => setIsModaSellsOpen(false)}
          productsSells={transactions.cantidadTransacciones}
          formatToCLP={formatToCLP}
          formatDate={formatDate}
        />
      )}
    </>
  );
};

export default AdminDashboard;
