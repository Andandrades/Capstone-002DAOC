//Los controladores son las funciones que va a llamar express, dichas funciones se llamaran en las routes y se ejecutaran en estas
const pool = require("../db");

const sharp = require("sharp");
const axios = require("axios");

const getAll = async (req, res) => {
  try {
    const result = await pool.query("SELECT * from exercise_history");
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
      `SELECT * from exercise_history where history_id = ${id}`
    );
    res.json(result.rows);
  } catch (error) {
    console.log(error.message);
    res.status(400);
    res.json("error al consultar!.");
  }
};

const create = async (req, res) => {
  const {
    history_id,
    exercise_name,
    machine,
    weight,
    sets,
    repetitions,
    total_reps,
    notes,
    image,
    target,
    exercise_api_id,
  } = req.body;


  const exerciseApiIdToSave = exercise_api_id === "" ? null : exercise_api_id;


  try {
    let imageBuffer = null;

    // Si la imagen no es nula, descargamos y la convertimos en buffer
    if (image) {
      const response = await axios.get(image, { responseType: "arraybuffer" });
      imageBuffer = Buffer.from(response.data, "binary");
    }

    // Insertar datos en la base de datos
    await pool.query(
      `
      INSERT INTO exercises 
        (history_id, exercise_name, machine, weight, sets, repetitions, total_reps, image, target, notes, exercise_api_id)
      VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      `,
      [
        history_id,
        exercise_name,
        machine,
        weight,
        sets,
        repetitions,
        total_reps,
        imageBuffer,
        target,
        notes,
        exerciseApiIdToSave,
      ]
    );

    res.status(200).json("Ejercicio añadido correctamente.");
  } catch (error) {
    console.error("Error al guardar el ejercicio:", error.message);
    res.status(500).json({ error: "Error al guardar el ejercicio." });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { created_date, user_id, class_id, exercise_id } = req.body;
  try {
    const result =
      await pool.query(`UPDATE public.exercise_history SET created_date=${created_date}, user_id=${user_id}, class_id=${class_id}, exercise_id=${exercise_id} 
      WHERE history_id=${id};`);

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
      `DELETE FROM public.exercise_history WHERE history_id=${id};`
    );
    res.json(result.rows);
  } catch (error) {
    console.log(error.message);
    res.status(400);
    res.json("error al eliminar!.");
  }
};

const getbyClassId = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `SELECT * from exercise_history where class_id = ${id}`
    );
    res.json(result.rows);
  } catch (error) {
    console.log(error.message);
    res.status(400);
    res.json("error al consultar!.");
  }
};

const getUserHistory = async (req, res) => {
  const { id } = req.params;

  try {
    const resultado = await pool.query(
      `SELECT eh.*, 
              gs.start_hour,
              gs.schedule_date,
              COALESCE(json_agg(
                json_build_object(
                  'exercise_id', e.exercise_id,
                  'exercise_name', e.exercise_name,
                  'machine', e.machine,
                  'weight', e.weight,
                  'sets', e.sets,
                  'repetitions', e.repetitions,
                  'total_reps', e.total_reps,
                  'target', e.target,
                  'notes', e.notes
                )
              ) FILTER (WHERE e.exercise_id IS NOT NULL), '[]') AS exercises
      FROM exercise_history eh
      LEFT JOIN exercises e ON eh.history_id = e.history_id
      LEFT JOIN schedule_classes sc ON eh.class_id = sc.class_id
      LEFT JOIN gym_schedule gs ON sc.gym_schedule_id = gs.gym_schedule_id 
      WHERE eh.user_id = $1
      GROUP BY eh.history_id, gs.start_hour,gs.schedule_date
      ORDER BY eh.created_date DESC`,
      [id]
    );
    if (resultado.rowCount === 0) {
      return res.status(202).json("Este usuario no posee clases registradas");
    }

    res.status(200).json(resultado.rows);
  } catch (error) {
    res.status(400).json(error);
    console.error({ error: error });
  }
};

const updateExerciseTarget = async (req,res) =>{
  const { history_id } = req.params;
  const { target } = req.body;

  if (!target) {
    return res.status(400).json({ error: "El campo target es requerido" });
  }

  try {
    const result = await pool.query(
      "UPDATE exercise_history SET target = $1 WHERE history_id = $2 RETURNING *",
      [target, history_id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Registro no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error actualizando target en exercise_history:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
}

//Al momento de escribir una funcion, se tiene que exportar en esta parte del codigo
module.exports = {
  getAll,
  getbyid,
  create,
  update,
  deletebyid,
  getbyClassId,
  getUserHistory,
  updateExerciseTarget
};
