const mongo = require('../database')
var ObjectId = require('mongodb').ObjectID;

exports.getSession = (req, res, next) => {
    res.status(200).send(req.sessionID);
};

exports.getOrdersFromSession = (req, res, next) => {
    mongo.connect(async function(err){
        if (err) throw err;
        let db = mongo.conn.db('hangry-test')
        let collection = await db.collection('Order');
        let query = {"session": req.sessionID};
        let orders = await collection.find(query).toArray();
        res.status(200).send(orders);
    });
};

exports.getReadyOrders = (req, res, next) => {
    let id = req.params.id
    mongo.connect(async function(err){
        if (err) throw err;
        let db = mongo.conn.db('hangry-test')
        let collection = await db.collection('Order');
        let query = {
            'restaurant_id': ObjectId(id),
            'status': 'Pronto',
            'session': req.sessionID
        };
        let orders = await collection.find(query).toArray();
        res.status(200).send(orders);
    });    
};