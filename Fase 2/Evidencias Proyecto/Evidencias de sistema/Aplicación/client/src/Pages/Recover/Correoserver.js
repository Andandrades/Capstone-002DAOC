require('dotenv').config(); 
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.SERVER_PORT || 3000; 

app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASSWORD, 
  },
});

app.post('/send-email', (req, res) => {
  const { email, subject, message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject || 'Recupera tu contraseña',
    text: message || 'Se ha enviado un correo de recuperación al correo con el que te registraste.',
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error enviando el correo');
    } else {
      console.log(`Correo enviado: ${info.response}`);
      res.status(200).send('Correo enviado correctamente');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});