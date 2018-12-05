const express = require('express');
const router = express.Router();
const controller = require('../controllers/mealController')
router.get('/', controller.getAllMeals);
router.post('/', controller.addMeal);
router.put('/:id', controller.updateMeal);
module.exports = router;