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
    return res.json(createResponse);
  } catch (error) {
    res.status(400);
    console.log(error);
    res.json({ error: error.message });
  }
};

module.exports = {
  createTransaction,
};
