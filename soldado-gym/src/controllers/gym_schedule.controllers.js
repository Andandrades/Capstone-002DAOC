const pool = require("../db");


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

  const { id } = req.params;
  const { start_hour, end_hour, max_cap, actual_cap, schedule_date } = req.body;
  try {
    const updatedSchedule = await pool.query(
      "UPDATE gym_schedule SET start_hour = $1, end_hour = $2, max_cap = $3, actual_cap = $4 ,schedule_date = $5  WHERE gym_schedule_id = $6  RETURNING *",
      [start_hour, end_hour, max_cap, actual_cap,schedule_date,id]
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

    const {id} = req.params;
    try {
        const deletedSchedule = await pool.query("DELETE FROM gym_schedule WHERE gym_schedule_id = $1 RETURNING *",[id])

        if(deletedSchedule.rows.length === 0){
            return res.status(404).json({error : 'Horario no encontrado'})
        }
        return res.json({schedule: deletedSchedule.rows[0]} )
    } catch (error) {
        return res.status(400).json({error : 'Error al intentar eliminar horario'})
    }
}

//Conseguire hora especifica
const getSingleHour = async (req,res ) => {
    const {id} = req.params;

    try {
        const resultado = await pool.query("SELECT * FROM gym_schedule WHERE gym_schedule_id = $1",[id])

        if(resultado.rows.length === 0){
            return res.status(404).jsons({error : "Horario no encontrado"})
        }

        res.json(resultado.rows[0])
    } catch (error) {
        return res.status(500).json({error : "Error al obtener horario"})
    }
}



module.exports = {
  getGymHours,
  createGymHour,
  updateGymHour,
  deleteGymHour,
  getSingleHour
};
