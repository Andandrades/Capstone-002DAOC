const pool = require("../db");

const cors = require("cors");
const express = require("express");
const app = express();

//Traer todas las horas
const getGymHours = async (req, res) => {
  try {
    const schedules = await pool.query("SELECT * FROM gym_schedule");
    res.json(schedules.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Traer horas por fecha
const getHoursByDate = async (req, res) => {
  const { date } = req.params;

  try {
    const resultado = await pool.query(
      "SELECT * FROM gym_schedule WHERE schedule_date = $1",
      [date]
    );

    if (resultado.rows.length === 0) {
      return res
        .status(202)
        .json({ message: "No se encuentran clases para esta fecha" });
    }

    res.json(resultado.rows);
  } catch (error) {
    console.error("Error:" , error);
    res.status(500).json({message : "Error al intentar obtener horas"})
    
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
      AND schedule_date::time > CURRENT_TIME;
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
    return res.status(400).json({ message: "No se proporcionó actual_cap" });
  }

  try {
    // Ejecutar la consulta para actualizar solo el actual_cap
    await pool.query(
      "UPDATE gym_schedule SET actual_cap = $1 WHERE gym_schedule_id = $2",
      [actual_cap, id]
    );

    return res
      .status(200)
      .json({ message: "Capacidad actualizada exitosamente" });
  } catch (error) {
    console.error("Error actualizando gym_schedule:", error);
    return res
      .status(500)
      .json({ message: "Error al actualizar la capacidad" });
  }
};


module.exports = {
  getGymHours,
  getHoursByDate,
  createGymHour,
  updateGymHour,
  deleteGymHour,
  getSingleHour,
  getHourByDay,
  updateActualCap,
};
