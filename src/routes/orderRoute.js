const express = require('express');
const router = express.Router();
const controller = require('../controllers/orderController')
router.post('/addItem', controller.addItemToOrder);
module.exports = router;