const express = require('express');
const router = express.Router();
const controller = require('../controllers/mealController')
router.post('/addMeal', controller.addMeal);
module.exports = router;