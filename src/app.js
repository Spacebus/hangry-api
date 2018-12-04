const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const index = require('./routes/index');
const restaurantRoute = require('./routes/restaurantRoute');
const mealRoute = require('./routes/mealRoute')
const orderRoute = require('./routes/orderRoute');
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', index);
app.use('/restaurant', restaurantRoute);
app.use('/order', orderRoute);
app.use('/meal', mealRoute);
module.exports = app;