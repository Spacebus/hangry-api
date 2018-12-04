const express = require('express');
const router = express.Router();
const controller = require('../controllers/mealController')
router.post('/addMeal', controller.addMeal);
router.post('/:mealId/updateMeal', controller.updateMeal);
router.post('/updateAllMeals', controller.updateAllMeals);
module.exports = router;