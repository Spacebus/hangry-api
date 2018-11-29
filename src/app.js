const express = require('express');
const app = express();
const router = express.Router();
const index = require('./routes/index');
const personRoute = require('./routes/personRoute');
const restaurantRoute = require('./routes/restaurantRoute');
const orderRoute = require('./routes/orderRoute');
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
app.use('/', index);
app.use('/persons', personRoute);
app.use('/restaurant', restaurantRoute);
app.use('/order', orderRoute);
module.exports = app;