const express = require('express');
const router = express.Router();
const controller = require('../controllers/restaurantController')
router.get('/', controller.get_all_restaurants);
module.exports = router;