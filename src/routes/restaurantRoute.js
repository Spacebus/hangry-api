const express = require('express');
const router = express.Router();
const controller = require('../controllers/restaurantController')
router.get('/', controller.getAllRestaurants);
router.get('/:id', controller.getRestaurant);
router.put('/:id', controller.updateRestaurant);
router.post('/', controller.addRestaurant);
router.get('/:id/getMeals', controller.getAllMealsFromTheRestaurant);
router.get('/:id/getOrders', controller.getAllOrdersFromTheRestaurant);
module.exports = router;