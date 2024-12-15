const pool = require('../db'); // conexión a PostgreSQL

// Obtener los planes
const getPlans = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM plans order by plan_id ASC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener los planes:', error);
    res.status(500).json({ error: 'Error al obtener los planes' });
  }
};

// Sacar un plan por su id
const getPlanById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM Plans WHERE plan_id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Plan no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener el plan:', error);
    res.status(500).json({ error: 'Error al obtener el plan' });
  }
};

const createPlan = async (req, res) => {
  try {
    const { name, description, price, n_class, type, offer_price, color } = req.body;

    const offerPriceValue = offer_price !== undefined && offer_price !== '' ? offer_price : null;

    const result = await pool.query(
      'INSERT INTO plans (name, description, price, offer_price, n_class, type, color) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [name, description, price, offerPriceValue, n_class, type, color]
    );

    res.status(200).json(result.rows[0]);

  } catch (error) {
    console.error('Error al crear el plan:', error);
    res.status(500).json({ error: 'Error al crear el plan.' });
  }
};

// Editar el planconst 
const updatePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, n_class, type, offer_price, color } = req.body;

    const offerPriceValue = offer_price !== undefined && offer_price !== '' ? offer_price : null;

    const result = await pool.query(
      'UPDATE plans SET name = $1, description = $2, price = $3,offer_price =$4 ,n_class = $5, type = $6, color = $7 WHERE plan_id = $8 RETURNING *',

      [name, description, price,offerPriceValue, n_class, type, color, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error al actualizar el plan:', error);
    res.status(500).json({ error: 'Error al actualizar el plan. Intente nuevamente más tarde.' });
  }
};

// Eliminar el plan
const deletePlan = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM Plans WHERE plan_id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'El plan no se ha encontrado' });
    }
    res.status(200).json({ message: 'Plan eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el plan:', error);
    res.status(500).json({ error: 'Error al eliminar el plan' });
  }
};

// Exportar las funciones
module.exports = {
  getPlans,
  getPlanById,
  createPlan,
  updatePlan,
  deletePlan,
};