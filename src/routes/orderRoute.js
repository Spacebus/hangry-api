const express = require('express');
const router = express.Router();
const controller = require('../controllers/orderController')
router.put('/addOrder', controller.addOrder);
router.put('/addItem', controller.addItemToOrder);
module.exports = router;