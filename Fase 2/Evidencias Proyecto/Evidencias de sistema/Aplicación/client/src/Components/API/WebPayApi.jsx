// aqui van a ir las rutas para la api
import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
 

export const iniciarTransaccion = async (props) => {
    const { amount, name, userId,id } = props;
    console.log(userId)
    try {
        const response = await axios.post("http://localhost:3000/iniciar-transaccion", {
            idplan:id,
            amount: amount,
            sessionId: "mi_sesion",
            buyOrder: name,
            user_id:userId
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
                const response = await axios.get("http://localhost:3000/confirmar-pago", {
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
