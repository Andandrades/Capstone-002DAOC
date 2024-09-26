const {Router} = require('express')
const pool = require('../db')

const router = Router();

router.get('/roles' , async (req,res) => {
    const result = await pool.query('SELECT NOW ()')
    console.log(result)
    res.json('executed')
} )
router.get('/roles/10' , (req,res) => {
    res.send('Retornando rol en especifico');
} )

router.post('/roles' , (req,res) => {
    res.send('Creando un rol nuevo');
} )

router.put('/roles' , (req,res) => {
    res.send('Actualizando un rol');
} )

router.delete('/roles' , (req,res) => {
    res.send('Eliminando rol');
} )

module.exports = router;