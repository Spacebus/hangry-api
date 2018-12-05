const express = require('express');
const router = express.Router();
const controller = require('../controllers/orderController')
router.post('/', controller.addOrder);
router.post('/item', controller.addItemToOrder);
module.exports = router;