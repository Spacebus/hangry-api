const mongo = require('../database')
const ObjectId = require('mongodb').ObjectID;

exports.addOrder = (req, res, next) => {
    let order_restaurant_id = req.body.restaurant_id;
    let order_scheduled_timestamp = req.body.scheduled_timestamp;
    let order_order_timestamp = req.body.order_timestamp;
    let order_status = req.body.status;
    let order_multiplier = req.body.multiplier;
    mongo.connect(async function(err){
        if (err) throw err;
        let db = mongo.conn.db('hangry-test');
        let collection = await db.collection('Order');
        let orderItem = {
            restaurant_id: ObjectId(order_restaurant_id), 
            scheduled_timestamp: order_scheduled_timestamp, 
            order_timestamp: order_order_timestamp, 
            status: order_status, 
            session: req.sessionID, 
            multiplier: order_multiplier};
        collection.insertOne(orderItem);
        res.status(201).send('Pedido adicionado com sucesso!');
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

exports.addItemToOrder = (req, res, next) => {
    let item_order_id = req.body.order_id;
    let item_meal_id = req.body.meal_id;
    let item_quantity = req.body.quantity || 1;
    mongo.connect(async function(err){
        if (err) throw err;
        let db = mongo.conn.db('hangry-test');
        let collection = await db.collection('OrderItem');
        let orderItem = {order_id: ObjectId(item_order_id), meal_id: ObjectId(item_meal_id), quantity: item_quantity};
        collection.insertOne(orderItem);
        res.status(201).send('Item adicionado com sucesso!');
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

exports.getAllOrderItens = (req, res, next) => {
    mongo.connect(async function(err){
        if (err) throw err;
        let db = mongo.conn.db('hangry-test');
        let collection = await db.collection('OrderItem');
        let query = {};
        let orderItens = await collection.find(query).toArray();
        res.status(200).send(orderItens);
    });
};

exports.getAllMealsFromOrder = (req, res, next) => {
    let order_id = req.params.id;
    mongo.connect(async function(err){
        if (err) throw err;
        let db = mongo.conn.db('hangry-test');
        let orderItensCollection = await db.collection('OrderItem');
        let orderItensQuery = {"order_id": ObjectId(order_id)};
        let orderItens = await orderItensCollection.find(orderItensQuery).toArray();
        let meal_ids = [];
        orderItens.forEach(element => {
            meal_ids.push(ObjectId(element.meal_id));
        });
        let mealCollection = await db.collection('Meal');
        let mealsQuery = {"_id": {"$in": meal_ids}};
        let meals = await mealCollection.find(mealsQuery).toArray();
        res.status(200).send(meals);
    });
};

exports.deleteOrderItem = (req, res, next) => {
    let id = req.params.id;
    mongo.connect(async function(err){
        if (err) throw err;
        let db = mongo.conn.db('hangry-test');
        let collection = await db.collection('OrderItem');
        let query = {'_id': ObjectId(id)};
        let orderItens = await collection.deleteOne(query);
        res.status(204).send('Item deletado com sucesso');
    });
};
