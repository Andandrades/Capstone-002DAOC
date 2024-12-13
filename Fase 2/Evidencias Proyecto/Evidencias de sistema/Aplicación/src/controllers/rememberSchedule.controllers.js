const pool = require("../db");
const nodemailer = require("nodemailer");
const { format } = require("date-fns");

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
    const { rows } = await pool.query(query);

    if (rows.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No hay clases programadas para el día siguiente.",
        data: [],
      });
    }

    for (const classInfo of rows) {
      const { email, name, schedule_date, start_hour } = classInfo;

      if (email) {
        const formattedDate = format(new Date(schedule_date), "dd/MM/yyyy");

        const mailOptions = {
          from: "contacto@soldadogym.com",
          to: email,
          subject: "Recordatorio: Clase programada para mañana",
          html: `
          <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 30px 20px;">
            <div
              style="
                max-width: 600px;
                margin: 0 auto;
                background: #fff;
                border-radius: 10px;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                overflow: hidden;
              "
            >
              <!-- Encabezado -->
              <div
                style="
                  background: #333;
                  color: #fff;
                  padding: 20px;
                  text-align: center;
                "
              >
                <img src="https://i.imgur.com/GTIQ1BN.png" alt="Logo" style="width: 200px; height: auto; margin: auto;" />
                <h1 style="margin: 0; font-size: 24px;">Soldado Gym</h1>
              </div>
    
              <!-- Contenido principal -->
              <div style="padding: 30px; text-align: center;">
                <h2 style="color: #333; font-size: 22px; margin-bottom: 15px;">
                  Estimado/a ${name}:  
                </h2>
                <p style="color: #444; font-size: 16px; line-height: 1.8; margin-bottom: 25px;">
                  Nos dirigimos a usted para recordarle que tiene una clase programada en nuestro gimnasio el día de mañana ${formattedDate}
                  a las ${start_hour}.
                </p>
                <p style="color: #444; font-size: 16px; line-height: 1.8; margin-bottom: 25px;">
                  Si tiene alguna pregunta o requiere asistencia adicional, no dude en contactarnos a través de nuestros 
                  canales oficiales. Estamos aquí para ayudarle en todo lo que necesite.  
                </p>
                <p style="color: #444; font-size: 16px; line-height: 1.8; margin-bottom: 25px;">
                  Agradecemos su confianza en Soldado Gym y esperamos verle mañana.  
                </p>
              </div>
    
              <!-- Pie de página -->
              <div
                style="
                  background: #333;
                  color: #fff;
                  text-align: center;
                  padding: 15px;
                  font-size: 14px;
                "
              >
                <p>
                  © 2024 Soldado Gym
                </p>
              </div>
            </div>
          </div>
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

const getNextDayConsultations = async (req, res) => {
  const querynutri = `select ns.nutri_schedule_id ,ns."date", ns.start_hour,u."name", u.email  from nutri_schedule ns join users u on ns.client_id = u.id  where available = false and "date"  = CURRENT_DATE + INTERVAL '1 day';`;
  try {
    const { rows } = await pool.query(querynutri);

    if (rows.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No hay clases programadas para el día siguiente.",
        data: [],
      });
    }

    for (const classInfo of rows) {
      const { email, name, date, start_hour } = classInfo;

      if (email) {
        const formattedDate = format(new Date(date), "dd/MM/yyyy");

        const mailOptions = {
          from: "contacto@soldadogym.com",
          to: email,
          subject: "Recordatorio: Consulta programada para mañana",
          html: `
          <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 30px 20px;">
            <div
              style="
                max-width: 600px;
                margin: 0 auto;
                background: #fff;
                border-radius: 10px;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                overflow: hidden;
              "
            >
              <!-- Encabezado -->
              <div
                style="
                  background: #333;
                  color: #fff;
                  padding: 20px;
                  text-align: center;
                "
              >
                <img src="https://i.imgur.com/GTIQ1BN.png" alt="Logo" style="width: 200px; height: auto; margin: auto;" />
                <h1 style="margin: 0; font-size: 24px;">Soldado Gym</h1>
              </div>
    
              <!-- Contenido principal -->
              <div style="padding: 30px; text-align: center;">
                <h2 style="color: #333; font-size: 22px; margin-bottom: 15px;">
                  Estimado/a ${name}:  
                </h2>
                <p style="color: #444; font-size: 16px; line-height: 1.8; margin-bottom: 25px;">
                  Nos dirigimos a usted para recordarle que tiene una consulta nutricional programada en nuestro gimnasio el día de mañana ${formattedDate}
                  a las ${start_hour}.
                </p>
                <p style="color: #444; font-size: 16px; line-height: 1.8; margin-bottom: 25px;">
                  Si tiene alguna pregunta o requiere asistencia adicional, no dude en contactarnos a través de nuestros 
                  canales oficiales. Estamos aquí para ayudarle en todo lo que necesite.  
                </p>
                <p style="color: #444; font-size: 16px; line-height: 1.8; margin-bottom: 25px;">
                  Agradecemos su confianza en Soldado Gym y esperamos verle mañana.  
                </p>
              </div>
    
              <!-- Pie de página -->
              <div
                style="
                  background: #333;
                  color: #fff;
                  text-align: center;
                  padding: 15px;
                  font-size: 14px;
                "
              >
                <p>
                  © 2024 Soldado Gym
                </p>
              </div>
            </div>
          </div>
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

    res.status(200).json({
      success: true,
      message: "Consultas obtenidas y recordatorios enviados.",
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
  getNextDayConsultations
};
