//Los controladores son las funciones que va a llamar express, dichas funciones se llamaran en las routes y se ejecutaran en estas
const pool = require("../db");

const getAll = async (req, res) => {
  try {
    const result = await pool.query("SELECT * from nutritional_consultation");
    res.json(result.rows);
  } catch (error) {
    console.log(error.message)
    res.status(400);
    res.json("error al consultar!.");  }
};

const getbyid = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(`SELECT * from exercise_history where history_id = ${id}`);
    res.json(result.rows);
  } catch (error) {
    console.log(error.message)
    res.status(400);
    res.json("error al consultar!.");  }
};


const create = async (req, res) => {
  const { history_id, created_date, user_id, class_id, exercise_id } = req.body;
  try {
    const result = await pool.query(`INSERT INTO public.exercise_history (history_id, created_date, user_id, class_id, exercise_id) 
      VALUES(${history_id}, ${created_date}, ${user_id}, ${class_id}, ${exercise_id});`);
    res.status(200);
    res.json(" añadido correctamente!.");

  } catch (error) {
    console.log(error.message)
    res.status(400);
    res.json("error al añadir!.");
  }
};

const update = async (req, res) => {
  const { id} =  req.params;
  const {created_date, user_id, class_id, exercise_id } = req.body;
  try {
    const result = await pool.query(`UPDATE public.exercise_history SET created_date=${created_date}, user_id=${user_id}, class_id=${class_id}, exercise_id=${exercise_id} 
      WHERE history_id=${id};`);

    res.status(200);
    res.json("Actualizado correctamente!.");

  } catch (error) {
    console.log(error.message)
    res.status(400);
    res.json("error al actualizar!.");
  }

   
};


const deletebyid = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(`DELETE FROM public.exercise_history WHERE history_id=${id};`);
    res.json(result.rows);
  } catch (error) {
    console.log(error.message)
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
};
