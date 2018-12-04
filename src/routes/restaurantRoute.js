const express = require('express');
const router = express.Router();
const controller = require('../controllers/restaurantController')
router.get('/', controller.getAllRestaurants);
router.get('/:restaurantId/getMeals', controller.getAllMealsFromTheRestaurant);
router.post('/addRestaurant', controller.addRestaurant);
router.put('/:restaurantId/updateRestaurant', controller.updateRestaurant);
module.exports = router;