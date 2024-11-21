//Los controladores son las funciones que va a llamar express, dichas funciones se llamaran en las routes y se ejecutaran en estas
const pool = require("../db");

const getAllExercise = async (req, res) => {
  try {
    const result = await pool.query("SELECT * from exercises");
    res.json(result.rows);
  } catch (error) {
    console.log(error.message);
  }
};

const getExercise = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `SELECT * FROM exercises WHERE exercise_id = ${id}`
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getExerciseFromHistory = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `
      SELECT * 
      FROM exercises
      WHERE history_id = $1
    `,
      [id]
    );

    if (result.rows.length === 0) {
      return res
        .status(202)
        .json({ error: "No se encontraron ejercicios en esta rutina" });
    }

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error al obtener los ejercicios:", error);
    res.status(500).json({ error: "Error al obtener los ejercicios" });
  }
};

const createExercise = async (req, res) => {
  const {
    history_id,
    exercise_name,
    machine,
    weight,
    sets,
    repetitions,
    total_reps,
    notes,
  } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO public.exercises  
                                        VALUES( $1, $2, $3, $4, $5, $5, $6, $7,$8)`,
      [
        history_id,
        exercise_name,
        machine,
        weight,
        sets,
        repetitions,
        total_reps,
        notes,
      ]
    );
    res.status(200);
    res.json("Ejercicio añadido correctamente!.");
  } catch (error) {
    console.log({ error: error.detail });
    res.status(400);
    res.json("error al añadir ejercicio");
  }
};

const updateExercise = async (req, res) => {
  const { id } = req.params;
  const {
    history_id,
    exercise_name,
    machine,
    weight,
    sets,
    repetitions,
    total_reps,
    notes,
  } = req.body;
  try {
    const result =
      await pool.query(`UPDATE public.exercises SET history_id=${history_id}, exercise_name=${exercise_name}, machine=${machine}, weight=${weight}, "sets"=${sets}, 
      repetitions=${repetitions}, total_reps=${total_reps}, notes=${notes} WHERE exercise_id=${id};`);
    res.status(200);
    res.json("Ejercicio actualizado correctamente!.");
  } catch (error) {
    console.log({ error: error.detail });
    res.status(400);
    res.json("error al añadir ejercicio");
  }
};

const deleteExercise = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      ` DELETE FROM public.exercises WHERE exercise_id= ${id}`
    );
    res.json(result.rows);
  } catch (error) {
    console.log(error.message);
  }
};

const getTop = async (req, res) => {
  const { top } = req.query;

  if (!top || isNaN(top) || top <= 0) {
    return res
      .status(400)
      .json({ error: "El parámetro 'top' debe ser un número mayor a 0." });
  }

  try {
    //Consulta para agrupar cuantas veces se repite el id de un ejercicio, esta cantidad se almacena en usage_count
    const result = await pool.query(
      `
       SELECT exercise_api_id, 
              exercise_name, 
              target, 
              popularity, 
              ENCODE(image, 'base64') AS image_base64
      FROM (
        SELECT DISTINCT ON (exercise_api_id)
                exercise_api_id,
                exercise_name,
                target,
                COUNT(*) OVER (PARTITION BY exercise_api_id) AS popularity,
                image
          FROM exercises
          ORDER BY exercise_api_id, exercise_name ASC
        ) subquery
        ORDER BY popularity DESC
        LIMIT $1;
      `,
      [parseInt(top)]
    );

    const exercises = result.rows.map((row) => ({
      exercise_name: row.exercise_name,
      target: row.target,
      popularity: row.popularity,
      image: `data:image/gif;base64,${row.image_base64}`, // Asegurar que se use el formato GIF
    }));

    res.status(200).json(exercises);
  } catch (error) {
    console.error("Error al obtener ejercicios populares:", error.message);
    res.status(500).json({ error: "Error al obtener ejercicios populares." });
  }
};

//Al momento de escribir una funcion, se tiene que exportar en esta parte del codigo
module.exports = {
  getAllExercise,
  getExercise,
  createExercise,
  updateExercise,
  deleteExercise,
  getExerciseFromHistory,
  getTop,
};
