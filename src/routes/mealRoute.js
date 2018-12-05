const express = require('express');
const router = express.Router();
const controller = require('../controllers/mealController')
router.get('/', controller.getAllMeals);
router.post('/addMeal', controller.addMeal);
router.put('/:mealId/updateMeal', controller.updateMeal);
router.put('/updateAllMeals', controller.updateAllMeals);
module.exports = router;