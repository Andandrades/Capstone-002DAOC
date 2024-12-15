const { Router } = require('express');
const authenticateToken = require('../middlewares/authenticateToken')
const autorizeRole = require('../middlewares/authorizeRole')
const { getPlans, getPlanById, createPlan, updatePlan, deletePlan } = require('../controllers/plans.controllers');

const router = Router();


router.get('/plans',authenticateToken, autorizeRole([1,2,3,4]), getPlans); 
router.get('/plans/:id',authenticateToken, autorizeRole([1,2,3,4]), getPlanById); 
router.post('/plans',authenticateToken, autorizeRole([4]), createPlan); 
router.put('/plans/:id',authenticateToken, autorizeRole([4]), updatePlan); 
router.delete('/plans/:id',authenticateToken, autorizeRole([4]), deletePlan); 

module.exports = router;

