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
import { useEffect, useState } from "react";

const AdminDashBoardUsersList = ({ handleCloseModal , formatDate }) => {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  

  const fetchUsers = async (page, size) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/dashboard/usersList`,
        { params: { page, pageSize: size } }
      );
      setUserList(response.data.users);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-h-[90%] p-6 min-w-[50%] ">
        <h2 className="text-2xl font-bold mb-6 mt-4">Lista de Usuarios</h2>
        <Table className="w-full overflow-y-scroll max-h-[500px] min-h-[500px]">
          <TableHead>
            <TableRow>
              <TableHeaderCell>Id</TableHeaderCell>
              <TableHeaderCell>Nombre</TableHeaderCell>
              <TableHeaderCell>Genero</TableHeaderCell>
              <TableHeaderCell>Correo</TableHeaderCell>
              <TableHeaderCell>Suscription</TableHeaderCell>
              <TableHeaderCell>Tipo de suscripción</TableHeaderCell>
              <TableHeaderCell>Ultimo ingreso</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell className="animate-pulse bg-gray-200 h-6 rounded-md"></TableCell>
                  <TableCell className="animate-pulse bg-gray-200 h-6 rounded-md"></TableCell>
                  <TableCell className="animate-pulse bg-gray-200 h-6 rounded-md"></TableCell>
                </TableRow>
              ))
            ) : userList.length > 0 ? (
              userList.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="truncate">{user.id}</TableCell>
                  <TableCell className="truncate">{user.name}</TableCell>
                  <TableCell className="truncate">{user.gender ? user.gender : 'No definido'}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  {user.suscription ? (
                    <TableCell className="flex justify-center">
                      <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
                        Activa
                      </span>
                    </TableCell>
                  ) : (
                    <TableCell className="flex justify-center">
                      <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
                        Inactiva
                      </span>
                    </TableCell>
                  )}
                  {user.suscription ? (
                    <TableCell className="text-center">
                      {user.subscription_name}
                    </TableCell>
                  ) : (
                    <TableCell className="text-center">
                      <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
                        Inactiva
                      </span>
                    </TableCell>
                  )}
                  {user.last_login ? (
                    <TableCell className="capitalize">{formatDate(user.last_login)}</TableCell>
                  ) : <TableCell className="capitalize text-gray-500">No registrado</TableCell>}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  No hay usuarios disponibles
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Anterior
          </button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <label htmlFor="pageSize" className="mr-2">
              Mostrar por página:
            </label>
            <select
              id="pageSize"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="border border-gray-300 rounded"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
          <button
            onClick={handleCloseModal}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoardUsersList;
