const { WebpayPlus } = require("transbank-sdk");
const pool = require("../db");
const axios = require('axios');

WebpayPlus.commerceCode = '597055555532';
WebpayPlus.apiKey = 'YOUR_API_KEY_HERE';
WebpayPlus.configureForTesting();

const url = "";
const transaction = new WebpayPlus.Transaction();

const iniciarTransaccion = async (req, res) => {
  const { amount, sessionId, buyOrder, user_id, idplan } = req.body;
  const returnUrl = "http://localhost:3000/confirmar-pago";
  try {
    const response = await transaction.create(buyOrder, sessionId, amount, returnUrl);
    const transaction_date = new Date();
    await pool.query(
      "INSERT INTO transactions (buy_order, session_id, amount, token,user_id,plan_id,transaction_date) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [buyOrder, sessionId, amount, response.token, user_id, idplan,transaction_date]
    );

    res.json({
      url: response.url,
      token: response.token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const confirmarPago = async (req, res) => {
  const { token_ws: token, TBK_TOKEN } = req.query;
  if (TBK_TOKEN) {
    //transacion cancelada 
    const transaction_date = new Date();
    try {
      await pool.query(
        "UPDATE transactions SET status = $1, transaction_date =$2 WHERE token = $3",
        ['Cancelada', transaction_date, TBK_TOKEN]
      );
      return res.redirect(`http://localhost:5173/TransactionResponse/?token=${TBK_TOKEN}`);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  try {
    const response = await transaction.commit(token);
    const status = response.status == "AUTHORIZED" ? "Autorizada" : "Fallida";
    await pool.query(
      "UPDATE transactions SET status = $1, authorization_code = $2, payment_type_code = $3  WHERE token = $4",
      [status, response.authorization_code, response.payment_type_code, token]
    );

    if (response.status === "AUTHORIZED") {
      const response = await pool.query("SELECT t.*, p.* FROM transactions t JOIN plans p ON t.plan_id = p.plan_id WHERE t.token = $1;", [token]);
      const transactionData = response.rows;
      const additional_user = null;
      const user_id = transactionData[0].user_id;
      const plan_id = transactionData[0].plan_id;
      const remaining_classes = transactionData[0].n_class;

      try {
        const transaction_date = new Date();

        await pool.query(
          "INSERT INTO public.suscription ( start_date, additional_user, user_id, plan_id, remaining_classes) VALUES($1, $2, $3, $4, $5) RETURNING *",
          [transaction_date, additional_user, user_id, plan_id, remaining_classes]
        );

        res.redirect(`http://localhost:5173/TransactionResponse/?token=${token}`);
      } catch (error) {
        console.error("Error al crear la suscripción:", error);
        res.status(500).json({ error: error.message });

      }
    } else {
      res.redirect(`http://localhost:5173/TransactionResponse/?token=${token}`);
    }
  } catch (error) {
    console.error("Error en la transacción:", error);
    res.status(500).json({ error: error.message });
  }
};

const iniciarConsulta = async (req, res) => {
  const { amount, sessionId, buyOrder, user_id, nutriScheduleId } = req.body;
  const returnUrl = `http://localhost:3000/confirmar-pago-consulta?user_id=${user_id}&nutriScheduleId=${nutriScheduleId}`;
  try {
    const response = await transaction.create(buyOrder, sessionId, amount, returnUrl);
    const transaction_date = new Date();
    await pool.query(
      "INSERT INTO transactions (buy_order, session_id, amount, token,user_id,transaction_date) VALUES ($1, $2, $3, $4, $5, $6)",
      [buyOrder, sessionId, amount, response.token, user_id, transaction_date]);

    res.json({
      url: response.url,
      token: response.token,
      user_id: user_id,
      nutriScheduleId: nutriScheduleId
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const confirmarPagoconsulta = async (req, res) => {
  const { token_ws: token, TBK_TOKEN, user_id, nutriScheduleId } = req.query;
  console.log("user_id :", user_id)
  console.log("nutriScheduleId", nutriScheduleId)
  if (TBK_TOKEN) {
    //transacion cancelada 
    try {
      await pool.query(
        "UPDATE transactions SET status = $1 WHERE token = $2",
        ['Cancelada', TBK_TOKEN]
      );
      return res.redirect(`http://localhost:5173/TransactionResponse/?token=${TBK_TOKEN}`);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  try {
    const response = await transaction.commit(token);
    const status = response.status == "AUTHORIZED" ? "Autorizada" : "Fallida";
    await pool.query(
      "UPDATE transactions SET status = $1, authorization_code = $2, payment_type_code = $3 WHERE token = $4",
      [status, response.authorization_code, response.payment_type_code, token]
    );
    if (response.status === "AUTHORIZED") {
      try {
        const response = await axios.patch(`http://localhost:3000/nutriScheduleClient/${nutriScheduleId}`, { client_id: user_id });
        console.log("respuesta del registrar cliente", response)

        res.redirect(`http://localhost:5173/TransactionResponse/?token=${token}`);
      } catch (error) {
        console.error("Error al crear la suscripción:", error.message);
        res.status(500).json({ error: "Error al procesar la suscripción" });
      }
    }
    else {
      res.redirect(`http://localhost:5173/TransactionResponse/?token=${token}`);
    }
  } catch (error) {
    console.error("Error en la transacción:", error);
    res.status(500).json({ error: error.message });
  }
};



const obtenerEstadoTransaccion = async (req, res) => {
  const { token_ws: token } = req.query;

  try {
    const response = await pool.query(
      "SELECT * FROM transactions WHERE token = $1",
      [token]
    );

    if (response.rows.length === 0) {
      return res.status(404).json({ error: "Transacción no encontrada." });
    }

    res.json(response.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la transacción." });
  }
};

module.exports = {
  iniciarTransaccion,
  confirmarPago,
  obtenerEstadoTransaccion,
  iniciarConsulta,
  confirmarPagoconsulta
};
