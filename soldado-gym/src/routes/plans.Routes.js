const { Router } = require('express');
const { getPlans, getPlanById, createPlan, updatePlan, deletePlan } = require('../controllers/plans.controllers');

const router = Router();


router.get('/plans', getPlans); 
router.get('/plans/:id', getPlanById); 
router.post('/plans', createPlan); 
router.put('/plans/:id', updatePlan); 
router.delete('/plans/:id', deletePlan); 

module.exports = router;

