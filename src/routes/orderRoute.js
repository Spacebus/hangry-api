const express = require('express');
const router = express.Router();
const controller = require('../controllers/orderController')
router.get('/', controller.getAllOrders);
router.get('/:id/getAllMealsFromOrder', controller.getAllMealsFromOrder);
router.post('/', controller.addOrder);
router.get('/item', controller.getAllOrderItens);
router.post('/item', controller.addItemToOrder);
module.exports = router;