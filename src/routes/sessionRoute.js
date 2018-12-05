const express = require('express');
const router = express.Router();
const controller = require('../controllers/sessionController')
router.get('/', controller.getSession);
router.get('/getOrders', controller.getOrdersFromSession);
module.exports = router;