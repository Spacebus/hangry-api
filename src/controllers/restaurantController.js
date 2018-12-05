const mongo = require('../database');
var ObjectId = require('mongodb').ObjectID;

exports.addRestaurant = (req, res, next) => {
    let restaurant_name = req.body.name;
    let restaurant_address = req.body.address;
    let restaurant_imageURL = req.body.imageURL;
    let restaurant_phone = req.body.phoen;
    let restaurant_description = req.body.description;
    let restaurant_distance = req.body.distance;
    let restaurant_category = req.body.category;
    mongo.connect(async function(err){
        if (err) throw err;
        let db = mongo.conn.db('hangry-test');
        let collection = await db.collection('Restaurant');
        let Restaurant = {name: restaurant_name, address: restaurant_address, imageURL: restaurant_imageURL ,phone: restaurant_phone, description: restaurant_description, distance: restaurant_distance, category: restaurant_category};
        collection.insertOne(Restaurant);
        res.status(201).send('Restaurante adicionado com sucesso!');
    });
};

exports.updateRestaurant = (req, res, next) => {
    let id = req.params.id;
    mongo.connect(async function(err){
        if (err) throw err;
        let db = mongo.conn.db('hangry-test');
        let collection = await db.collection('Restaurant');
        let query = {"_id": ObjectId(id)};
        collection.updateOne(
            query,
            {$set:
                req.body
            }
        )
        res.status(201).send('Restaurante atualizado com sucesso!');
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

exports.getRestaurant = (req, res, next) => {
    let id = req.params.id;
    mongo.connect(async function(err){
        if (err) throw err;
        let db = mongo.conn.db('hangry-test')
        let collection = await db.collection('Restaurant');
        let query = {"_id": ObjectId(id)};
        collection.find(query).toArray(await function (err, docs){
            res.status(201).send(docs);
        })
    });
};

exports.getAllMealsFromTheRestaurant = (req, res, next) => {
    let id = req.params.id
    mongo.connect(async function(err){
        if (err) throw err;
        let db = mongo.conn.db('hangry-test')
        let collection = await db.collection('Meal');
        let query = {'restaurant_id': ObjectId(id)};
        collection.find(query).toArray(await function (err, docs){
            res.status(201).send(docs);
        })
    });    
};

exports.getAllOrdersFromTheRestaurant = (req, res, next) => {
    let id = req.params.id
    mongo.connect(async function(err){
        if (err) throw err;
        let db = mongo.conn.db('hangry-test')
        let collection = await db.collection('Order');
        let query = {'restaurant_id': ObjectId(id)};
        collection.find(query).toArray(await function (err, docs){
            res.status(201).send(docs);
        })
    });    
};

exports.getFinishedOrdersFromTheRestaurant = (req, res, next) => {
    let id = req.params.id
    mongo.connect(async function(err){
        if (err) throw err;
        let db = mongo.conn.db('hangry-test')
        let collection = await db.collection('Order');
        let query = {
            'restaurant_id': ObjectId(id),
            'orderStatus': 'Finalizado'
        };
        collection.find(query).toArray(await function (err, docs){
            res.status(201).send(docs);
        })
    });    
};