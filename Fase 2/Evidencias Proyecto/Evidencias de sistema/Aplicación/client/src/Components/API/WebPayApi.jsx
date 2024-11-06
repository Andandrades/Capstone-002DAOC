// aqui van a ir las rutas para la api
import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const iniciarTransaccion = async (monto) => {
    try {
        const response = await axios.post("http://localhost:3000/iniciar-transaccion", {
            amount: 10000,
            sessionId: "mi_sesion",
            buyOrder: "orden_compra_12345",
            returnUrl: "http://localhost:5173/"
        });

        window.location.href = response.data.url + "?token_ws=" + response.data.token;
    } catch (error) {
        console.error("Error al iniciar la transacción:", error);
    }
};

export const ConfirmacionPago = () => {
    const location = useLocation();
    const tokenWs = new URLSearchParams(location.search).get("token_ws");

    useEffect(() => {
        const confirmarPago = async () => {
            try {
                const response = await axios.post("http://localhost:3000/confirmar-pago", {
                    token_ws: tokenWs
                });
                console.log("Pago confirmado:", response.data);
            } catch (error) {
                console.error("Error al confirmar el pago:", error);
            }
        };

        confirmarPago();
    }, [tokenWs]);

    return <div>Confirmando pago...</div>;
};
