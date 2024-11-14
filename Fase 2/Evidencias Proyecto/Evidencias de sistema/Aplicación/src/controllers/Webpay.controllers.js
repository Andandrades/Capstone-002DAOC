const { WebpayPlus } = require("transbank-sdk");
const pool = require("../db");

WebpayPlus.commerceCode = '597055555532';
WebpayPlus.apiKey = 'YOUR_API_KEY_HERE';
WebpayPlus.configureForTesting();

const url = "";
const transaction = new WebpayPlus.Transaction();

const iniciarTransaccion = async (req, res) => {
  const { amount, sessionId, buyOrder, user_id,idplan } = req.body;
  const returnUrl = "http://localhost:3000/confirmar-pago";
  try {
    const response = await transaction.create(buyOrder, sessionId, amount, returnUrl);

    await pool.query(
      "INSERT INTO transactions (buy_order, session_id, amount, token,user_id,plan_id) VALUES ($1, $2, $3, $4, $5, $6)",
      [buyOrder, sessionId, amount, response.token, user_id,idplan]
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
    const transaction_date = new Date();
    const status = response.status == "AUTHORIZED" ? "Autorizada" : "Fallida";
    await pool.query(
      "UPDATE transactions SET status = $1, authorization_code = $2, payment_type_code = $3, transaction_date = $4 WHERE token = $5",
      [status, response.authorization_code, response.payment_type_code, transaction_date, token]
    );

    if (response.status === "AUTHORIZED") {
      const response = await pool.query( "SELECT * FROM transactions WHERE token = $1", [token]);
      const transactionData = response.rows;

      const additional_user = transactionData[0].user_id;
      const user_id = transactionData[0].user_id;
      const plan_id = 50;
      const remaining_classes = 10;
      console.log(user_id)

      try {
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
  obtenerEstadoTransaccion
};
