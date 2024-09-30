//Los controladores son las funciones que va a llamar express, dichas funciones se llamaran en las routes y se ejecutaran en estas
const pool = require("../db");

const getAll = async (req, res) => {
  try {
    const result = await pool.query("SELECT * from schedule_classes");
    res.json(result.rows);
  } catch (error) {
    console.log(error.message)
  }
};

const getbyid = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(`SELECT * from schedule_classes where class_id = ${id}`);
    res.json(result.rows);
  } catch (error) {
    console.log(error.message)
  }
};


const create = async (req, res) => {
  const { history_id, created_date, user_id, class_id, exercise_id } = req.body;
  try {
    const result = await pool.query(`INSERT INTO public.exercise_history (history_id, created_date, user_id, class_id, exercise_id) VALUES(0, '29-09-2024', 0, 0, 0);`);
    res.status(200);
    res.json(" añadido correctamente!.");

  } catch (error) {
    console.log({ error: error.detail });
    res.status(400);
    res.json("error al añadir!.");
  }
};

const update = async (req, res) => {
  const { id,created_date, user_id, class_id, exercise_id } = req.body;
  try {
    const result = await pool.query(`UPDATE public.exercise_history SET created_date='', user_id=0, class_id=0, exercise_id=0 WHERE history_id=0;`);

    res.status(200);
    res.json("Ejercicio actualizado correctamente!.");

  } catch (error) {
    console.log({ error: error.detail });
    res.status(400);
    res.json("error al añadir ejercicio");
  }

   
};


const deletebyid = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(`DELETE FROM public.schedule_classes WHERE class_id = ${id}`);
    res.json(result.rows);
  } catch (error) {
    console.log(error.message)
  }
};



//Al momento de escribir una funcion, se tiene que exportar en esta parte del codigo
module.exports = {
  getAll,
  getbyid,
  create,
  update,
  deletebyid,
};
