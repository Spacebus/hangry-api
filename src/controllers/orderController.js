const mongo = require('../database')
exports.addItemToOrder = (req, res, next) => {
    let orderId = req.body.orderId;
    let mealId = req.body.mealId;
    mongo.connect(async function(err){
        if (err) throw err;
        let db = mongo.conn.db('hangry-test');
        let collection = await db.collection('OrderItem');
        let orderItem = {'orderId': orderId, 'mealId': mealId};
        collection.insertOne(orderItem, function(err, docs){
            res.status(201).send(docs);
        });
    });
};
