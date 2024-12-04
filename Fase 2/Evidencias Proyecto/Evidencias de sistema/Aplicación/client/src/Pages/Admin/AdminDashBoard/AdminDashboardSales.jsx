import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  TableFoot,
} from "@tremor/react";
import axios from "axios";

import { RiCurrencyFill } from "@remixicon/react";

const AdminDashboardSales = ({ productsSells , formatToCLP , formatDate , handleCloseModal }) => {

  const URL = `${import.meta.env.VITE_API_URL}`;

  const [transactions, setTrasactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const respuesta = await axios.get(
        `${URL}/dashboard/transactionsList/${currentPage}/10`
      );
      setTrasactions(respuesta.data.transactions);
      setTotalPages(respuesta.data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener transacciones", error);
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    fetchTransactions();
  }, [currentPage]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-h-[90%] p-6 min-w-[50%] ">
        <div className="">
          <h1 className="text-xl">Historial de ventas</h1>
          <span className="text-gray-600">Ventas totales: {productsSells[0].total_transactions}</span>
          <Table className="w-full mt-2 overflow-y-scroll max-h-[500px] min-h-[500px]">
            <TableHead>
              <TableRow>
                <TableHeaderCell>Id</TableHeaderCell>
                <TableHeaderCell>Nombre</TableHeaderCell>
                <TableHeaderCell>Monto</TableHeaderCell>
                <TableHeaderCell>Fecha de transacción</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="animate-pulse bg-gray-200 h-1 rounded-md"
                  ></TableCell>
                </TableRow>
              ) : (
                <>
                  {transactions.length > 0 ? (
                    transactions.map((transaction , index) => (
                      <TableRow key={index}>
                        <TableCell>{transaction.transaction_id}</TableCell>
                        <TableCell>{transaction.plan_name}</TableCell>
                        <TableCell className="flex justify-start items-center text-center"><RiCurrencyFill className="text-green-500"/> {formatToCLP(transaction.amount)}</TableCell>
                        <TableCell className="capitalize">{formatDate(transaction.transaction_date)}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center">
                        No hay usuarios disponibles
                      </TableCell>
                    </TableRow>
                  )}
                </>
              )}
            </TableBody>
          </Table>
          <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => handlePreviousPage()}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Anterior
          </button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => handleNextPage()}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
        <div className="mt-4 flex justify-end">
          
          <button
            onClick={handleCloseModal}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Cerrar
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardSales;
