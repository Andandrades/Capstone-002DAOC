import React, { useEffect, useState } from "react";
import { NavBarAdmin } from "../../../Components/NavBarAdmin";
import AdminSideMenu from "../../../Components/AdminSideMenu";
import {
  Card,
  Metric,
  Text,
  AreaChart,
  BarChart,
  DonutChart,
  List,
  ListItem,
  Title,
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
} from "@tremor/react";
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
import { TableCell } from "@mui/material";

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

  const genderNames = {
    M: "Masculino",
    F: "Femenino",
    X: "Otro",
    U: "Sin Definir",
  };

  //Datos de transacciones
  const [transactions, setTransactions] = useState({});
  const [transactionsHistory, setTransactionsHistory] = useState({});
  const [genderList, setGenderList] = useState([]);
  const [avgData, setAvgData] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalSellsOpen, setIsModaSellsOpen] = useState(false);

  const [timeRange, setTimeRange] = useState("3m"); // Rango por defecto
  const today = new Date();

  const endDate = today.toISOString().split("T")[0];
  const newDate = new Date(today);
  newDate.setMonth(today.getMonth() - 6);
  const startDateDefault = newDate.toISOString().split("T")[0];

  const [loading, setLoading] = useState(true);

  const handleCloseModal = () => setIsModalOpen(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      //Datos de usuarios
      const resultado = await axios.get(`${URL}/dashboard/usersData`);
      setUsers(resultado.data);

      //Cantidad de Transacciones
      const resultadoTransacciones = await axios.get(
        `${URL}/dashboard/transactionsData`
      );
      setTransactions(resultadoTransacciones.data);

      //Lista de generos
      const resultadoGenders = await axios.get(`${URL}/dashboard/genderList`);
      setGenderList(resultadoGenders.data.data);

      const resultadoAvg = await axios.get(`${URL}/dashboard/avgData`);
      setAvgData(resultadoAvg.data);
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
    try {
      const response = await axios.get(
        `${URL}/dashboard/transactionsPerMonth`,
        {
          params: { time_range: timeRange, end_date: endDate },
        }
      );
      setTransactionsHistory({
        ventasPorMes: response.data,
      });
    } catch (error) {
      console.error("Error al obtener las ventas por mes:", error);
    }
  };

  useEffect(() => {
    fetchVentasPorMes();
  }, [timeRange]);

  const maxValue = Math.max(
    ...(transactionsHistory.ventasPorMes || []).map((item) =>
      Number(item.ventas_totales_por_mes)
    )
  );

  // Transformar los datos para el DonutChart y el List
  const chartData = Object.entries(genderList).map(
    ([gender, count], index) => ({
      name: genderNames[gender] || "Desconocido",
      value: count,
      color: ["bg-blue-500", "bg-pink-500", "bg-green-500", "bg-gray-500"][
        index
      ], // Colores personalizados
    })
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
          <div className="w-full flex justify-center 2xl:flex-row flex-col gap-10 2xl:gap-0 px-5 items-center pt-5">
            <div className="flex justify-center items-center gap-10 lg:w-full 2xl:w-1/2 flex-col 2xl:flex-row md:flex-row">
              <Card
                onClick={() => setIsModalOpen(true)}
                className="mx-auto max-w-xs min-w-xs cursor-pointer h-[220px] bg-indigo-700 text-white flex-col flex hover:scale-[1.02] rounded-md transition-all ease-in-out"
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
                className="mx-auto max-w-xs cursor-pointer h-[220px] bg-green-600 text-white flex-col flex hover:scale-[1.02] rounded-md transition-all ease-in-out"
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
            <div className="flex justify-center items-center gap-10 lg:w-full 2xl:w-1/2 flex-col 2xl:flex-row md:flex-row">
              <Card className="max-w-xs h-[300px] 2xl:h-[220px] flex-col text-white justify-center items-center flex rounded-md transition-all ease-in-out">
                <Title className="w-full pb-2">Generos</Title>
                <div className="w-full flex justify-center items-center">
                  <DonutChart
                    data={chartData}
                    category="value"
                    index="name"
                    valueFormatter={(value) => `${value} usuarios`}
                    colors={["blue", "pink", "green", "gray"]} // Personaliza los colores según los géneros
                    className="h-[120px] text-[15px]"
                    showAnimation={true}
                  />
                  <List className="items-center text-start">
                    {chartData.map((item) => (
                      <ListItem key={item.name} className="space-x-6">
                        <div className="flex items-center space-x-2.5 truncate">
                          <span
                            className={"h-2.5 w-2.5 shrink-0 rounded-sm"}
                            aria-hidden={true}
                          />
                          <span className="truncate dark:text-dark-tremor-content-emphasis">
                            {item.name}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium tabular-nums text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            {item.value}
                          </span>
                        </div>
                      </ListItem>
                    ))}
                  </List>
                </div>
              </Card>
              <Card className="max-w-xs h-[300px] flex justify-center flex-col">
                <h1 className="text-base font-semibold">
                  Promedio de Altura y Peso por Género
                </h1>
                <BarChart
                  data={avgData}
                  index="gender"
                  categories={["altura_promedio", "peso_promedio"]}
                  colors={["blue", "green"]}
                  valueFormatter={(value, category) => {
                    if (category === "peso_promedio") {
                      return `${value} kg`; // Formato para peso
                    }
                    if (category === "altura_promedio") {
                      return `${value} cm`; // Formato para altura
                    }
                    return value; // Formato predeterminado
                  }}
                  yAxisWidth={60}
                  className="h-[220px]"
                />
              </Card>
            </div>
          </div>
          <div className="flex lg:flex-row justify-center items-end flex-col px-2 2xl:px-5 pt-4">
            <div className="w-full">
              <h1 className="pt-5 text-xl px-5 pb-4">
                Cantidad de ingresos por mes
              </h1>
              <div className="gap-2 mb-4 px-5 md:px-0  grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
                {["1m", "3m", "5m", "1y", "max"].map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-4 py-2 rounded text-xs ${
                      timeRange === range
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {range === "1m"
                      ? "1 Mes"
                      : range === "3m"
                      ? "3 Meses"
                      : range === "5m"
                      ? "5 Meses"
                      : range === "1y"
                      ? "1 Año"
                      : "Máximo"}
                  </button>
                ))}
              </div>
              <AreaChart
                data={transactionsHistory.ventasPorMes}
                index="month"
                className="pr-3 2xl:px-4 w-full h-[200px] relative"
                categories={["ventas_totales_por_mes"]}
                valueFormatter={(value) =>
                  new Intl.NumberFormat("es-CL", {
                    style: "currency",
                    currency: "CLP",
                  }).format(value)
                }
                yAxisWidth={60}
                maxValue={maxValue}
                showAnimation={true}
              />
            </div>
            <div className="w-full flex flex-col justify-center">
              <div className="p-5 pb-4 w-full">
                <h1 className="text-xl">Cantidad de ventas</h1>
              </div>
              <BarChart
                data={transactions.ventasPorProducto}
                index="plan_name"
                categories={["cantidad_de_ventas"]}
                showAnimation={true}
                className=" w-full 2xl:w-[500px] h-[200px]"
                yAxisWidth={40}
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
