//Los controladores son las funciones que va a llamar express, dichas funciones se llamaran en las routes y se ejecutaran en estas
const pool = require("../db");

const sharp = require('sharp');


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
  const { history_id, exercise_name, machine, weight, sets, repetitions, total_reps, notes, target, exercise_api_id } = req.body;

  // Procesar la imagen desde el archivo cargado (req.file) si usas multer
  const imageBuffer = req.file?.buffer;

  try {
    let optimizedImage;

    if (imageBuffer) {
      const metadata = await sharp(imageBuffer).metadata();

      if (metadata.format === 'gif') {
        // Para GIF, no se recomprime, solo se asegura que esté optimizado
        optimizedImage = await sharp(imageBuffer).toBuffer();
      } else {
        // Para otros formatos, optimiza la imagen y la convierte a un formato común (opcional)
        optimizedImage = await sharp(imageBuffer)
          .resize({ width: 800 }) // Ajusta el tamaño máximo si es necesario
          .jpeg({ quality: 80 }) // Convierte a JPEG con calidad reducida
          .toBuffer();
      }
    }

    const result = await pool.query(
      `INSERT INTO exercises (history_id, exercise_name, machine, weight, sets, repetitions, total_reps, image, target, notes, exercise_api_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [
        history_id,
        exercise_name,
        machine,
        weight,
        sets,
        repetitions,
        total_reps,
        optimizedImage || null, // Guarda la imagen optimizada o NULL si no se proporcionó
        target,
        notes,
        exercise_api_id,
      ]
    );

    res.status(200).json("¡Añadido correctamente!");
  } catch (error) {
    console.error("Error al añadir el ejercicio:", error.message);
    res.status(400).json("¡Error al añadir!");
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

//Al momento de escribir una funcion, se tiene que exportar en esta parte del codigo
module.exports = {
  getAll,
  getbyid,
  create,
  update,
  deletebyid,
  getbyClassId,
};
