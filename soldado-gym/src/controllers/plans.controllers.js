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

// Crear un nuevo plan
const createPlan = async (req, res) => {
  const { name, description, price, n_class, type } = req.body;

  const missingFields = [];

  if (!name) missingFields.push('name');
  if (!description) missingFields.push('description'); 
  if (n_class === undefined) missingFields.push('n_class');
  if (!type) missingFields.push('type');

  if (missingFields.length > 0) {
    return res.status(400).json({ 
      error: 'Faltan los siguientes datos: ' + missingFields.join(', ') 
    });
  }

  if (isNaN(price) || isNaN(n_class)) {
    return res.status(400).json({ error: 'El precio y la cantidad de clases deben ser números' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO plans (name, description, price, n_class, type) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, description, price, n_class, type] 
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear el plan:', error);

    if (error.code === '23505') {
      return res.status(409).json({ error: 'Ya existe un plan con esta ID' });
    }

    res.status(500).json({ error: 'Error al crear el plan.' });
  }
};

// Editar el plan
const updatePlan = async (req, res) => {
  const { id } = req.params; 
  const { name, description, price, n_class, type } = req.body; 

  const missingFields = [];

  if (!name) missingFields.push('name');
  if (!description) missingFields.push('description'); 
  if (price === undefined) missingFields.push('price');
  if (n_class === undefined) missingFields.push('n_class');
  if (!type) missingFields.push('type');

  if (missingFields.length > 0) {
    return res.status(400).json({ 
      error: 'Faltan datos requeridos. Asegúrese de que los siguientes campos estén presentes: ' + missingFields.join(', ') 
    });
  }

  if (isNaN(price) || isNaN(n_class)) {
    return res.status(400).json({ error: 'El precio y el número de clases deben ser números.' });
  }

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
    res.status(204).json({ message: 'Plan eliminado correctamente' });
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