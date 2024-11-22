// aqui van a ir las rutas para la api
import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
const URL = `${import.meta.env.VITE_API_URL}`;


export const iniciarTransaccion = async (props) => {
    const { amount, name, userId,id } = props;
    try {
        const response = await axios.post(`${URL}/iniciar-transaccion`, {
            idplan:id,
            amount: amount, 
            sessionId: "mi_sesion",
            buyOrder: name,
            user_id: userId
        });

        window.location.href = response.data.url + "?token_ws=" + response.data.token;
    } catch (error) {
        console.error("Error al iniciar la transacción:", error);
    }
};

export const IniciarConsulta = async (props) => {
    const { amount, name, userId, nutriScheduleId } = props;
    try {
        const response = await axios.post(`${URL}/iniciar-consulta`, {
            amount: amount, 
            sessionId: "mi_sesion",
            buyOrder: name,
            user_id:userId,
            nutriScheduleId: nutriScheduleId
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
                const response = await axios.get(`${URL}/confirmar-pago`, {
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
