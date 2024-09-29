//Los controladores son las funciones que va a llamar express, dichas funciones se llamaran en las routes y se ejecutaran en estas
const pool = require("../db");

const getAllExercise = async (req, res) => {
  try {
    const result = await pool.query("SELECT * from exercises");
    res.json(result.rows);
  } catch (error) {
    console.log(error.message)
  }
};

const getExercise = async (req, res) => {
  const { id } = req.body;

  try {
    const result = await pool.query('SELECT * FROM exercises WHERE exercise_id = $1', [id]);
    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};



const createExercise = async (req, res) => {
  const { history_id, exercise_name, machine, weight, sets, repetitions, total_reps, notes } = req.body;
  try {
    const result = await pool.query(`INSERT INTO public.exercises  
                                        VALUES( $1, $2, $3, $4, $5, $5, $6, $7,$8)`,[history_id, exercise_name, machine, weight, sets, repetitions, total_reps, notes]);
    res.status(200);
    res.json("Ejercicio añadido correctamente!.");

  } catch (error) {
    console.log({ error: error.detail });
    res.status(400);
    res.json("error al añadir ejercicio");
  }
};

const updateExercise = async (req, res) => {
  const { id,history_id, exercise_name, machine, weight, sets, repetitions, total_reps, notes } = req.body;
  try {
    const result = await pool.query(`UPDATE public.exercises SET history_id=${history_id}, exercise_name=${exercise_name}, machine=${machine}, weight=${weight}, "sets"=${sets}, 
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
  const { id } = req.body;

  try {
    const result = await pool.query(` DELETE FROM public.exercises WHERE exercise_id= ${id}`);
    res.json(result.rows);
  } catch (error) {
    console.log(error.message)
  }
};



//Al momento de escribir una funcion, se tiene que exportar en esta parte del codigo
module.exports = {
  getAllExercise,
  getExercise,
  createExercise,
  updateExercise,
  deleteExercise,
};
