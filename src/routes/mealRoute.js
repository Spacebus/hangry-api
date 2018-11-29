const express = require('express');
const router = express.Router();
const controller = require('../controllers/mealController')
router.put('/addMeal', controller.addMeal);
module.exports = router;