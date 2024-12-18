//Los controladores son las funciones que va a llamar express, dichas funciones se llamaran en las routes y se ejecutaran en estas
const pool = require("../db");

const getAll = async (req, res) => {
  try {
    const result = await pool.query("SELECT * from nutrition order by id asc");
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
    const query = `INSERT INTO public.nutrition (name, description, price) VALUES ($1, $2, $3)`;
    const values = [name, description, price];
    await pool.query(query, values);
    res.status(200).json("¡Añadido correctamente!");
  } catch (error) {
    console.error(error.message);
    res.status(400).json("¡Error al añadir!");
  }
};


const update = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, offer_price } = req.body;

  const offerPriceValue = offer_price !== undefined && offer_price !== '' ? offer_price : null;

  try {
    const response = await pool.query(
      `UPDATE public.nutrition
       SET "name"=$1, description=$2, price=$3, offer_price=$4
       WHERE id=$5;`,
      [name, description, price,offerPriceValue, id]
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
