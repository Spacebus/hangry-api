const express = require('express');
const router = express.Router();
const controller = require('../controllers/restaurantController')
router.get('/', controller.get_all_restaurants);
router.get('/:restaurant_id/meals', controller.get_all_meals_from_a_restaurant)
module.exports = router;