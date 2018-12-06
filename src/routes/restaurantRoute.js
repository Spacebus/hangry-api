const express = require('express');
const router = express.Router();
const controller = require('../controllers/restaurantController')
router.get('/', controller.getAllRestaurants);
router.get('/:id', controller.getRestaurant);
router.put('/:id', controller.updateRestaurant);
router.post('/', controller.addRestaurant);
router.post('/zaga', controller.addRestaurants);
router.get('/:id/getMeals', controller.getAllMealsFromRestaurant);
router.get('/:id/getOrders', controller.getAllOrdersFromRestaurant);
router.get('/:id/getFilteredOrders', controller.getAllOrdersFromRestaurantWithoutOneStatus);
module.exports = router;