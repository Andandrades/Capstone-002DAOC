const pool = require("../db");

//Datos de cantidad de usuarios totales,usuarios nuevos y usuarios activos el dia de hoy
const getKpis = async (req, res) => {
  try {
    const totalUsersResult = await pool.query(`SELECT COUNT(*) FROM users`);

    const totalUsers = totalUsersResult.rows[0].count;

    const newUsersResult = await pool.query(
      `SELECT COUNT(*) FROM users WHERE register_date >= NOW() - INTERVAL '7 days'`
    );

    const newUsers = newUsersResult.rows[0].count;

    const activeUsersResult = await pool.query(`
        SELECT COUNT(*) FROM users 
        WHERE last_login >= NOW() - INTERVAL '1 day'
      `);
    const activeUsers = activeUsersResult.rows[0].count;

    res.json({
      totalUsers: Number(totalUsers),
      newUsers: Number(newUsers),
      activeUsers: Number(activeUsers),
    });
  } catch (error) {
    console.error({ error: error });
  }
};

//Traer listado de usuarios
const getUserList = async (req, res) => {
  //Paginacion
  const { page = 1, pageSize = 10 } = req.query;
  const limit = parseInt(pageSize, 10);
  const offset = (parseInt(page, 10) - 1) * limit;

  try {
    const result = await pool.query(
      `SELECT 
        users.id,
        users.name,
        users.email,
        users.register_date,
        users.last_login,
        COALESCE(suscription.user_id IS NOT NULL, false) AS suscription,
        plans.name AS subscription_name
      FROM 
        users
      LEFT JOIN 
        suscription ON users.id = suscription.user_id
      LEFT JOIN 
        plans ON suscription.plan_id = plans.plan_id
      LIMIT $1 OFFSET $2;
      `,
      [limit, offset]
    );

    const totalResult = await pool.query(`SELECT COUNT(*) FROM users`);
    const totalUsers = parseInt(totalResult.rows[0].count, 10);

    return res.json({
      users: result.rows,
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: parseInt(page, 10),
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Traer Datos de transacciones
const getTransactionsData = async (req,res) => {
  try {
    //Traer ventas totales de cada producto, con su nombre
    const resultadoVentasPorProducto = await pool.query(`
      SELECT
        p.name AS plan_name,
        SUM(t.amount) AS ventas_totales_por_producto,
        COUNT(*) AS cantidad_de_ventas
      FROM transactions t
      JOIN plans p ON t.plan_id = p.plan_id
      GROUP BY p.name;
      `)

    //Traer resumen ultimos 31 dias
    const today = new Date()
    const resultadoVentas31Dias = await pool.query(
      `
        SELECT
          SUM(t.amount) as total_sales_31_days,
          COUNT(*) AS total_transactions_31_days
        FROM transactions t
        WHERE t.transaction_date >= $1;
      `
    ,[new Date(today.setDate(today.getDate() - 31)).toISOString().split('T')[0]])

    const resultadoVentasTotales  = await pool.query(
      `
        SELECT
          COUNT(*) AS total_transactions
        FROM transactions
      `
    )

    res.json({
      ventasUltimos31Dias : resultadoVentas31Dias.rows[0],
      ventasPorProducto : resultadoVentasPorProducto.rows,
      cantidadTransacciones : resultadoVentasTotales.rows,
    })

  } catch (error) {
    console.error('Error interno del servidor:', error);
    res.status(500).json({error : 'Error interno del servidor'})
    
  }
}

const getVentasPorMes = async (req, res) => {
  const { start_date, end_date } = req.query;

  try {
    const query = `
      SELECT TO_CHAR(t.transaction_date, 'YYYY-MM') AS month,
             SUM(t.amount) AS ventas_totales_por_mes,
             COUNT(*) AS total_transactions_per_month
      FROM transactions t
      WHERE t.transaction_date >= $1 AND t.transaction_date <= $2
      GROUP BY month
      ORDER BY month ASC;
    `;
    const result = await pool.query(query, [start_date, end_date]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener ventas por mes:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

//Listar transacciones
const getTransactionsList = async (req,res) => {
  try {
    // Obtener parámetros de la URL
    const page = parseInt(req.params.page) || 1;
    const limit = parseInt(req.params.limit) || 10;
    const offset = (page - 1) * limit;

    // Consulta para obtener las transacciones paginadas
    const queryTransacciones = `
      SELECT 
        t.transaction_id,
        t.amount,
        t.transaction_date,
        t.plan_id,
        p.name AS plan_name
      FROM transactions t
      JOIN plans p ON t.plan_id = p.plan_id
      ORDER BY t.transaction_date DESC
      LIMIT $1 OFFSET $2;
    `;

    // Consulta para obtener el número total de transacciones
    const queryTotalTransacciones = `
      SELECT COUNT(*) AS total_transactions
      FROM transactions;
    `;

    // Ejecutar ambas consultas en paralelo
    const [resultTransacciones, resultTotal] = await Promise.all([
      pool.query(queryTransacciones, [limit, offset]),
      pool.query(queryTotalTransacciones)
    ]);

    const transactions = resultTransacciones.rows;
    const totalTransactions = parseInt(resultTotal.rows[0].total_transactions);

    res.json({
      transactions,
      totalPages: Math.ceil(totalTransactions / limit),
      currentPage: page,
      totalTransactions,
    });
  } catch (err) {
    console.error('Error al obtener el historial de transacciones:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}


module.exports = {
  getKpis,
  getUserList,
  getTransactionsData,
  getTransactionsList,
  getVentasPorMes
};
