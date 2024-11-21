const { WebpayPlus } = require("transbank-sdk");
const pool = require("../db");
const axios = require("axios");

WebpayPlus.commerceCode = "597055555532";
WebpayPlus.apiKey = "YOUR_API_KEY_HERE";
WebpayPlus.configureForTesting();

const API_URL = process.env.VITE_API_URL;
const FRONT_URL = process.env.FRONTEND_URL;
const transaction = new WebpayPlus.Transaction();

const iniciarTransaccion = async (req, res) => {
  const { amount, sessionId, buyOrder, user_id, idplan } = req.body;
  const returnUrl = `${API_URL}/confirmar-pago`; // Usa la variable de entorno
  try {
    const response = await transaction.create(buyOrder, sessionId, amount, returnUrl);
    const transaction_date = new Date();
    await pool.query(
      "INSERT INTO transactions (buy_order, session_id, amount, token, user_id, plan_id, transaction_date) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [buyOrder, sessionId, amount, response.token, user_id, idplan, transaction_date]
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
    const transaction_date = new Date();
    try {
      await pool.query(
        "UPDATE transactions SET status = $1, transaction_date = $2 WHERE token = $3",
        ["Cancelada", transaction_date, TBK_TOKEN]
      );
      return res.redirect(`${FRONT_URL}/TransactionResponse/?token=${TBK_TOKEN}`);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  try {
    const response = await transaction.commit(token);
    const status = response.status === "AUTHORIZED" ? "Autorizada" : "Fallida";

    await pool.query(
      "UPDATE transactions SET status = $1, authorization_code = $2, payment_type_code = $3 WHERE token = $4",
      [status, response.authorization_code, response.payment_type_code, token]
    );

    if (response.status === "AUTHORIZED") {
      const dbResponse = await pool.query(
        "SELECT t.*, p.* FROM transactions t JOIN plans p ON t.plan_id = p.plan_id WHERE t.token = $1",
        [token]
      );

      const transactionData = dbResponse.rows[0];
      const { user_id, plan_id, n_class: remaining_classes } = transactionData;
      const additional_user = null;
      const transaction_date = new Date();

      try {
        await pool.query(
          "INSERT INTO public.suscription (start_date, additional_user, user_id, plan_id, remaining_classes) VALUES($1, $2, $3, $4, $5)",
          [transaction_date, additional_user, user_id, plan_id, remaining_classes]
        );
        res.redirect(`${FRONT_URL}/TransactionResponse/?token=${token}`);
      } catch (error) {
        console.error("Error al crear la suscripción:", error);
        res.status(500).json({ error: error.message });
      }
    } else {
      res.redirect(`${FRONT_URL}/TransactionResponse/?token=${token}`);
    }
  } catch (error) {
    console.error("Error en la transacción:", error);
    res.status(500).json({ error: error.message });
  }
};

const iniciarConsulta = async (req, res) => {
  const { amount, sessionId, buyOrder, user_id, nutriScheduleId } = req.body;
  const returnUrl = `${API_URL}/confirmar-pago-consulta?user_id=${user_id}&nutriScheduleId=${nutriScheduleId}`;

  try {
    const response = await transaction.create(buyOrder, sessionId, amount, returnUrl);
    const transaction_date = new Date();
    await pool.query(
      "INSERT INTO transactions (buy_order, session_id, amount, token, user_id, transaction_date) VALUES ($1, $2, $3, $4, $5, $6)",
      [buyOrder, sessionId, amount, response.token, user_id, transaction_date]
    );

    res.json({
      url: response.url,
      token: response.token,
      user_id,
      nutriScheduleId,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const confirmarPagoconsulta = async (req, res) => {
  const { token_ws: token, TBK_TOKEN, user_id, nutriScheduleId } = req.query;

  if (TBK_TOKEN) {
    try {
      await pool.query("UPDATE transactions SET status = $1 WHERE token = $2", [
        "Cancelada",
        TBK_TOKEN,
      ]);
      return res.redirect(`${FRONT_URL}/TransactionResponse/?token=${TBK_TOKEN}`);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  try {
    const response = await transaction.commit(token);
    const status = response.status === "AUTHORIZED" ? "Autorizada" : "Fallida";

    await pool.query(
      "UPDATE transactions SET status = $1, authorization_code = $2, payment_type_code = $3 WHERE token = $4",
      [status, response.authorization_code, response.payment_type_code, token]
    );

    if (response.status === "AUTHORIZED") {
      try {
        await axios.patch(`${API_URL}/nutriScheduleClient/${nutriScheduleId}`, {
          client_id: user_id,
        });
        res.redirect(`${FRONT_URL}/TransactionResponse/?token=${token}`);
      } catch (error) {
        console.error("Error al registrar cliente:", error.message);
        res.status(500).json({ error: "Error al procesar la consulta" });
      }
    } else {
      res.redirect(`${FRONT_URL}/TransactionResponse/?token=${token}`);
    }
  } catch (error) {
    console.error("Error en la transacción:", error);
    res.status(500).json({ error: error.message });
  }
};

const obtenerEstadoTransaccion = async (req, res) => {
  const { token_ws: token } = req.query;

  try {
    const response = await pool.query("SELECT * FROM transactions WHERE token = $1", [
      token,
    ]);

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
  confirmarPagoconsulta,
};
