const assert = require('assert')
const mongo = require('../database')
exports.get_all_restaurants = (req, res, next) => {
    mongo.connect(async function(err){
        if (err) throw err;
        let db = mongo.conn.db('hangry-test')
        let collection = await db.collection('Restaurant');
        let query = {};
        collection.find(query).toArray(await function (err, docs){
            res.status(201).send(docs);
        })
    });
};
exports.get_all_meals_from_a_restaurant = (req, res, next) => {
    let id = req.params.restaurant_id
    mongo.connect(async function(err){
        if (err) throw err;
        let db = mongo.conn.db('hangry-test')
        let collection = await db.collection('Meal');
        let query = {'restaurant_id': id};
        collection.find(query).toArray(await function (err, docs){
            res.status(201).send(docs);
        })
    });    
};