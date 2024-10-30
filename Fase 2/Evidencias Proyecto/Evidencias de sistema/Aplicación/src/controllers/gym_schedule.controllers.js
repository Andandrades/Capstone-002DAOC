const pool = require("../db");

const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors());

//Traer todas las horas
const getGymHours = async (req, res) => {

  try {
    const schedules = await pool.query("SELECT * FROM gym_schedule");
    res.json(schedules.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Crear Hora
const createGymHour = async (req, res) => {
  const { start_hour, end_hour, max_cap, actual_cap, admin_id, schedule_date } =
    req.body;

  try {
    const newSchedule = await pool.query(
      "INSERT INTO gym_schedule (start_hour, end_hour, max_cap, actual_cap, admin_id,schedule_date) VALUES ($1, $2, $3, $4, $5,$6) RETURNING *",
      [start_hour, end_hour, max_cap, actual_cap, admin_id, schedule_date]
    );
    res.json(newSchedule.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

//Actualizar hora
const updateGymHour = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
  res.setHeader("Access-Control-Allow-Credentials", "true");

  const { id } = req.params;
  const { start_hour, end_hour, max_cap, actual_cap, schedule_date } = req.body;
  try {
    const updatedSchedule = await pool.query(
      "UPDATE gym_schedule SET start_hour = $1, end_hour = $2, max_cap = $3, actual_cap = $4 ,schedule_date = $5  WHERE gym_schedule_id = $6  RETURNING *",
      [start_hour, end_hour, max_cap, actual_cap, schedule_date, id]
    );
    if (updatedSchedule.rows.length === 0) {
      return res.status(404).json({ error: "Horario no encontrado" });
    }
    res.json(updatedSchedule.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Error al actualizar el horario" });
  }
};

//Eliminar Hora
const deleteGymHour = async (req, res) => {
  
  const { id } = req.params;
  try {
    const deletedSchedule = await pool.query(
      "DELETE FROM gym_schedule WHERE gym_schedule_id = $1 RETURNING *",
      [id]
    );

    if (deletedSchedule.rowCount === 0) {
      return res.status(404).json({ error: "Horario no encontrado" });
    }
    return res.json({ schedule: deletedSchedule.rows[0] });

  } catch (error) {
    return res
      .status(400)
      .json({ error: "Error al intentar eliminar horario" });
  }
};

//Conseguire hora especifica
const getSingleHour = async (req, res) => {
  const { id } = req.params;

  try {
    const resultado = await pool.query(
      "SELECT * FROM gym_schedule WHERE gym_schedule_id = $1",
      [id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).jsons({ error: "Horario no encontrado" });
    }

    res.json(resultado.rows[0]);
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener horario" });
  }
};

//Traer horas de dia especifico de la semana
const getHourByDay = async (req, res) => {
  
  res.setHeader("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  const { day } = req.params;

  //Transformar valor de dia a numerico
  const getDayOfWeek = (day) => {
    switch (day.toUpperCase()) {
      case "L": 
        return 1;
      case "M": 
        return 2;
      case "X": 
        return 3;
      case "J": 
        return 4;
      case "V": 
        return 5;
      case "S": 
        return 6;
      case "D": 
        return 0;
      default:
        return null; 
    }
  };

  const dayOfTheWeek = getDayOfWeek(day);

  if (dayOfTheWeek === null) {
    return res
      .status(400)
      .json({ error: "Inicial del día de la semana no válida" });
  }

  try {
    const query = `
      SELECT * 
      FROM gym_schedule
      WHERE EXTRACT(DOW FROM schedule_date) = $1
      AND schedule_date >= DATE_TRUNC('week', CURRENT_DATE)
      AND schedule_date < DATE_TRUNC('week', CURRENT_DATE) + INTERVAL '7 days';
    `;

    const values = [dayOfTheWeek]; // Asegúrate de que esto sea un número
    const result = await pool.query(query, values);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al obtener las horas");
  }
};



//Actualizar capacidad actual
const updateActualCap = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  const { id } = req.params; // ID de la clase a actualizar
  const { actual_cap } = req.body; // Campo a actualizar

  if (actual_cap === undefined) {
    return res.status(400).json({ message: 'No se proporcionó actual_cap' });
  }

  try {
    // Ejecutar la consulta para actualizar solo el actual_cap
    await pool.query(
      'UPDATE gym_schedule SET actual_cap = $1 WHERE gym_schedule_id = $2',
      [actual_cap, id]
    );
    
    return res.status(200).json({ message: 'Capacidad actualizada exitosamente' });
  } catch (error) {
    console.error('Error actualizando gym_schedule:', error);
    return res.status(500).json({ message: 'Error al actualizar la capacidad' });
  }
};


//Copiar esquema de clases
const copyClassesToDays = async (req, res) => {
  const { originalDay, targetDays } = req.body;

  try {
    // 1. Obtener las clases del día original usando tu función existente
    const query = `
      SELECT * 
      FROM gym_schedule
      WHERE EXTRACT(DOW FROM schedule_date) = $1
      AND schedule_date >= DATE_TRUNC('week', CURRENT_DATE)
      AND schedule_date < DATE_TRUNC('week', CURRENT_DATE) + INTERVAL '7 days';
    `;

    const originalClasses = await pool.query(query, [getDayOfWeek(originalDay)]);
    
    // 2. Insertar las clases en los días seleccionados
    const insertQuery = `
      INSERT INTO gym_schedule (start_hour, end_hour, max_cap, actual_cap, admin_id, schedule_date)
      VALUES ($1, $2, $3, $4, $5, $6);
    `;

    for (const day of targetDays) {
      const newDate = getNewDateForDay(day);  // Obtener la nueva fecha para cada día

      for (const clase of originalClasses.rows) {
        await pool.query(insertQuery, [
          clase.start_hour,
          clase.end_hour,
          clase.max_cap,
          clase.actual_cap,
          clase.admin_id,
          newDate
        ]);
      }
    }

    res.status(200).send({ message: 'Clases copiadas correctamente' });
  } catch (err) {
    console.error('Error copiando clases:', err);
    res.status(500).send('Error en el servidor');
  }
};

// Función auxiliar para convertir días en números
const getDayOfWeek = (day) => {
  switch (day.toUpperCase()) {
    case "L": return 1;
    case "M": return 2;
    case "X": return 3;
    case "J": return 4;
    case "V": return 5;
    case "S": return 6;
    case "D": return 0;
    default: return null;
  }
};

// Función para obtener la nueva fecha en la semana actual según el día seleccionado
const getNewDateForDay = (day) => {
  const today = new Date();
  const currentDay = today.getDay();
  const targetDay = getDayOfWeek(day);
  
  const diff = targetDay - currentDay;
  const newDate = new Date(today);
  newDate.setDate(today.getDate() + diff);
  
  return newDate.toISOString().split('T')[0];  // Retorna la fecha en formato YYYY-MM-DD
};

module.exports = {
  getGymHours,
  createGymHour,
  updateGymHour,
  deleteGymHour,
  getSingleHour,
  getHourByDay,
  updateActualCap,
  copyClassesToDays
};
