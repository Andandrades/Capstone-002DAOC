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
    const result = await pool.query(`
      SELECT s.class_id, s.scheduled_date, s.actual_cap, s.gym_schedule_id, u.name AS client_name
      FROM schedule_classes s
      JOIN users u ON s.client_id = u.id
      WHERE s.gym_schedule_id = $1
    `, [id]);

    res.status(200).json(result.rows); // Retorna las filas como respuesta
  } catch (error) {
    console.error("Error al obtener clases con usuario:", error.message);
    res.status(500).json({ error: "Error al obtener datos." });
  }
};

const create = async (req, res) => {
  const { scheduled_date, actual_cap, gym_schedule_id, client_id } = req.body;
  try {
    const result = await pool.query(`INSERT INTO schedule_classes
(scheduled_date, actual_cap, gym_schedule_id, client_id)
VALUES ($1, $2, $3, $4)` , [scheduled_date, actual_cap, gym_schedule_id, client_id]);
    res.status(200);
    res.json(" añadido correctamente!.");
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

  const { id } = req.params;

  try {
    const result = await pool.query(
      `DELETE FROM schedule_classes WHERE class_id = $1 RETURNING *` , [id]
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

//Al momento de escribir una funcion, se tiene que exportar en esta parte del codigo
module.exports = {
  getAll,
  getbyid,
  create,
  update,
  deletebyid,
  getHourByGymId
};
