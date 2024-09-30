//Los controladores son las funciones que va a llamar express, dichas funciones se llamaran en las routes y se ejecutaran en estas
const pool = require("../db");

const getAll = async (req, res) => {
  try {
    const result = await pool.query("SELECT * from schedule_classes");
    res.json(result.rows);
  } catch (error) {
    console.log(error.message)
    res.status(400);
    res.json("error al consultar!.");
  }
};

const getbyid = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(`SELECT * from schedule_classes where class_id = ${id}`);
    res.json(result.rows);
  } catch (error) {
    console.log(error.message)
    res.status(400);
    res.json("error al consultar!.");
  }
};


const create = async (req, res) => {
  const { class_id, scheduled_date, actual_cap, gym_schedule_id, client_id } = req.body;
  try {
    const result = await pool.query(`INSERT INTO public.schedule_classes
(class_id, scheduled_date, actual_cap, gym_schedule_id, client_id)
VALUES(${class_id}, ${scheduled_date}, ${actual_cap}, ${gym_schedule_id}, ${client_id});`);
    res.status(200);
    res.json(" añadido correctamente!.");

  } catch (error) {
    console.log(error.message)
    res.status(400);
    res.json("error al añadir!.");
  }
};

const update = async (req, res) => {
  const { class_id, scheduled_date, actual_cap, gym_schedule_id, client_id } = req.body;
  try {
    const result = await pool.query(`UPDATE public.schedule_classes SET scheduled_date=${scheduled_date}, actual_cap=${actual_cap}, gym_schedule_id=${gym_schedule_id}, 
      client_id=${client_id} WHERE class_id=${class_id};`);
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
    const result = await pool.query(`DELETE FROM public.schedule_classes WHERE class_id = ${id}`);
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
