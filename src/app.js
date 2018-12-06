const express = require('express');
const session = require('express-session');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const index = require('./routes/index');
const restaurantRoute = require('./routes/restaurantRoute');
const mealRoute = require('./routes/mealRoute')
const orderRoute = require('./routes/orderRoute');
const sessionRoute = require('./routes/sessionRoute');
const date = Date.now();
const token = (date/3).toString();

app.use(session({ secret : token, name : 'sessionId', resave : true, saveUninitialized : true}));
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', index);
app.use('/restaurant', restaurantRoute);
app.use('/order', orderRoute);
app.use('/meal', mealRoute);
app.use('/session', sessionRoute);

module.exports = app;