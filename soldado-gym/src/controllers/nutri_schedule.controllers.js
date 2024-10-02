const pool = require("../db");


const getAllNutriHour = async (req, res) => {
  try {
    const resultado = await pool.query("SELECT * FROM nutri_schedule");
    res.json(resultado.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const getNutriHour = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await pool.query(
      "SELECT * FROM nutri_schedule WHERE nutri_schedule_id=$1",
      [id]
    );

    if (resultado.rowCount === 0) {
      return res.status(400).json({ message: "Usuario no encontrado " });
    }
    return res.json(resultado.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const createNutriHour = async (req, res) => {
  const { start_hour, end_hour, available, client_id, nutri_id } = req.body;

  try {
    const resultado = await pool.query(
      "INSERT INTO nutri_schedule (start_hour, end_hour, available, client_id, nutri_id) VALUES($1,$2,$3,$4,$5) RETURNING *",
      [start_hour, end_hour, available, client_id, nutri_id]
    );
    res.json(resultado.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateNutriHour = async (req, res) => {
  const { id } = req.params;
  const { start_hour, end_hour, available, client_id, nutri_id } = req.body;

  try {
    const resultado = await pool.query(
      "UPDATE nutri_schedule SET start_hour=$1, end_hour=$2 , available=$3, client_id=$4 , nutri_id=$5 WHERE nutri_schedule_id= $6 RETURNING *",
      [start_hour, end_hour, available, client_id, nutri_id, id]
    );
    res.json(resultado.rows[0])
  } catch (error) {
    res.status(400).json({error : error.message})
  }
};

const deleteNutriHour = async (req,res) => {
    const {id} = req.params
    try {
        const resultado = await pool.query("DELETE FROM nutri_schedule WHERE nutri_schedule_id=$1 RETURNING *",[id])
        if(resultado.rowCount ===  0){
            return res.status(400).json({message : "Usuario no encontrado"})
        }
        return res.json({message : "Usuario eliminado"}).status(204)
    } catch (error) {
        return res.json({error : error.message})
    }
}

module.exports = {
  createNutriHour,
  getAllNutriHour,
  getNutriHour,
  updateNutriHour,
  deleteNutriHour
};
