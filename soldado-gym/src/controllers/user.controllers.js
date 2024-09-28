
const pool = require("../db");

const getAllUsers = async (req, res) => {
    res.send("Hola")
    //const result = await pool.query("SELECT * FROM users RETURNING *")
    //res.json(result.rows)
};

const createUser = async (req, res) => {
    
}

module.exports = {
    createUser,
    getAllUsers
}