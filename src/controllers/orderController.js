const mongo = require('../database')
const ObjectId = require('mongodb').ObjectID;

exports.addOrder = (req, res, next) => {
    let order_restaurant_id = req.body.restaurant_id;
    let order_meals = req.body.meals;
    let order_scheduled_timestamp = req.body.scheduled_timestamp;
    let order_order_timestamp = req.body.order_timestamp;
    let order_status = req.body.status || 'Em processo';
    mongo.connect(async function(err){
        if (err) throw err;
        let db = mongo.conn.db('hangry-test');
        let collection = await db.collection('Order');
        let order_obj = {
            restaurant_id: ObjectId(order_restaurant_id),
            meals: order_meals.map(meal_id => ObjectId(meal_id)),
            scheduled_timestamp: order_scheduled_timestamp, 
            order_timestamp: order_order_timestamp, 
            status: order_status, 
            session: req.sessionID
        };
        order = await collection.insert(order_obj);
        res.status(201).send(order.ops[0]._id);
    });
};

exports.updateOrder = (req, res, next) => {
    let id = req.params.id;
    mongo.connect(async function(err){
        if (err) throw err;
        let db = mongo.conn.db('hangry-test');
        let collection = await db.collection('Order');
        let query = {"_id": ObjectId(id)};
        collection.updateOne(
            query,
            {$set:
                req.body
            }
        )
        res.status(200).send('Pedido atualizado com sucesso!');
    });
};

exports.getAllOrders = (req, res, next) => {
    mongo.connect(async function(err){
        if (err) throw err;
        let db = mongo.conn.db('hangry-test');
        let collection = await db.collection('Order');
        let query = {};
        let orders = await collection.find(query).toArray();
        res.status(200).send(orders);
    });
};

exports.getAllMealsFromOrder = (req, res, next) => {
    let order_id = req.params.id;
    mongo.connect(async function(err){
        if (err) throw err;
        let db = mongo.conn.db('hangry-test');
        let orderCollection = await db.collection('Order');
        let orderQuery = {"_id": ObjectId(order_id)};
        let order = await orderCollection.findOne(orderQuery);
        let mealCollection = await db.collection('Meal');
        let mealsQuery = {"_id": {"$in": order.meals}};
        let meals = await mealCollection.find(mealsQuery).toArray();
        res.status(200).send(meals);
    });
};