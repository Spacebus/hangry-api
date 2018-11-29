const mongo = require('../database')

exports.addOrder = (req, res, next) => {
    let restaurantId = req.body.restaurantId;
    let scheduledDate = req.body.scheduledDate;
    let orderDate = req.body.orderDate;
    let orderStatus = req.body.orderStatus;
    mongo.connect(async function(err){
        if (err) throw err;
        let db = mongo.conn.db('hangry-test');
        let collection = await db.collection('Order');
        let orderItem = {'restaurantId': restaurantId, 'scheduledDate': scheduledDate, "orderDate": orderDate, "orderStatus": orderStatus};
        collection.insertOne(orderItem);
        res.status(201).send('Pedido adicionado com sucesso!');
    });
};

exports.addItemToOrder = (req, res, next) => {
    let orderId = req.body.orderId;
    let mealId = req.body.mealId;
    mongo.connect(async function(err){
        if (err) throw err;
        let db = mongo.conn.db('hangry-test');
        let collection = await db.collection('OrderItem');
        let orderItem = {'orderId': orderId, 'mealId': mealId};
        collection.insertOne(orderItem);
        res.status(201).send('Item adicionado com sucesso!');
    });
};