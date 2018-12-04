const express = require('express');
const router = express.Router();
const controller = require('../controllers/restaurantController')
router.get('/', controller.getAllRestaurants);
router.get('/:restaurantId/getMeals', controller.getALlMealsFromTheRestaurant);
router.post('/addRestaurant', controller.addRestaurant);
module.exports = router;