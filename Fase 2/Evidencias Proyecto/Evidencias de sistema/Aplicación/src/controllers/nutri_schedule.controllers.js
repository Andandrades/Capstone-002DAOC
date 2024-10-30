const pool = require("../db");

const getAllNutriHour = async (req, res) => {
  try {
    const resultado = await pool.query("SELECT * FROM nutri_schedule");
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
    console.log("Client ID recibido:", client_id); 
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

    const { available, client_id: currentClientId } = hora.rows[0];

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

module.exports = {
  createNutriHour,
  getAllNutriHour,
  getNutriHour,
  updateNutriHour,
  deleteNutriHour,
  getHoursByDate,
  scheduleHour,
  cancelHour
};
