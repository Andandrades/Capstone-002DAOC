const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '1c468d5f9aff6c',
      pass: '0afa43917fd786',
    },
  });

// Ruta para enviar correos
const sendEmail = async (req, res) => {

  const { to, subject, html } = req.body;

  const mailOptions = {
    from: '"Tu App" <tu_correo@gmail.com>', 
    to, 
    subject, 
    html, 
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: 'Correo enviado correctamente.' });
  } catch (error) {
    console.error('Error al enviar correo:', error);
    res.status(500).send({ message: 'Error al enviar correo.', error });
  }
};

module.exports = {
    sendEmail
  };