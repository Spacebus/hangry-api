const mongo = require('../database');
var ObjectId = require('mongodb').ObjectID;

exports.addRestaurant = (req, res, next) => {
    let restaurant_name = req.body.name;
    let restaurant_address = req.body.address;
    let restaurant_image_url = req.body.image_url;
    let restaurant_phone = req.body.phoen;
    let restaurant_description = req.body.description;
    let restaurant_distance = req.body.distance;
    let restaurant_category = req.body.category;
    mongo.connect(async function(err){
        if (err) throw err;
        let db = mongo.conn.db('hangry-test');
        let collection = await db.collection('Restaurant');
        let Restaurant = {name: restaurant_name, address: restaurant_address, image_url: restaurant_image_url ,phone: restaurant_phone, description: restaurant_description, distance: restaurant_distance, category: restaurant_category};
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
        res.status(200).send('Restaurante atualizado com sucesso!');
    });
};

exports.getAllRestaurants = (req, res, next) => {
    mongo.connect(async function(err){
        if (err) throw err;
        let db = mongo.conn.db('hangry-test');
        let collection = await db.collection('Restaurant');
        let query = {};
        let restaurants = await collection.find(query).toArray();
        res.status(200).send(restaurants);
    });
};

exports.getRestaurant = (req, res, next) => {
    let id = req.params.id;
    mongo.connect(async function(err){
        if (err) throw err;
        let db = mongo.conn.db('hangry-test');
        let collection = await db.collection('Restaurant');
        let query = {"_id": ObjectId(id)};
        let restaurant = await collection.findOne(query);
        res.status(200).send(restaurant);
    });
};

exports.getAllMealsFromTheRestaurant = (req, res, next) => {
    let id = req.params.id
    mongo.connect(async function(err){
        if (err) throw err;
        let db = mongo.conn.db('hangry-test');
        let collection = await db.collection('Meal');
        let query = {'restaurant_id': ObjectId(id)};
        let meals = await collection.find(query).toArray();
        res.status(200).send(meals);
    });    
};

exports.getAllOrdersFromRestaurant = (req, res, next) => {
    let id = req.params.id
    mongo.connect(async function(err){
        if (err) throw err;
        let db = mongo.conn.db('hangry-test');
        let collection = await db.collection('Order');
        let query = {'restaurant_id': ObjectId(id)};
        let orders = await collection.find(query).toArray();
        res.status(200).send(orders);
    });    
};

exports.getAllOrdersFromRestaurantWithoutOneStatus = (req, res, next) => {
    let id = req.params.id
    mongo.connect(async function(err){
        if (err) throw err;
        let db = mongo.conn.db('hangry-test');
        let collection = await db.collection('Order');
        let query = {
            'restaurant_id': ObjectId(id),
            'status': {'$ne': 'Em processo'}
        };
        let orders = await collection.find(query).toArray();
        res.status(200).send(orders);
    });    
};