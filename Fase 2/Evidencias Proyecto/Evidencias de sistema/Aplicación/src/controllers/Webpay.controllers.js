const { WebpayPlus } = require("transbank-sdk");
const pool = require("../db");

WebpayPlus.commerceCode = '597055555532';
WebpayPlus.apiKey = 'YOUR_API_KEY_HERE';
WebpayPlus.configureForTesting();

const url = "";
const transaction = new WebpayPlus.Transaction();

const iniciarTransaccion = async (req, res) => {
  const { amount, sessionId, buyOrder, } = req.body;
  const returnUrl = "http://localhost:3000/confirmar-pago";
  try {
    const response = await transaction.create(
      buyOrder,
      sessionId,
      amount,
      returnUrl
    );
    // Guardar la transacción en la base de datos si es necesario
    await pool.query(
      "INSERT INTO transactions (buy_order, session_id, amount, token) VALUES ($1, $2, $3, $4)",
      [buyOrder, sessionId, amount, response.token]
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
  const { token_ws: token } = req.query;

  try {
    const response = await transaction.commit(token);
    const transaction_date = new Date();

    await pool.query(
      "UPDATE transactions SET status = $1, authorization_code = $2, payment_type_code = $3, transaction_date =$4 WHERE token = $5",
      [response.status, response.authorization_code, response.payment_type_code, transaction_date, token]
    );
    res.redirect(`http://localhost:5173/?token=${token}`);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  iniciarTransaccion,
  confirmarPago,
};
