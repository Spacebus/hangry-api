const assert = require('assert')
const mongo = require('../database')

exports.addRestaurant = (req, res, next) => {
    let name = req.body.name;
    let phone = req.body.phoen;
    let address = req.body.address;
    let description = req.body.description;
    mongo.connect(async function(err){
        if (err) throw err;
        let db = mongo.conn.db('hangry-test');
        let collection = await db.collection('Restaurant');
        let Restaurant = {'name': name, 'phone': phone, 'address': address, 'description': description};
        collection.insertOne(Restaurant);
        res.status(201).send('Restaurante criado com sucesso!');
    });
};

exports.getAllRestaurants = (req, res, next) => {
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
exports.getALlMealsFromTheRestaurant = (req, res, next) => {
    let id = req.params.restaurantId
    mongo.connect(async function(err){
        if (err) throw err;
        let db = mongo.conn.db('hangry-test')
        let collection = await db.collection('Meal');
        let query = {'restaurantId': id};
        collection.find(query).toArray(await function (err, docs){
            res.status(201).send(docs);
        })
    });    
};