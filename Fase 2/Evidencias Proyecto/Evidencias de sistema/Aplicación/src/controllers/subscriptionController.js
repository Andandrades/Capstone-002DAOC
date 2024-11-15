// subscriptionController.js
const pool = require('../db'); // Importa la conexión a la base de datos

// Obtener las suscripciones de un usuario por user_id
const getSubscriptionsByUserId = async (req, res) => {
    try {
        const { userId } = req.body;
        const query = ` SELECT s.*, p."name", p.n_class FROM public.suscription s join "plans" p on s.plan_id = p.plan_id  where user_id = $1 ORDER BY s.start_date DESC`;

        const { rows } = await pool.query(query, [userId]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'No subscriptions found for this user.' });
        }

        res.json(rows);
    } catch (error) {
        console.error('Error fetching subscriptions:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getSubscriptionsByUserId,
};
