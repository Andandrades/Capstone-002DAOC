import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import { UserNavBar } from '../../Components/UserNavBar';

const TransactionResponse = () => {
    const location = useLocation();
    const [transactionData, setTransactionData] = useState(null);
    const [error, setError] = useState(null);

    // Obtener token_ws de la URL
    const tokenWs = new URLSearchParams(location.search).get("token");

    useEffect(() => {
        const fetchTransactionData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/transaction-status?token_ws=${tokenWs}`);
                setTransactionData(response.data);
            } catch (error) {
                console.error("Error al obtener el estado de la transacción:", error);
                setError("No se pudo obtener el estado de la transacción. Intente nuevamente.");
            }
        };

        if (tokenWs) {
            fetchTransactionData();
        }
    }, [tokenWs]);

    const isSuccess = transactionData?.status === "Autorizada";
    const statusClass = isSuccess ? "text-green-600" : "text-red-600";
    const bgClass = isSuccess ? "bg-green-50" : "bg-red-50";

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold text-center text-black mb-6">Estado de la Transacción</h1>
                {error ? (
                    <p className="text-red-500 text-center mt-4">{error}</p>
                ) : ""}
                {transactionData ? (
                    <div className={`mt-6 p-6 rounded-lg shadow-md ${bgClass}`}>
                        <h2 className={`text-3xl font-semibold text-center ${statusClass} mb-4`}>
                            {isSuccess ? "Pago Exitoso" : (transactionData?.status || "Estado no disponible")}
                        </h2>
                        <div className="space-y-4 text-lg">
                            <p><span className="font-bold">Monto:</span> ${transactionData.amount}</p>
                            <p><span className="font-bold">Orden de Compra:</span> {transactionData.buy_order}</p>
                            <p><span className="font-bold">Fecha de Transacción:</span> {transactionData.transaction_date}</p>

                            {transactionData?.status == "Cancelada" ? <> <p>Su compra fue cancelada mejorar la respuesta</p> </> :
                                <>
                                    <p><span className="font-bold">Tipo de Pago:</span> {transactionData.payment_type_code}</p>
                                    <p><span className="font-bold">Código de Autorización:</span> {transactionData.authorization_code}</p>
                                </>
                            }

                        </div>
                    </div>
                ) : (
                    <p className="text-center mt-4 text-xl text-gray-600">Cargando información de la transacción...</p>
                )}
            </div>
            <UserNavBar />
        </div>
    );
};

export default TransactionResponse;
