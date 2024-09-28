const pool = require('../db'); // conexión a PostgreSQL

// Obtener los planes
const getPlans = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Plans');
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

  // Nuevo plan
  const createPlan = async (req, res) => {
    const { name, description, price, n_class, type } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO Plans (name, description, price, n_class, type) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [name, description, price, n_class, type]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error al crear el plan:', error);
      res.status(500).json({ error: 'Error al crear el plan' });
    }
  };

  // editar el plan
const updatePlan = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, n_class, type } = req.body;
    try {
      const result = await pool.query(
        'UPDATE Plans SET name = $1, description = $2, price = $3, n_class = $4, type = $5 WHERE plan_id = $6 RETURNING *',
        [name, description, price, n_class, type, id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Plan no encontrado' });
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error al actualizar el plan:', error);
      res.status(500).json({ error: 'Error al actualizar el plan' });
    }
  };

// Eliminar el plan
const deletePlan = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query('DELETE FROM Plans WHERE plan_id = $1 RETURNING *', [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'El plan nose a encontrado' });
      }
      res.status(204).json({ message: 'Plan eliminado Correctamente' });
    } catch (error) {
      console.error('Error al eliminar el plan:', error);
      res.status(500).json({ error: 'Error al eliminar el plan' });
    }
  };
  
  module.exports = {
    getPlans,
    getPlanById,
    createPlan,
    updatePlan,
    deletePlan,
  };
