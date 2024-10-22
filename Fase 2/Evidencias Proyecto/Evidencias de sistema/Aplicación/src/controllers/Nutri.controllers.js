//Los controladores son las funciones que va a llamar express, dichas funciones se llamaran en las routes y se ejecutaran en estas
const pool = require("../db");

const getAll = async (req, res) => {
  try {
    const result = await pool.query("SELECT * from nutrition");
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
    const result = await pool.query(`SELECT * from exercise_history where history_id = ${id}`);
    res.json(result.rows);
  } catch (error) {
    console.log(error.message)
    res.status(400);
    res.json("error al consultar!.");
  }
};


const create = async (req, res) => {
  const { name, description, price } = req.body;
  try {
    const result = await pool.query(`INSERT INTO public.nutrition (name, description, price) 
      VALUES(${name}, ${description}, ${price});`);
    res.status(200);
    res.json(" añadido correctamente!.");

  } catch (error) {
    console.log(error.message)
    res.status(400);
    res.json("error al añadir!.");
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;

  if (!name || !description || price === undefined) {
    return res.status(400).json({ error: "Los campos name, description y price son obligatorios." });
  }
  try {
    const response = await pool.query(
      `UPDATE public.nutrition
       SET "name"=$1, description=$2, price=$3
       WHERE id=$4;`,
      [name, description, price, id]
    );
    if (response.rowCount === 0) {
      return res.status(404).json({ error: "No se encontró el registro con el ID proporcionado." }); }
    res.status(200).json("Actualizado correctamente!");
  } catch (error) {
    console.error("Error al actualizar:", error.message);
    return res.status(400).json({ error: "Error al actualizar: " + error.message });
  }
};


const deletebyid = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(`DELETE FROM public.nutrition WHERE id=${id};`);
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
