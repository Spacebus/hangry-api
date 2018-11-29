const express = require('express');
const router = express.Router();
const controller = require('../controllers/orderController')
router.put('/addItem', controller.addItemToOrder);
module.exports = router;