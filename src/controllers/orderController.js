const mongo = require('../database')
const ObjectId = require('mongodb').ObjectID;

exports.addOrder = (req, res, next) => {
    let order_restaurantId = req.body.restaurantId;
    let order_scheduledDate = req.body.scheduledDate;
    let order_orderDate = req.body.orderDate;
    let order_orderStatus = req.body.orderStatus;
    mongo.connect(async function(err){
        if (err) throw err;
        let db = mongo.conn.db('hangry-test');
        let collection = await db.collection('Order');
        let orderItem = {restaurantId: order_restaurantId, scheduledDate: order_scheduledDate, orderDate: order_orderDate, orderStatus: order_orderStatus};
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
        res.status(201).send('Pedido atualizado com sucesso!');
    });
};

exports.addItemToOrder = (req, res, next) => {
    let item_orderId = req.body.orderId;
    let item_mealId = req.body.mealId;
    let item_quantity = req.body.quantity || 1;
    mongo.connect(async function(err){
        if (err) throw err;
        let db = mongo.conn.db('hangry-test');
        let collection = await db.collection('OrderItem');
        let orderItem = {orderId: item_orderId, mealId: item_mealId, quantity: item_quantity};
        collection.insertOne(orderItem);
        res.status(201).send('Item adicionado com sucesso!');
    });
};

exports.getAllOrders = (req, res, next) => {
    mongo.connect(async function(err){
        if (err) throw err;
        let db = mongo.conn.db('hangry-test')
        let collection = await db.collection('Order');
        let query = {};
        collection.find(query).toArray(await function (err, docs){
            res.status(201).send(docs);
        })
    });
};

exports.getAllOrderItens = (req, res, next) => {
    mongo.connect(async function(err){
        if (err) throw err;
        let db = mongo.conn.db('hangry-test')
        let collection = await db.collection('OrderItem');
        let query = {};
        collection.find(query).toArray(await function (err, docs){
            res.status(201).send(docs);
        })
    });
};