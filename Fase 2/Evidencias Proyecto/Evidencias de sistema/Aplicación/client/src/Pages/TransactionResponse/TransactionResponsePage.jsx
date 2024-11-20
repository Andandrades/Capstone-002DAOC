import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { UserNavBar } from '../../Components/UserNavBar';

const TransactionResponse = () => {
    const location = useLocation();
    const [transactionData, setTransactionData] = useState(null);
    const [error, setError] = useState(null);
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
        <div className="flex justify-center items-center min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-xl">
                <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">Estado de la Transacción</h1>
                
                {error && (
                    <p className="text-red-600 text-center mb-4">{error}</p>
                )}

                {transactionData ? (
                    <div className={`p-6 rounded-lg shadow-lg ${bgClass}`}>
                        <h2 className={`text-3xl font-semibold text-center ${statusClass} mb-4`}>
                            {isSuccess ? "Pago Exitoso" : (transactionData?.status || "Estado no disponible")}
                        </h2>
                        <div className="space-y-6 text-lg">
                            <div className="flex justify-between">
                                <p className="font-semibold">Monto:</p>
                                <p>${transactionData.amount}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="font-semibold">Orden de Compra:</p>
                                <p>{transactionData.buy_order}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="font-semibold">Fecha de Transacción:</p>
                                <p>{transactionData.transaction_date}</p>
                            </div>

                            {transactionData?.status === "Cancelada" ? (
                                <div className="text-center mt-4 bg-red-100 p-4 rounded-md">
                                    <p className="text-red-700 text-lg font-semibold">Su compra ha sido cancelada. Por favor, intente nuevamente o comuníquese con soporte.</p>
                                </div>
                            ) : (
                                <>
                                    <div className="flex justify-between">
                                        <p className="font-semibold">Tipo de Pago:</p>
                                        <p>{transactionData.payment_type_code}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="font-semibold">Código de Autorización:</p>
                                        <p>{transactionData.authorization_code}</p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                ) : (
                    <p className="text-center mt-6 text-xl text-gray-600">Cargando información de la transacción...</p>
                )}
            </div>
            <UserNavBar />
        </div>
    );
};

export default TransactionResponse;
