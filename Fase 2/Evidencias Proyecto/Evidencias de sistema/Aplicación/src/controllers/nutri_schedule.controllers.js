const pool = require("../db");

const getAllNutriHour = async (req, res) => {
  try {
    const resultado = await pool.query(`
      SELECT ns.*, 
            u.name, 
            u.email, 
            u.weight, 
            u.height
      FROM nutri_schedule ns
      LEFT JOIN users u ON ns.client_id = u.id
      ORDER BY ns.date ASC
`);
    res.json(resultado.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAvalibleSchedule = async (req, res) => {
  try {
    const resultado = await pool.query(
      "SELECT * FROM nutri_schedule WHERE available = true AND ( date + start_hour ) > NOW();"
    );
    res.json(resultado.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getNutriHour = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await pool.query(
      "SELECT * FROM nutri_schedule WHERE nutri_schedule_id=$1",
      [id]
    );

    if (resultado.rowCount === 0) {
      return res.status(400).json({ message: "Usuario no encontrado " });
    }
    return res.json(resultado.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createNutriHour = async (req, res) => {
  const { start_hour, available, client_id, nutri_id, date } = req.body;

  try {
    const resultado = await pool.query(
      "INSERT INTO nutri_schedule (start_hour, available, client_id, nutri_id,date) VALUES($1,$2,$3,$4,$5) RETURNING *",
      [start_hour, available, client_id, nutri_id, date]
    );
    res.json(resultado.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateNutriHour = async (req, res) => {
  const { id } = req.params;
  const { start_hour, end_hour, available, client_id, nutri_id } = req.body;

  try {
    const resultado = await pool.query(
      "UPDATE nutri_schedule SET start_hour=$1, end_hour=$2 , available=$3, client_id=$4 , nutri_id=$5 WHERE nutri_schedule_id= $6 RETURNING *",
      [start_hour, end_hour, available, client_id, nutri_id, id]
    );
    res.json(resultado.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteNutriHour = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await pool.query(
      "DELETE FROM nutri_schedule WHERE nutri_schedule_id=$1 RETURNING *",
      [id]
    );
    if (resultado.rowCount === 0) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }
    return res.json({ message: "Usuario eliminado" }).status(204);
  } catch (error) {
    return res.json({ error: error.message });
  }
};

const getHoursByDate = async (req, res) => {
  const { date } = req.params;

  try {
    const resultado = await pool.query(
      "SELECT * FROM nutri_schedule WHERE date = $1",
      [date]
    );
    res.json(resultado.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Endpoint para que los usuarios agenden hora
const scheduleHour = async (req, res) => {
  const { id } = req.params;
  const { client_id } = req.body;

  try {
    const hourInfo = await pool.query(
      "SELECT available,client_id FROM nutri_schedule WHERE nutri_schedule_id = $1",
      [id]
    );
    if (hourInfo.rows.length === 0) {
      return res.status(404).json({ error: "Hora no encontrada" });
    }
    const { available, client_id: currentClientId } = hourInfo.rows[0];
    if (!available || currentClientId != null) {
      return res.status(400).json({ error: "Hora ya ocupada" });
    }
    const resultado = await pool.query(
      "UPDATE nutri_schedule SET available = false , client_id = $1 WHERE nutri_schedule_id = $2 RETURNING *",
      [client_id, id]
    );

    res.json(resultado.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const cancelHour = async (req, res) => {
  const { id } = req.params;
  const { client_id } = req.body;

  try {
    const hora = await pool.query(
      "SELECT available, client_id FROM nutri_schedule WHERE nutri_schedule_id = $1",
      [id]
    );

    if (hora.rows.length === 0) {
      return res.status(404).json({ error: "La hora no existe." });
    }

    const { client_id: currentClientId } = hora.rows[0];

    // Verificar que el cliente que cancela es el mismo que reservó la hora
    if (currentClientId !== client_id) {
      return res
        .status(403)
        .json({ error: "No tienes permiso para cancelar esta hora." });
    }

    // Cancelar la hora
    const resultado = await pool.query(
      "UPDATE nutri_schedule SET available = true, client_id = null WHERE nutri_schedule_id = $1 RETURNING *",
      [id]
    );

    res.json(resultado.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createMultiHour = async (req, res) => {
  const schedules = req.body;

  if (!Array.isArray(schedules) || schedules.length === 0) {
    return res.status(400).send({ error: "Solicitud no es un Array" });
  }

  try {
    await pool.query("BEGIN");

    for (const schedule of schedules) {
      const query = `
        INSERT INTO nutri_schedule (start_hour, available, client_id, nutri_id, date)
        VALUES ($1, $2, $3, $4, $5)
      `;
      const values = [
        schedule.start_hour,
        schedule.available,
        schedule.client_id || null,
        schedule.nutri_id,
        schedule.date,
      ];

      await pool.query(query, values);
    }

    await pool.query("COMMIT");
    res.status(200).json({ message: "Horas creadas exitosamente!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al crear las horas" });
  }
};

const dragUpdate = async (req, res) => {
  const { nutri_schedule_id, date, start_hour } = req.body;

  try {
    await pool.query(
      "UPDATE nutri_schedule SET date=$1 , start_hour = $2 WHERE nutri_schedule_id = $3",
      [date, start_hour, nutri_schedule_id]
    );

    res.status(200).json({ message: "Hora actualizada existosamente" });
  } catch (error) {
    console.error("Error al actualizar hora:", error);
    res.status(500).json({ message: "Error al actualizar hora" });
  }
};

//Traer siguiente consulta nutricional
const getNextHour = async (req, res) => {
  try {
    const resultado = await pool.query(
      `
        SELECT ns.*, 
          u.name, 
          u.email, 
          u.weight, 
          u.height
        FROM nutri_schedule ns
        JOIN users u ON ns.client_id = u.id
        WHERE make_timestamp(
                  CAST(EXTRACT(YEAR FROM ns.date) AS INTEGER), 
                  CAST(EXTRACT(MONTH FROM ns.date) AS INTEGER), 
                  CAST(EXTRACT(DAY FROM ns.date) AS INTEGER),
                  CAST(EXTRACT(HOUR FROM ns.start_hour) AS INTEGER), 
                  CAST(EXTRACT(MINUTE FROM ns.start_hour) AS INTEGER), 
                  0
              ) > NOW()
        ORDER BY ns.date ASC, ns.start_hour ASC
        LIMIT 1;
      `
    );
    if (resultado === 0) {
      return res
        .status(404)
        .json({ message: "No se encuentran consultas pendientes" });
    }

    res.status(200).json(resultado.rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error de servidor" });
  }
};

module.exports = {
  createNutriHour,
  getAllNutriHour,
  getNutriHour,
  updateNutriHour,
  deleteNutriHour,
  getHoursByDate,
  scheduleHour,
  cancelHour,
  createMultiHour,
  dragUpdate,
  getAvalibleSchedule,
  getNextHour,
};
