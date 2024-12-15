//Los controladores son las funciones que va a llamar express, dichas funciones se llamaran en las routes y se ejecutaran en estas
const pool = require("../db");

const getAll = async (req, res) => {
  try {
    const result = await pool.query("SELECT * from schedule_classes");
    res.json(result.rows);
  } catch (error) {
    console.log(error.message);
    res.status(400);
    res.json("error al consultar!.");
  }
};

const getbyid = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `SELECT * from schedule_classes where class_id = ${id}`
    );
    res.json(result.rows);
  } catch (error) {
    console.log(error.message);
    res.status(400);
    res.json("error al consultar!.");
  }
};

//traer datos segun al id de la hora
const getHourByGymId = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  const { id } = req.params;

  try {
    const result = await pool.query(
      `
      SELECT s.class_id, s.scheduled_date, s.actual_cap, s.gym_schedule_id, s.client_id, u.name AS client_name
      FROM schedule_classes s
      JOIN users u ON s.client_id = u.id
      WHERE s.gym_schedule_id = $1
    `,
      [id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error al obtener clases con usuario:", error.message);
    res.status(500).json({ error: "Error al obtener datos." });
  }
};

const create = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
  res.setHeader("Access-Control-Allow-Credentials", "true");

  const { scheduled_date, actual_cap, gym_schedule_id, client_id } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO schedule_classes
(scheduled_date, actual_cap, gym_schedule_id, client_id)
VALUES ($1, $2, $3, $4) RETURNING class_id`,
      [scheduled_date, actual_cap, gym_schedule_id, client_id]
    );
    res.status(200);
    res.json(result.rows);
  } catch (error) {
    console.log(error.message);
    res.status(400);
    res.json("error al añadir!.");
  }
};

const update = async (req, res) => {
  const { class_id } = req.params;
  const { scheduled_date, actual_cap, gym_schedule_id, client_id } = req.body;
  try {
    const result =
      await pool.query(`UPDATE public.schedule_classes SET scheduled_date=${scheduled_date}, actual_cap=${actual_cap}, gym_schedule_id=${gym_schedule_id}, 
      client_id=${client_id} WHERE class_id=${class_id};`);
    res.status(200);
    res.json("Actualizado correctamente!.");
  } catch (error) {
    console.log(error.message);
    res.status(400);
    res.json("error al actualizar!.");
  }
};

const deletebyid = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  const { id } = req.params;

  try {
    const result = await pool.query(
      `DELETE FROM schedule_classes WHERE class_id = $1 RETURNING *`,
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(400).json({
        message: "Hora no encontrado",
      });
    }
    return res.sendStatus(204);
  } catch (error) {
    console.log(error.message);
    res.status(400);
    res.json("error al eliminar!.");
  }
};

//Agendar hora (Endpoint de usuarios)
const scheduleHour = async (req, res) => {
  const { gym_schedule_id, client_id, suscription_id } = req.body;

  if (suscription_id === null) {
    return res.status(400).json({ error: "No cuentas con un plan activo" });
  }

  try {
    const remainingClasesResult = await pool.query(
      "SELECT remaining_classes FROM public.suscription WHERE suscription_id = $1",
      [suscription_id]
    );

    const remainingClases = remainingClasesResult.rows[0].remaining_classes;

    if (remainingClases < 1) {
      return res
        .status(400)
        .json({ error: "No hay clases restantes para tomar." });
    }

    const existingRegistration = await pool.query(
      "SELECT * FROM schedule_classes WHERE gym_schedule_id = $1 AND client_id = $2",
      [gym_schedule_id, client_id]
    );
    if (existingRegistration.rows.length > 0) {
      return res
        .status(400)
        .json({ error: "Ya tienes un registro para esta hora." });
    }

    const gymCap = await pool.query(
      "SELECT max_cap, actual_cap FROM gym_schedule WHERE gym_schedule_id = $1",
      [gym_schedule_id]
    );

    if (gymCap.rows.length === 0) {
      return res.status(400).json({ error: "Clase no encontrada" });
    }

    const { max_cap, actual_cap } = gymCap.rows[0];

    if (actual_cap >= max_cap) {
      return res.status(400).json({ error: "Cupos no disponibles" });
    }

    const currentDate = new Date().toISOString();

    const resultado = await pool.query(
      "INSERT INTO schedule_classes (gym_schedule_id, client_id, scheduled_date, actual_cap) VALUES ($1, $2, $3, $4) RETURNING class_id",
      [gym_schedule_id, client_id, currentDate, actual_cap + 1]
    );

    await pool.query(
      "UPDATE gym_schedule SET actual_cap = actual_cap + 1 WHERE gym_schedule_id = $1",
      [gym_schedule_id]
    );

    await pool.query(
      "UPDATE suscription SET remaining_classes = remaining_classes - 1 WHERE suscription_id = $1",
      [suscription_id]
    );

    await pool.query(
      "INSERT INTO exercise_history (created_date, user_id, class_id) VALUES ($1, $2, $3)",
      [currentDate, client_id, resultado.rows[0].class_id]
    );

    res.status(201).json({ class_id: resultado.rows[0].class_id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Eliminar hora (Endpoint de usuario)
const deleteHour = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
  res.setHeader("Access-Control-Allow-Credentials", "true");

  const { class_id } = req.params;
  const { suscription_id } = req.body;

  try {
    const scheduledClass = await pool.query(
      "SELECT gym_schedule_id , actual_cap FROM schedule_classes WHERE class_id = $1",
      [class_id]
    );

    if (scheduledClass.rows.length === 0) {
      return res.status(404).json({ error: "Asistencia no encontrada" });
    }

    const { gym_schedule_id, actual_cap } = scheduledClass.rows[0];

    if (actual_cap <= 0) {
      return res
        .status(400)
        .json({ error: "Error: No se puede restar más cupos" });
    }


    await pool.query(
      "DELETE FROM exercises WHERE history_id IN (SELECT history_id FROM exercise_history WHERE class_id = $1)",
      [class_id]
    );

    await pool.query("DELETE FROM exercise_history WHERE class_id = $1", [
      class_id,
    ]);


    await pool.query("DELETE FROM schedule_classes WHERE class_id = $1", [
      class_id,
    ]);

    await pool.query(
      "UPDATE gym_schedule SET actual_cap = actual_cap - 1 WHERE gym_schedule_id = $1",
      [gym_schedule_id]
    );

    await pool.query(
      "UPDATE suscription SET remaining_classes = remaining_classes + 1 WHERE suscription_id = $1",
      [suscription_id]
    );




    res.status(200).json({ message: "Hora eliminada exitosamente" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Error al eliminar asistencia" });
  }
};

const getUserClasses = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  const { id, class_id } = req.params;

  try {
    const resultado = await pool.query(
      "SELECT class_id FROM schedule_classes WHERE client_id = $1 AND gym_schedule_id = $2",
      [id, class_id]
    );

    if (resultado.rows.length === 0) {
      return;
    }

    res.json(resultado.rows);
  } catch (error) {
    return res.json({ error: error.message });
  }
};


const getNextClass = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  const { id } = req.params;

  try {
    const resultado = await pool.query(
      `SELECT * FROM gym_schedule gs LEFT JOIN schedule_classes sc ON gs.gym_schedule_id = sc.gym_schedule_id WHERE sc.client_id = $1   AND gs.schedule_date > CURRENT_TIMESTAMP
 ORDER BY sc.scheduled_date DESC, gs.start_hour DESC LIMIT 1`,
      [id]);

    if (resultado.rows.length === 0) {
      return res.json({ message: "No classes found for the given client" });
    }

    res.json(resultado.rows[0]);
  } catch (error) {
    return res.json({ error: error.message });
  }
};

const getNextConsultation = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  const { id } = req.params;

  try {
    const resultado = await pool.query(
      `SELECT * FROM gym_schedule gs LEFT JOIN schedule_classes sc ON gs.gym_schedule_id = sc.gym_schedule_id WHERE sc.client_id = $1   AND gs.schedule_date > CURRENT_TIMESTAMP
 ORDER BY sc.scheduled_date DESC, gs.start_hour DESC LIMIT 1`,
      [id]);

    if (resultado.rows.length === 0) {
      return res.json({ message: "No classes found for the given client" });
    }

    res.json(resultado.rows[0]);
  } catch (error) {
    return res.json({ error: error.message });
  }
};

module.exports = {
  getAll,
  getbyid,
  create,
  update,
  deletebyid,
  getHourByGymId,
  scheduleHour,
  deleteHour,
  getUserClasses,
  getNextClass,
  getNextConsultation
};
