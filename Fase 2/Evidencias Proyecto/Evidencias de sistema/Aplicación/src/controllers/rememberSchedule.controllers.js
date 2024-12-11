const pool = require("../db");
const nodemailer = require("nodemailer");

// Configuración del transportador de Nodemailer
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASSWORD,
  },
});

const getNextDayClasses = async (req, res) => {
  const query = `
    SELECT 
      sc.class_id, 
      sc.scheduled_date, 
      sc.actual_cap, 
      sc.gym_schedule_id, 
      sc.client_id, 
      u.email, 
      u."name", 
      gs.schedule_date,
      gs.start_hour 
    FROM 
      schedule_classes sc
    LEFT JOIN 
      users u 
    ON 
      sc.client_id = u.id
    JOIN 
      gym_schedule gs 
    ON 
      sc.gym_schedule_id = gs.gym_schedule_id
    WHERE 
      gs.schedule_date = CURRENT_DATE + INTERVAL '1 day';
  `;

  try {
    // Ejecutar la consulta
    const { rows } = await pool.query(query);

    // Si no hay clases programadas
    if (rows.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No hay clases programadas para el día siguiente.",
        data: [],
      });
    }

    // Enviar correos electrónicos a los clientes
    for (const classInfo of rows) {
      const { email, name, schedule_date,start_hour } = classInfo;

      if (email) {
        const mailOptions = {
          from: "contacto@soldadogym.com",
          to: email,
          subject: "Recordatorio: Clase programada para mañana",
          html: `
            <p>Hola ${name},</p>
            <p>Te recordamos que tienes una clase programada para el día de mañana (${start_hour}).</p>
            <p>¡No faltes! Te esperamos en Soldado Gym.</p>
          `,
        };

        try {
          await transporter.sendMail(mailOptions);
          console.log(`Correo enviado a ${email}`);
        } catch (error) {
          console.error(`Error al enviar correo a ${email}:`, error.message);
        }
      }
    }

    // Retornar las clases del día siguiente
    res.status(200).json({
      success: true,
      message: "Clases obtenidas y recordatorios enviados.",
      data: rows,
    });
  } catch (error) {
    console.error("Error ejecutando la consulta para clases del día siguiente:", error.message);
    res.status(500).json({
      success: false,
      message: "Error al obtener las clases del día siguiente o al enviar recordatorios.",
    });
  }
};

module.exports = {
  getNextDayClasses,
};
