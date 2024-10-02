const pool = require("../db");
const WebpayPlus = require("transbank-sdk").WebpayPlus;

//Crear transaccion
const createTransaction = async (req, res) => {
  const {amount, return_Url } = req.body;
  const buy_Order = `ORDER-${Date.now()}`; // Genera un número basado en la hora actual
  const session_Id = `SESSION-${Date.now()}`; // También basado en la hora actual
  try {
    // Es necesario ejecutar dentro de una función async para utilizar await
    const createResponse = await new WebpayPlus.Transaction().create(
      buy_Order,
      session_Id,
      amount,
      return_Url
    );
    console.log(buy_Order)
    return res.json(createResponse);
  } catch (error) {
    res.status(400);
    console.log(error);
    console.log("buy_Order:", buy_Order);
    console.log("session_Id:", session_Id);
    console.log("amount_body:", amount_body);
    console.log("return_Url:", return_Url);
    console.log("req.body:", req.body);
    res.json({ error: error.message });
  }
};

module.exports = {
  createTransaction,
};
